'use client'
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // 1. Load cart from browser storage on startup
  useEffect(() => {
    const savedCart = localStorage.getItem('olmarithi_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error loading cart", e);
        setCart([]);
      }
    }
  }, []);

  // 2. Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem('olmarithi_cart', JSON.stringify(cart));
  }, [cart]);

  // 3. Smart Add to Cart: Increases quantity if item already exists
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`${product.name} added to cart!`);
  };

  // 4. Remove item from cart
  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // 5. Update Quantity (The function that was causing the error)
  const updateQuantity = (index, newQty) => {
    if (newQty < 1) return; // Don't allow less than 1
    setCart((prev) => prev.map((item, i) => 
      i === index ? { ...item, quantity: newQty } : item
    ));
  };

  // 6. Calculate total based on quantity x price
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);