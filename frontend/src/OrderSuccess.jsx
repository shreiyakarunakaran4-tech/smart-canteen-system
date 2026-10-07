import { useLocation, useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
    const location = useLocation();
    const navigate = useNavigate();

    const { token, totalPrice } = location.state || {};

    return (
        <div className="success-page">

            <div className="success-icon">
                ✓
            </div>

            <h1>Yay! Order Received</h1>

            <p className="success-message">
                Your order has been received successfully.
            </p>

            <div className="order-details">

                <p>
                    <strong> Token Number</strong>
                </p>

                <div className="token-number">
                    {token}
                </div>

                <p>
                    <strong>Total Amount:</strong> ₹{totalPrice}
                </p>

                <p className="status">
                    Order Status: <b>Pending</b>
                </p>

            </div>

            <button
                className="history-btn"
                onClick={() => navigate("/orders")}
            >
                View Order History
            </button>

            <button
                className="home-btn"
                onClick={() => navigate("/dashboard")}
            >
                Back to Home
            </button>

        </div>
    );
}

export default OrderSuccess;