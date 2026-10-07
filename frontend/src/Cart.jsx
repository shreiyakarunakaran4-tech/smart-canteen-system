import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import "./Navbar.css";
import "./Cart.css";

function Cart() {
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        totalPrice
    } = useCart();
    
    const navigate = useNavigate();

    const placeOrder = async () => {
        if (cart.length === 0) return;

        try {
            const response = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerName: "Student",
                    items: cart.map((item) => ({
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    totalAmount: totalPrice
                })
            });

            const savedOrder = await response.json();

            navigate("/order-success", {
                state: {
                    token: "SC" + savedOrder.tokenNumber,
                    totalPrice: savedOrder.totalAmount
                }
            });
        } catch (error) {
            console.error("Order error:", error);
            alert("Could not reach backend server. Make sure server.js is running!");
        }
    };
    
    return (
        <div className="cart-page">
            <nav className="navbar">
                <div className="navbar-logo">
                    🍽️ Smart Canteen
                </div>
                <div className="nav-links">
                    <Link to="/dashboard">Home</Link>
                    <Link to="/menu">Menu</Link>
                    <Link to="/cart" className="active">Cart</Link>
                    <Link to="/orders">Orders</Link>
                    <Link to="/">Logout</Link>
                </div>
            </nav>

            <div className="cart-container">
                <h1>🛒 Your Cart</h1>

                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <h2>Your cart is empty</h2>
                        <p>Add some delicious food from the menu.</p>
                        <Link to="/menu">
                            <button>Go to Menu</button>
                        </Link>
                    </div>
                ) : (
                    <>
                        {cart.map((item) => (
                            <div className="cart-item" key={item.id}>
                    <div className="food-info">
                                {item.image || item.imageUrl ? (
                                    <img
                                    src={item.image || item.imageUrl}
                                    alt={item.name}
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        borderRadius: "8px",
                                        objectFit: "cover",
                                    }}
                                    />
                                ) : (
                                    <span className="food-emoji">🍽️</span>
                                )}
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>₹{item.price} each</p>
                                </div>
                                </div>
                                <div className="quantity">
                                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                                </div>

                                <div className="item-total">
                                    ₹{item.price * item.quantity}
                                </div>

                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        <div className="cart-summary">
                            <h2>Total: ₹{totalPrice}</h2>
                            <button className="order-btn" onClick={placeOrder}>
                                Place Order
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Cart;