import "./Navbar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./Menu.css";

function Menu() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://smart-canteen-system-5pye.onrender.com/api/menu")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFoods(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch menu:", err);
        setLoading(false);
      });
  }, []);

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || food.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="menu-page">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-logo">🍽️ Smart Canteen</div>
        <div className="nav-links">
          <Link to="/dashboard">Home</Link>
          <Link to="/menu" className="active">Menu</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/">Logout</Link>
        </div>
      </nav>

      {/* HEADER */}
      <div className="menu-header">
        <h1>Food Menu</h1>
        <p>Choose your favourite food and order easily.</p>
      </div>

      {/* SEARCH */}
      <div className="menu-controls">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CATEGORIES */}
      <div className="categories">
        {["All", "Breakfast", "Snacks", "Meals", "Drinks"].map((cat) => (
          <button
            key={cat}
            className={category === cat ? "active" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FOOD CARDS */}
      {loading ? (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          Loading menu items...
        </p>
      ) : (
        <div className="food-grid">
          {filteredFoods.map((food) => (
            <div className="menu-food-card" key={food._id || food.id}>
              <img
                src={food.imageUrl || food.image || "/food/idle.jpg"}
                alt={food.name}
                className="food-image"
              />

              <h2>{food.name}</h2>
              <p className="food-category">{food.category}</p>

              <div className="food-bottom">
                <span className="food-price">₹{food.price}</span>
                <button
                  disabled={food.isAvailable === false}
                  onClick={() =>
                    addToCart({
                      id: food._id || food.id,
                      name: food.name,
                      price: food.price,
                      image: food.imageUrl || food.image || "/food/idle.jpg",
                    })
                  }
                >
                  {food.isAvailable === false ? "Sold Out" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* NO RESULT */}
      {!loading && filteredFoods.length === 0 && (
        <div className="no-food">
          <h2>No food found</h2>
          <p>Try searching for another food or category.</p>
        </div>
      )}

      {/* FOOTER */}
      <footer className="menu-footer">
        © 2026 Smart Canteen System
      </footer>
    </div>
  );
}

export default Menu;