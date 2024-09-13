import React, { createContext, useState, useContext, useCallback } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const updateCart = useCallback((newCart) => {
    setCart(newCart);
  }, []);

  return <CartContext.Provider value={{ cart, updateCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
