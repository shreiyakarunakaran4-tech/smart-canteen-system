import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StaffLogin.css';

export default function StaffLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch("https://smart-canteen-system-5pye.onrender.com/api/auth/staff-login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid staff credentials');
      }

      // Store staff session
      localStorage.setItem('staffToken', data.token || 'logged-in');
      if (data.staff) {
        localStorage.setItem('staffInfo', JSON.stringify(data.staff));
      }

      // Redirect to staff dashboard
      navigate('/staff-dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="staff-login-container">
      <div className="staff-login-card">
        <h2>Staff Portal</h2>
        <p className="staff-login-subtext">Kitchen & Order Management Login</p>

        {error && <div className="staff-login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="staff-form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="staff@canteen.com"
              required
            />
          </div>

          <div className="staff-form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="staff-login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login to Staff Portal'}
          </button>
        </form>
      </div>
    </div>
  );
}