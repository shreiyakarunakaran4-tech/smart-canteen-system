const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const MenuItem = require('./models/MenuItem');
const Order = require('./models/Order');

const app = express();

app.use(cors());
app.use(express.json());

// ---------------- USER MODEL ---------------- //
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin', 'staff'], default: 'student' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// ---------------- MONGODB CONNECTION & SEED ADMIN ---------------- //
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected Successfully');

    // Automatically ensure default admin credentials exist
    try {
      const adminExists = await User.findOne({ email: "admin@canteen.com" });
      if (!adminExists) {
        await User.create({
          name: "Head Canteen Manager",
          email: "admin@canteen.com",
          password: "admin",
          role: "admin"
        });
        console.log("Default admin created: admin@canteen.com / admin");
      }
    } catch (e) {
      console.error("Admin seed check failed:", e.message);
    }
  })
  .catch((err) => console.error('MongoDB Error:', err));

// ---------------- AUTH ROUTES ---------------- //

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const newUser = new User({ 
      name, 
      email, 
      password,
      role: role || 'student' 
    });

    await newUser.save();
    res.status(201).json({ 
      message: "Registered successfully", 
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role } 
    });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Get Registered Users (Admin only)
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// ---------------- MENU ROUTES ---------------- //

app.get('/api/menu', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/menu', async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---------------- ORDER ROUTES ---------------- //

app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, items, totalAmount } = req.body;

    const orderCount = await Order.countDocuments();
    const tokenNumber = 100 + orderCount + 1;

    const newOrder = new Order({
      tokenNumber,
      customerName,
      items,
      totalAmount
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: 'after' } // updated from { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status" });
  }
});


// ---------------- ADMIN ANALYTICS ROUTE ---------------- //

app.get('/api/admin/analytics', async (req, res) => {
  try {
    const orders = await Order.find();

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const completedOrders = orders.filter(o => o.status === 'Completed').length;
    const pendingOrders = orders.filter(o => o.status !== 'Completed').length;

    const itemCounts = {};
    orders.forEach(order => {
      order.items?.forEach(item => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + (item.quantity || 1);
      });
    });

    const popularDishes = Object.entries(itemCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    let aiInsight = "Order volume is steady. Ensure standard stock levels.";
    if (popularDishes.length > 0) {
      const topDish = popularDishes[0];
      aiInsight = `🔥 High Demand Alert: "${topDish.name}" is your highest seller with ${topDish.count} orders. Recommend increasing prep stock by 25%.`;
    }

    res.json({
      totalRevenue,
      totalOrders,
      completedOrders,
      pendingOrders,
      popularDishes,
      aiInsight
    });
  } catch (error) {
    console.error("Admin analytics error:", error);
    res.status(500).json({ error: "Failed to generate analytics" });
  }
});
// DELETE: Remove an item from the menu
app.delete('/api/menu/:id', async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});

// PATCH: Toggle availability or edit details
app.patch('/api/menu/:id', async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to update item" });
  }
});

// ---------------- SERVER START ---------------- //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));