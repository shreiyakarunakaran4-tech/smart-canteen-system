import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (food) => {
        setCart((currentCart) => {
            const existingItem = currentCart.find(
                (item) => item.id === food.id
            );

            if (existingItem) {
                return currentCart.map((item) =>
                    item.id === food.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...currentCart, { ...food, quantity: 1 }];
        });
    };

    const increaseQuantity = (id) => {
        setCart((currentCart) =>
            currentCart.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCart((currentCart) =>
            currentCart
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (id) => {
        setCart((currentCart) =>
            currentCart.filter((item) => item.id !== id)
        );
    };

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                totalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}