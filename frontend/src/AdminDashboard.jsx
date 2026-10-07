import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [data, setData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    popularDishes: [],
    aiInsight: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/analytics")
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch admin stats:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="admin-page">
      {/* STANDARD NAVBAR */}
      <nav className="navbar">
        <div className="navbar-logo">🍽️ Smart Canteen</div>
        <div className="nav-links">
          <Link to="/dashboard">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/staff">Kitchen</Link>
          <Link to="/admin" className="active">
            Admin
          </Link>
          <Link to="/">Logout</Link>
        </div>
      </nav>

      <div className="admin-container">
        {/* HEADER SECTION */}
        <div className="admin-header-section">
          <div>
            <h1>📊 Admin & Management Console</h1>
            <p>Real-time Canteen Sales Analytics & Predictive Insights</p>
          </div>
          <div className="admin-actions">
            <Link to="/staff" className="admin-btn-pill">
              🍳 Staff View
            </Link>
            <Link to="/manage-food" className="admin-btn-pill">🍲 Manage Food</Link>
            <Link to="/dashboard" className="admin-btn-pill">
              Student View
            </Link>
          </div>
        </div>

        {loading ? (
          <p className="admin-loading">Loading canteen metrics...</p>
        ) : (
          <>
            {/* AI INSIGHT CARD */}
            <div className="ai-insight-box">
              <div className="ai-badge"> Smart AI Kitchen Insight</div>
              <p className="ai-text">{data.aiInsight}</p>
            </div>

            {/* METRICS GRID */}
            {/* METRICS GRID */}
<div className="stats-grid">
  <div className="stat-card">
    <span className="stat-title">Total Revenue</span>
    <h2 className="stat-number color-orange">₹{data.totalRevenue}</h2>
  </div>
  <div className="stat-card">
    <span className="stat-title">Total Orders</span>
    <h2 className="stat-number">{data.totalOrders}</h2>
  </div>
  <div className="stat-card">
    <span className="stat-title">Orders Completed</span>
    <h2 className="stat-number color-green">{data.completedOrders}</h2>
  </div>
  <div className="stat-card">
    <span className="stat-title">Active / Pending</span>
    <h2 className="stat-number color-amber">{data.pendingOrders}</h2>
  </div>
</div>

            {/* TOP DISHES TABLE */}
            <div className="popular-section">
              <h2>🏆 Top Performing Dishes</h2>
              {data.popularDishes.length === 0 ? (
                <p className="no-data">No dish sales recorded yet.</p>
              ) : (
                <div className="table-responsive">
<div className="table-responsive">
  <table className="admin-table">
    <thead>
      <tr>
        <th className="th-rank">Rank</th>
        <th className="th-item">Food Item</th>
        <th className="th-qty">Total Quantity Sold</th>
      </tr>
    </thead>
    <tbody>
      {data.popularDishes.map((dish, idx) => (
        <tr key={idx}>
          <td className="rank-cell">#{idx + 1}</td>
          <td className="dish-name">{dish.name}</td>
          <td className="dish-count">
            <strong>{dish.count}</strong> plates
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;