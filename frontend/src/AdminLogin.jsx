import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://smart-canteen-system-5pye.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid admin credentials");
      }

      if (data.user.role !== "admin") {
        throw new Error("Access denied. Admin credentials required.");
      }

      // Save admin session
      localStorage.setItem("canteenUser", JSON.stringify(data.user));
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-login-page">
      <nav className="navbar">
        <div className="navbar-logo">🍽️ Smart Canteen</div>
        <div className="nav-links">
          <Link to="/">Student Portal</Link>
        </div>
      </nav>

      <div className="login-card-wrapper">
        <div className="admin-auth-card">
          <div className="badge-wrapper">
            <span className="admin-badge">Admin Portal</span>
          </div>
          <h2>Staff & Manager Access</h2>
          <p className="subtitle">Log in to view canteen analytics and controls</p>

          {error && <div className="error-alert">{error}</div>}

          <form onSubmit={handleAdminLogin}>
            <div className="form-group">
              <label>Admin Email</label>
              <input
                type="email"
                required
                placeholder="admin@canteen.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="login-btn-primary">
              Log In to Console
            </button>
          </form>

          <p className="back-hint">
            Student or Kitchen Staff? <Link to="/login">Go to standard login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;