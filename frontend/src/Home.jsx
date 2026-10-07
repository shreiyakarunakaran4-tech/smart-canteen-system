import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <div className="home-page">

            <nav className="home-navbar">
                <div className="home-logo">
                    Smart Canteen
                </div>

                <div className="home-nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/menu">Menu</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </nav>

            <div className="home-overlay">
                <div className="hero-content">

                    <h1>Smart Canteen</h1>

                    <h2>
                        Fresh Food. Easy Ordering.
                    </h2>

                    <p>
                        Order your favourite food quickly,
                        conveniently and easily.
                    </p>

                    <Link
                        to="/menu"
                        className="explore-btn"
                    >
                        Explore Menu
                    </Link>

                </div>
            </div>

        </div>
    );
}

export default Home;