import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Menu from "./Menu";
import Cart from "./Cart";
import OrderSuccess from "./OrderSuccess";
import OrderHistory from "./OrderHistory";
import StaffDashboard from "./StaffDashboard"; 
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";
import { CartProvider } from "./CartContext";
import ManageFood from "./ManageFood";

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Routes>

                    <Route path="/" element={<Login />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/register" element={<Register />} />

                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route path="/menu" element={<Menu />} />

                    <Route path="/cart" element={<Cart />} />

                    <Route
                        path="/order-success"
                        element={<OrderSuccess />}
                    />

                    <Route
                        path="/orders"
                        element={<OrderHistory />}
                    />
                    <Route path="/staff" element={<StaffDashboard />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/manage-food" element={<ManageFood />} />
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;