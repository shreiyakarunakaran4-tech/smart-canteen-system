import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "./OrderHistory.css";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchOrders = () => {
    // Read the logged-in user from localStorage
    const savedUser = JSON.parse(
      localStorage.getItem("canteenUser") || 
      localStorage.getItem("user") || 
      "{}"
    );

    fetch("https://smart-canteen-system-5pye.onrender.com/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // If a student is logged in, filter only THEIR orders
          if (savedUser.name) {
            const myOrders = data.filter(
              (order) =>
                order.customerName?.trim().toLowerCase() ===
                savedUser.name?.trim().toLowerCase()
            );
            setOrders(myOrders);
          } else {
            // Fallback if no user is found in session
            setOrders([]);
          }
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
    const interval = setInterval(fetchOrders, 4000); // Live poll updates
    return () => clearInterval(interval);
  }, []);

  const getStepIndex = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return 1;
      case "preparing":
        return 2;
      case "ready":
        return 3;
      case "completed":
        return 4;
      default:
        return 1;
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (filter === "active") return o.status !== "Completed";
    if (filter === "completed") return o.status === "Completed";
    return true;
  });

  return (
    <div className="orders-page">
      {/* STUDENT NAVBAR */}
      <nav className="navbar">
        <div className="navbar-logo">🍽️ Smart Canteen</div>
        <div className="nav-links">
          <Link to="/dashboard">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders" className="active">Orders</Link>
          <Link to="/">Logout</Link>
        </div>
      </nav>

      <div className="orders-container">
        <div className="orders-header">
          <div>
            <h1>🎟️ Digital Pickup Passes</h1>
            <p>Live preparation tracker & contactless token redemption</p>
          </div>
          <div className="filter-pill-group">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All Passes
            </button>
            <button
              className={filter === "active" ? "active" : ""}
              onClick={() => setFilter("active")}
            >
              Active Live
            </button>
            <button
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
            >
              History
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">Syncing live tokens...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="empty-orders-card">
            <h3>No orders found</h3>
            <p>Head over to the menu to grab your meal!</p>
            <Link to="/menu" className="explore-btn-accent">Explore Menu</Link>
          </div>
        ) : (
          <div className="passes-grid">
            {filteredOrders.map((order) => {
              const currentStep = getStepIndex(order.status);
              const isReady = order.status === "Ready";
              const isPreparing = order.status === "Preparing";

              return (
                <div
                  key={order._id}
                  className={`boarding-pass-card ${isReady ? "pulse-ready" : ""}`}
                >
                  {/* LEFT TICKET MAIN */}
                  <div className="pass-main">
                    <div className="pass-top">
                      <div className="canteen-tag">CAMPUS FOOD PASS</div>
                      <div className="order-date-tag">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Today"}
                      </div>
                    </div>

                    {/* LIVE STEPPER */}
                    <div className="order-stepper">
                      <div className={`step-node ${currentStep >= 1 ? "done" : ""}`}>
                        <div className="node-circle">1</div>
                        <span>Placed</span>
                      </div>
                      <div className={`step-line ${currentStep >= 2 ? "done" : ""}`}></div>
                      <div className={`step-node ${currentStep >= 2 ? "done" : ""}`}>
                        <div className={`node-circle ${isPreparing ? "glow" : ""}`}>2</div>
                        <span>Cooking</span>
                      </div>
                      <div className={`step-line ${currentStep >= 3 ? "done" : ""}`}></div>
                      <div className={`step-node ${currentStep >= 3 ? "done" : ""}`}>
                        <div className={`node-circle ${isReady ? "glow-ready" : ""}`}>3</div>
                        <span>Ready 🔔</span>
                      </div>
                      <div className={`step-line ${currentStep >= 4 ? "done" : ""}`}></div>
                      <div className={`step-node ${currentStep >= 4 ? "done" : ""}`}>
                        <div className="node-circle">4</div>
                        <span>Picked Up</span>
                      </div>
                    </div>

                    {/* ITEMS LIST */}
                    <div className="pass-items-section">
                      <div className="section-label">ORDERED DISHES</div>
                      <div className="pass-items-chips">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="item-chip">
                            <span className="qty">{item.quantity}x</span>
                            <span className="name">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* FOOTER TOTAL */}
                    <div className="pass-bottom-row">
                      <div>
                        <span className="label-sub">TOTAL BILLED</span>
                        <div className="pass-price">₹{order.totalAmount}</div>
                      </div>
                      <div className="counter-pickup-pill">
                        Counter: <strong>Station 01</strong>
                      </div>
                    </div>
                  </div>

                  {/* PERFORATED DIVIDER */}
                  <div className="pass-divider">
                    <div className="notch notch-top"></div>
                    <div className="perforated-line"></div>
                    <div className="notch notch-bottom"></div>
                  </div>

                  {/* RIGHT TOKEN STUB */}
                  <div className="pass-stub">
                    <div className="token-label">TOKEN NO.</div>
                    <div className="big-token">#{order.tokenNumber || "101"}</div>

                    <div className={`badge-live-status status-${order.status?.toLowerCase() || 'pending'}`}>
                      {order.status || "Pending"}
                    </div>

                    {/* SIMULATED CONTACTLESS BARCODE */}
                    <div className="barcode-simulation">
                      <div className="bar"></div><div className="bar fat"></div>
                      <div className="bar"></div><div className="bar"></div>
                      <div className="bar fat"></div><div className="bar"></div>
                      <div className="bar"></div><div className="bar fat"></div>
                    </div>
                    <span className="scan-text">Show at Pickup</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;