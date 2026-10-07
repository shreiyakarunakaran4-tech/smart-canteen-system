require('dotenv').config();
const mongoose = require('mongoose');

// Path to your MenuItem model
const MenuItem = require('./models/MenuItem');

const initialFoods = [
  { name: "Idli", price: 40, category: "Breakfast", imageUrl: "/food/idle.jpg", isAvailable: true },
  { name: "Plain Dosa", price: 50, category: "Breakfast", imageUrl: "/food/nordimg3.jpg", isAvailable: true },
  { name: "Masala Dosa", price: 60, category: "Breakfast", imageUrl: "/food/img1.jpg", isAvailable: true },
  { name: "Medu Vada", price: 40, category: "Breakfast", imageUrl: "/food/img2.jpg", isAvailable: true },
  { name: "Dal Vada", price: 30, category: "Breakfast", imageUrl: "/food/img3.jpg", isAvailable: true },
  { name: "Poha", price: 30, category: "Breakfast", imageUrl: "/food/sap.jpg", isAvailable: true },
  { name: "Sabudana Khichdi", price: 40, category: "Breakfast", imageUrl: "/food/sabhu.jpg", isAvailable: true },
  { name: "Poori Bhaji", price: 50, category: "Breakfast", imageUrl: "/food/popri.jpg", isAvailable: true },
  { name: "Pongal", price: 50, category: "Breakfast", imageUrl: "/food/pongal.jpg", isAvailable: true },
  { name: "Veg Fried Rice", price: 70, category: "Meals", imageUrl: "/food/rice.jpg", isAvailable: true },
  { name: "Veg Hakka Noodles", price: 70, category: "Meals", imageUrl: "/food/nod.jpg", isAvailable: true },
  { name: "Veg Manchurian", price: 80, category: "Meals", imageUrl: "/food/snod.jpg", isAvailable: true },
  { name: "Paneer Fried Rice", price: 90, category: "Meals", imageUrl: "/food/panrice.jpg", isAvailable: true },
  { name: "Veg Pulao", price: 70, category: "Meals", imageUrl: "/food/pulav.jpg", isAvailable: true },
  { name: "Paneer Noodles", price: 90, category: "Meals", imageUrl: "/food/panod.jpg", isAvailable: true },
  { name: "Cold Coffee", price: 50, category: "Drinks", imageUrl: "/food/cocee.jpg", isAvailable: true },
  { name: "Lemon Juice", price: 30, category: "Drinks", imageUrl: "/food/lej.jpg", isAvailable: true },
  { name: "Masala Chaas", price: 30, category: "Drinks", imageUrl: "/food/sac.jpg", isAvailable: true },
  { name: "Cold Drink", price: 30, category: "Drinks", imageUrl: "/food/coj.jpg", isAvailable: true },
  { name: "Bread Omelette", price: 50, category: "Snacks", imageUrl: "/food/bom.jpg", isAvailable: true },
  { name: "Sandwich", price: 40, category: "Snacks", imageUrl: "/food/sand.jpg", isAvailable: true },
  { name: "Cheese Sandwich", price: 60, category: "Snacks", imageUrl: "/food/chesa.jpg", isAvailable: true },
  { name: "Grilled Sandwich", price: 70, category: "Snacks", imageUrl: "/food/sand.jpg", isAvailable: true },
  { name: "Cheese Omelette", price: 60, category: "Snacks", imageUrl: "/food/chom.jpg", isAvailable: true },
  { name: "Samosa", price: 20, category: "Snacks", imageUrl: "/food/samosa2.jpg", isAvailable: true },
  { name: "Vada Pav", price: 25, category: "Snacks", imageUrl: "/food/vepav.png", isAvailable: true },
  { name: "Samosa Pav", price: 30, category: "Snacks", imageUrl: "/food/sampav.jpg", isAvailable: true }
];

mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB...");
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(initialFoods);
    console.log("Successfully inserted all canteen items into MongoDB!");
    process.exit();
  })
  .catch((err) => {
    console.error("Failed to seed items:", err);
    process.exit(1);
  });