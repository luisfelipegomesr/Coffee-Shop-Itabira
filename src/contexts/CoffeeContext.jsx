import React, { createContext, useContext , useState } from 'react'

const CoffeeContext = createContext();

export function CoffeeProvider({children}) {
    const [selectedCoffee, setSelectedCoffee] = useState('');
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (item) => {
        setCartItems([...cartItems, item]);
    };
    
    const removeItemFromCart = (item) => {
        const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
        setCartItems(updatedCart);
    }; 

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CoffeeContext.Provider value={{selectedCoffee, setSelectedCoffee, cartItems, addItemToCart, removeItemFromCart, clearCart}}>
            {children}
        </CoffeeContext.Provider>
  )
}

export function useItem() {
    return useContext(CoffeeContext);
}