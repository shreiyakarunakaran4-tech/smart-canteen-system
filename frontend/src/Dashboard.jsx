import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

    const hour = new Date().getHours();

    let greeting;

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 17) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    return (
        <div className="dashboard">

            {/* ================= NAVBAR ================= */}

            <nav className="navbar">

                <div className="navbar-logo">
                    🍽️ Smart Canteen
                </div>

                <div className="nav-links">

                    <Link to="/dashboard" className="active">
                        Home
                    </Link>

                    <Link to="/menu">
                        Menu
                    </Link>

                    <Link to="/cart">
                        Cart
                    </Link>

                    <Link to="/orders">
                        Orders
                    </Link>

                    <Link to="/">
                        Logout
                    </Link>

                </div>

            </nav>


            {/* ================= WELCOME SECTION ================= */}

            <section className="welcome-section">

                <div className="welcome-content">

                    <span className="welcome-tag">
                        SMART CANTEEN EXPERIENCE
                    </span>

                    <h1>
                        {greeting}, Student! 
                    </h1>

                    <h2>
                        Welcome to Smart Canteen
                    </h2>

                    <p>
                        Order your favourite food, skip the queue,
                        and enjoy a faster canteen experience.
                    </p>

                    <div className="welcome-buttons">

                        <Link to="/menu" className="order-button">
                            Order Food
                        </Link>

                        <Link to="/orders" className="track-button">
                            Track Order
                        </Link>

                    </div>

                </div>


                {/* REAL FOOD IMAGE */}

                <div className="welcome-food">

                    <div className="food-circle">

                        <img
                            src="/food/img1.jpg"
                            alt="Masala Dosa"
                        />

                    </div>

                    <div className="floating-card">
                         Fast & Easy
                    </div>

                </div>

            </section>


            {/* ================= SMART STATUS ================= */}

            <section className="smart-status">

                <div className="status-box">

                    <div className="status-icon">
                        🟢
                    </div>

                    <div>
                        <span>Canteen Status</span>
                        <strong className="open-text">
                            Open Now
                        </strong>
                    </div>

                </div>


                <div className="status-box">

                    <div className="status-icon">
                        👥
                    </div>

                    <div>
                        <span>Current Crowd</span>
                        <strong>
                            Medium
                        </strong>
                    </div>

                </div>


                <div className="status-box">

                    <div className="status-icon">
                        ⏱️
                    </div>

                    <div>
                        <span>Estimated Wait</span>
                        <strong>
                            8–12 Minutes
                        </strong>
                    </div>

                </div>


                <div className="status-box">

                    <div className="status-icon">
                        ⚡
                    </div>

                    <div>
                        <span>Smart Queue</span>
                        <strong>
                            Save Your Time
                        </strong>
                    </div>

                </div>

            </section>


            {/* ================= RECOMMENDATION ================= */}

            <section className="section">

                <div className="section-heading">

                    <div>
                        <span className="small-title">
                            SMART RECOMMENDATION
                        </span>

                        <h2>
                            Recommended for You
                        </h2>
                    </div>

                    <Link to="/menu" className="view-all">
                        View Menu →
                    </Link>

                </div>


                <div className="recommendation-card">

                    <div className="recommendation-image">

                        <img
                            src="/food/img1.jpg"
                            alt="Masala Dosa"
                        />

                    </div>


                    <div className="recommendation-info">

                        <span className="recommendation-label">
                            ⭐ Popular Choice
                        </span>

                        <h3>
                            Masala Dosa
                        </h3>

                        <p>
                            Crispy dosa served with delicious
                            potato masala and chutney.
                        </p>

                        <div className="recommendation-bottom">

                            <strong>
                                ₹60
                            </strong>

                            <Link to="/menu">
                                Order Now
                            </Link>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= QUICK ACTIONS ================= */}

            <section className="section">

                <div className="section-heading">

                    <div>
                        <span className="small-title">
                            QUICK ACCESS
                        </span>

                        <h2>
                            Quick Actions
                        </h2>
                    </div>

                </div>


                <div className="cards">

                    <Link to="/menu" className="dashboard-card">

                        <div className="card-icon">
                            🍽️
                        </div>

                        <h3>
                            Order Food
                        </h3>

                        <p>
                            Browse our complete menu
                        </p>

                    </Link>


                    <Link to="/cart" className="dashboard-card">

                        <div className="card-icon">
                            🛒
                        </div>

                        <h3>
                            My Cart
                        </h3>

                        <p>
                            View items added to cart
                        </p>

                    </Link>


                    <Link to="/orders" className="dashboard-card">

                        <div className="card-icon">
                            📦
                        </div>

                        <h3>
                            My Orders
                        </h3>

                        <p>
                            Track your previous orders
                        </p>

                    </Link>

                </div>

            </section>


            {/* ================= ORDER TRACKER ================= */}

            <section className="section">

                <div className="section-heading">

                    <div>
                        <span className="small-title">
                            LIVE UPDATE
                        </span>

                        <h2>
                            Order Tracking
                        </h2>
                    </div>

                    <Link to="/orders" className="view-all">
                        View Orders →
                    </Link>

                </div>


                <div className="order-tracker">

                    <div className="order-header">

                        <div>
                            <span>
                                Order #SC1024
                            </span>

                            <h3>
                                No Active Order
                            </h3>
                        </div>

                        <span className="status-badge">
                            Ready
                        </span>

                    </div>


                    <div className="progress-line">

                        <div className="progress-step active">

                            <div className="step-circle">
                                ✓
                            </div>

                            <span>
                                Placed
                            </span>

                        </div>


                        <div className="progress-bar active-bar"></div>


                        <div className="progress-step active">

                            <div className="step-circle">
                                ✓
                            </div>

                            <span>
                                Preparing
                            </span>

                        </div>


                        <div className="progress-bar active-bar"></div>


                        <div className="progress-step active">

                            <div className="step-circle">
                                3
                            </div>

                            <span>
                                Ready
                            </span>

                        </div>


                        <div className="progress-bar"></div>


                        <div className="progress-step">

                            <div className="step-circle">
                                4
                            </div>

                            <span>
                                Picked Up
                            </span>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= POPULAR TODAY ================= */}

            <section className="section">

                <div className="section-heading">

                    <div>
                        <span className="small-title">
                            TODAY'S FAVOURITES
                        </span>

                        <h2>
                            Popular Today 🔥
                        </h2>
                    </div>

                    <Link to="/menu" className="view-all">
                        View Full Menu →
                    </Link>

                </div>


                <div className="food-cards">


                    {/* SANDWICH */}

                    <div className="food-card">

                        <div className="food-image">

                            <img
                                src="/food/sand.jpg"
                                alt="Veg Sandwich"
                            />

                        </div>

                        <div className="food-card-content">

                            <h3>
                                Veg Sandwich
                            </h3>

                            <div className="food-rating">
                                ⭐ 4.8
                            </div>

                            <div className="food-bottom">

                                <strong>
                                    ₹40
                                </strong>

                                <Link to="/menu">
                                    Order
                                </Link>

                            </div>

                        </div>

                    </div>


                    {/* MASALA DOSA */}

                    <div className="food-card">

                        <div className="food-image">

                            <img
                                src="/food/img1.jpg"
                                alt="Masala Dosa"
                            />

                        </div>

                        <div className="food-card-content">

                            <h3>
                                Masala Dosa
                            </h3>

                            <div className="food-rating">
                                ⭐ 4.9
                            </div>

                            <div className="food-bottom">

                                <strong>
                                    ₹60
                                </strong>

                                <Link to="/menu">
                                    Order
                                </Link>

                            </div>

                        </div>

                    </div>


                    {/* MEDU VADA */}

                    <div className="food-card">

                        <div className="food-image">

                            <img
                                src="/food/img2.jpg"
                                alt="Medu Vada"
                            />

                        </div>

                        <div className="food-card-content">

                            <h3>
                                Medu Vada
                            </h3>

                            <div className="food-rating">
                                ⭐ 4.7
                            </div>

                            <div className="food-bottom">

                                <strong>
                                    ₹40
                                </strong>

                                <Link to="/menu">
                                    Order
                                </Link>

                            </div>

                        </div>

                    </div>


                    {/* VEG NOODLES */}

                    <div className="food-card">

                        <div className="food-image">

                            <img
                                src="/food/nod.jpg"
                                alt="Veg Hakka Noodles"
                            />

                        </div>

                        <div className="food-card-content">

                            <h3>
                                Veg Hakka Noodles
                            </h3>

                            <div className="food-rating">
                                ⭐ 4.6
                            </div>

                            <div className="food-bottom">

                                <strong>
                                    ₹70
                                </strong>

                                <Link to="/menu">
                                    Order
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= OFFER ================= */}

            <section className="offer-section">

                <div className="offer-content">

                    <span>
                        🎉 TODAY'S SPECIAL OFFER
                    </span>

                    <h2>
                        Get ₹20 OFF on your first order
                    </h2>

                    <p>
                        Order your favourite food today
                        and enjoy a special discount.
                    </p>

                </div>


                <div className="offer-icon">
                    🎁
                </div>

            </section>


            {/* ================= STATS ================= */}

            <section className="stats-container">

                <div className="stat-card">

                    <span className="stat-icon">
                        🍽️
                    </span>

                    <div>
                        <strong>
                            12
                        </strong>

                        <p>
                            Orders
                        </p>
                    </div>

                </div>


                <div className="stat-card">

                    <span className="stat-icon">
                        ⏱️
                    </span>

                    <div>
                        <strong>
                            48 min
                        </strong>

                        <p>
                            Time Saved
                        </p>
                    </div>

                </div>


                <div className="stat-card">

                    <span className="stat-icon">
                        ❤️
                    </span>

                    <div>
                        <strong>
                            Vada Pav
                        </strong>

                        <p>
                            Favourite
                        </p>
                    </div>

                </div>


                <div className="stat-card">

                    <span className="stat-icon">
                        💰
                    </span>

                    <div>
                        <strong>
                            ₹120
                        </strong>

                        <p>
                            Total Saved
                        </p>
                    </div>

                </div>

            </section>


            {/* ================= FOOTER ================= */}

            <footer>

                <div className="footer-logo">
                    🍽️ Smart Canteen
                </div>

                <p>
                    Smart ordering • Less waiting • Better experience
                </p>

                <p>
                    © 2026 Smart Canteen System
                </p>

            </footer>

        </div>
    );
}

export default Dashboard;