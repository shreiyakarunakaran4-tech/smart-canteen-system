import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "./ManageFood.css";

function ManageFood() {
  const [foods, setFoods] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "Breakfast",
    price: "",
    imageUrl: "/food/idle.jpg",
    isAvailable: true,
  });
  const [loading, setLoading] = useState(true);

  // Fetch all menu items
  const loadMenu = () => {
    fetch("https://smart-canteen-system-5pye.onrender.com/api/menu")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch menu:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMenu();
  }, []);

  // Add new food item
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    try {
      const res = await fetch("https://smart-canteen-system-5pye.onrender.com/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      });

      if (res.ok) {
        setFormData({
          name: "",
          category: "Breakfast",
          price: "",
          imageUrl: "/food/idle.jpg",
          isAvailable: true,
        });
        loadMenu();
      }
    } catch (err) {
      console.error("Error creating food:", err);
    }
  };

  // Toggle availability (In Stock / Sold Out)
  const toggleAvailability = async (id, currentStatus) => {
    try {
      const res = await fetch(`https://smart-canteen-system-5pye.onrender.com/api/menu/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !currentStatus }),
      });
      if (res.ok) {
        setFoods((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, isAvailable: !currentStatus } : item
          )
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this item?")) return;

    try {
      const res = await fetch(`https://smart-canteen-system-5pye.onrender.com/api/menu/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setFoods((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div className="manage-food-page">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-logo">🍽️ Smart Canteen</div>
        <div className="nav-links">
          <Link to="/dashboard">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/admin">Admin Console</Link>
          <Link to="/manage-food" className="active">
            Manage Food
          </Link>
          <Link to="/">Logout</Link>
        </div>
      </nav>

      <div className="manage-container">
        <div className="manage-header">
          <div>
            <h1>🍲 Manage Food Items</h1>
            <p>Add new dishes, update stock availability, or remove items</p>
          </div>
          <Link to="/admin" className="back-admin-btn">
            ← Back to Admin
          </Link>
        </div>

        {/* ADD ITEM FORM */}
        <div className="add-food-card">
          <h2>Add New Dish</h2>
          <form onSubmit={handleAddItem} className="food-form">
            <div className="input-group">
              <label>Dish Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Paneer Roll"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="input-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Snacks">Snacks</option>
                <option value="Meals">Meals</option>
                <option value="Drinks">Drinks</option>
              </select>
            </div>

            <div className="input-group">
              <label>Price (₹)</label>
              <input
                type="number"
                required
                placeholder="e.g. 60"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>

            <div className="input-group">
              <label>Image Path</label>
              <input
                type="text"
                placeholder="/food/idle.jpg"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
              />
            </div>

            <button type="submit" className="add-item-btn">
              + Add to Menu
            </button>
          </form>
        </div>

        {/* FOOD ITEMS TABLE */}
        <div className="food-list-card">
          <h2>Current Menu Items ({foods.length})</h2>

          {loading ? (
            <p className="loading-state">Loading dishes...</p>
          ) : foods.length === 0 ? (
            <p className="empty-state">No items found in menu.</p>
          ) : (
            <div className="table-responsive">
              <table className="food-manage-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map((food) => (
                    <tr key={food._id}>
                      <td className="dish-name-cell">
                        <img
                          src={food.imageUrl || food.image || "/food/idle.jpg"}
                          alt={food.name}
                          className="dish-thumb"
                        />
                        <span>{food.name}</span>
                      </td>
                      <td>{food.category}</td>
                      <td>
                        <strong>₹{food.price}</strong>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            toggleAvailability(food._id, food.isAvailable)
                          }
                          className={`stock-badge ${
                            food.isAvailable !== false ? "in-stock" : "out-stock"
                          }`}
                        >
                          {food.isAvailable !== false ? "In Stock" : "Sold Out"}
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(food._id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageFood;