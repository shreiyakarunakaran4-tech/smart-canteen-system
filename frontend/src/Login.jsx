import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        console.log("Email:", email);
        console.log("Password:", password);

        alert("Login successful!");

        navigate("/dashboard");
    };

    return (
        <div className="login-page">

            {/* Branding */}
            <div className="top-branding">
                <h1>Smart Canteen</h1>

                <p>
                    Smart ordering. Less waiting.
                    <br />
                    Better campus dining.
                </p>
            </div>


            {/* Food Image Strip */}
            <div className="food-strip">

                <img src="/food/img1.jpg" alt="Masala Dosa" />
                <img src="/food/sand.jpg" alt="Sandwich" />
                <img src="/food/vepav.png" alt="Vada Pav" />
                <img src="/food/rice.jpg" alt="Fried Rice" />
                <img src="/food/cocee.jpg" alt="Cold Coffee" />

            </div>


            {/* Features */}
            <div className="login-features">

                <div>
                    <strong>Fast Ordering</strong>
                    <span>Order in seconds</span>
                </div>

                <div>
                    <strong>Digital Queue</strong>
                    <span>Less waiting time</span>
                </div>

                <div>
                    <strong>Easy Pickup</strong>
                    <span>Collect your order</span>
                </div>

            </div>


            {/* Login Card */}
            <div className="auth-area">

                <div className="auth-card">

                    {/* Tabs */}
                    <div className="auth-tabs">

                        <Link
                            to="/login"
                            className="auth-tab active"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="auth-tab"
                        >
                            Register
                        </Link>

                    </div>


                    <h2>Welcome Back</h2>

                    <p className="subtitle">
                        Login to continue ordering your favourite food.
                    </p>


                    <form onSubmit={handleLogin}>

                        {/* Email */}
                        <div className="input-group">

                            <label>Email Address</label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* Password */}
                        <div className="input-group">

                            <label>Password</label>

                            <div className="password-box">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                                <button
                                    type="button"
                                    className="show-btn"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >
                                    {showPassword
                                        ? "Hide"
                                        : "Show"}
                                </button>

                            </div>

                        </div>


                        <div className="forgot-password">

                            <a href="#">
                                Forgot Password?
                            </a>

                        </div>


                        <button
                            type="submit"
                            className="auth-button"
                        >
                            Login
                        </button>

                    </form>


                    <div className="divider">
                        <span>OR</span>
                    </div>


                    <p className="register-text">

                        Don't have an account?

                        <Link to="/register">
                            Create Account
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;