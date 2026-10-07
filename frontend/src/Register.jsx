import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Password:", password);

        alert("Registration successful!");

        navigate("/login");
    };


    const getPasswordStrength = () => {

        if (password.length === 0) {
            return "";
        }

        if (password.length < 6) {
            return "Weak";
        }

        if (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password)
        ) {
            return "Strong";
        }

        return "Medium";
    };


    return (
        <div className="register-page">

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

                <img
                    src="/food/pongal.jpg"
                    alt="Pongal"
                />

                <img
                    src="/food/pulav.jpg"
                    alt="Veg Pulao"
                />

                <img
                    src="/food/samosa2.jpg"
                    alt="Samosa"
                />

                <img
                    src="/food/panod.jpg"
                    alt="Paneer Noodles"
                />

                <img
                    src="/food/lej.jpg"
                    alt="Lemon Juice"
                />

            </div>


            {/* Features */}
            <div className="register-features">

                <div>
                    <strong>Fresh Food</strong>
                    <span>Made for students</span>
                </div>

                <div>
                    <strong>Quick Ordering</strong>
                    <span>Save your time</span>
                </div>

                <div>
                    <strong>Easy Pickup</strong>
                    <span>Simple collection</span>
                </div>

            </div>


            {/* Register Card */}
            <div className="register-area">

                <div className="register-card">

                    {/* Tabs */}
                    <div className="register-tabs">

                        <Link
                            to="/login"
                            className="register-tab"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="register-tab active"
                        >
                            Register
                        </Link>

                    </div>


                    <h2>Create Account</h2>

                    <p className="register-subtitle">
                        Create your Smart Canteen account.
                    </p>


                    <form onSubmit={handleRegister}>

                        {/* Name */}
                        <div className="register-input-group">

                            <label>Full Name</label>

                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* Email */}
                        <div className="register-input-group">

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
                        <div className="register-input-group">

                            <label>Password</label>

                            <div className="register-password-box">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                                <button
                                    type="button"
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

                            {password && (
                                <p className="password-strength">
                                    Password strength:{" "}
                                    <strong>
                                        {getPasswordStrength()}
                                    </strong>
                                </p>
                            )}

                        </div>


                        {/* Confirm Password */}
                        <div className="register-input-group">

                            <label>Confirm Password</label>

                            <div className="register-password-box">

                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >
                                    {showConfirmPassword
                                        ? "Hide"
                                        : "Show"}
                                </button>

                            </div>

                        </div>


                        {/* Register Button */}
                        <button
                            type="submit"
                            className="register-button"
                        >
                            Create Account
                        </button>

                    </form>


                    <div className="register-divider">
                        <span>OR</span>
                    </div>


                    <p className="login-text">

                        Already have an account?

                        <Link to="/login">
                            Login
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;