import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "./StaffDashboard.css";

function StaffDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Active");

  const fetchOrders = () => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data.reverse());
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading orders:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        setOrders((prev) =>
          prev.map((ord) =>
            ord._id === orderId ? { ...ord, status: newStatus } : ord
          )
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "Active") return order.status !== "Completed";
    if (filter === "Completed") return order.status === "Completed";
    return true;
  });

  return (
    <div className="staff-page">
      {/* IDENTICAL NAVBAR */}
      <nav className="navbar">
        <div className="navbar-logo">🍽️ Smart Canteen</div>
        <div className="nav-links">
          <Link to="/dashboard">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/staff" className="active">
            Kitchen
          </Link>
          <Link to="/">Logout</Link>
        </div>
      </nav>

      <div className="staff-container">
        {/* HEADER SECTION */}
        <div className="staff-header-section">
          <div>
            <h1> Kitchen Orders</h1>
            <p>Track incoming tickets and update cooking progress</p>
          </div>
          <button onClick={fetchOrders} className="refresh-pill-btn">
            🔄 Refresh Tickets
          </button>
        </div>

        {/* PILL TABS */}
        <div className="staff-tabs">
          {["Active", "All", "Completed"].map((tab) => (
            <button
              key={tab}
              className={filter === tab ? "active" : ""}
              onClick={() => setFilter(tab)}
            >
              {tab} Orders
            </button>
          ))}
        </div>

        {/* ORDERS DISPLAY */}
        {loading ? (
          <p className="status-msg">Loading kitchen queue...</p>
        ) : filteredOrders.length === 0 ? (
          <div className="empty-staff-card">
            <h3>No {filter.toLowerCase()} tickets right now.</h3>
            <p>New customer orders will show up here automatically.</p>
          </div>
        ) : (
          <div className="kitchen-grid">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className={`kitchen-card status-${order.status?.toLowerCase()}`}
              >
                <div className="card-top">
                  <span className="token-tag">#{order.tokenNumber}</span>
                  <span
                    className={`status-pill ${
                      order.status?.toLowerCase() || "pending"
                    }`}
                  >
                    {order.status || "Pending"}
                  </span>
                </div>

                <div className="card-body">
                  <span className="items-label">ITEMS TO PREPARE</span>
                  <ul className="items-list">
                    {order.items?.map((item, idx) => (
                      <li key={idx}>
                        <span className="item-qty">{item.quantity}x</span>
                        <span className="item-name">{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-footer">
                  <span className="order-time">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Just now"}
                  </span>

                  <div className="status-actions">
                    {(!order.status || order.status === "Pending") && (
                      <button
                        className="btn-action btn-orange"
                        onClick={() => updateStatus(order._id, "Preparing")}
                      >
                        Start Preparing
                      </button>
                    )}

                    {order.status === "Preparing" && (
                      <button
                        className="btn-action btn-green"
                        onClick={() => updateStatus(order._id, "Ready")}
                      >
                        Mark Ready 🔔
                      </button>
                    )}

                    {order.status === "Ready" && (
                      <button
                        className="btn-action btn-gray"
                        onClick={() => updateStatus(order._id, "Completed")}
                      >
                        Hand to Student ✔
                      </button>
                    )}

                    {order.status === "Completed" && (
                      <span className="done-tag">Finished</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StaffDashboard;