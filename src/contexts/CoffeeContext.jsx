import React, { createContext, useContext , useState } from 'react'

const CoffeeContext = createContext();

export function CoffeeProvider({children}) {

    const [user, setUser] = useState(null);

    const setUserData = (userData) => {
      setUser(userData);
    };
    const [selectedCoffee, setSelectedCoffee] = useState('');
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (item) => {
        setCartItems([...cartItems, item]);
    };

    const removeItemFromCart = (item) => {
        // Remove apenas o item correspondente ao botão clicado
        const updatedCart = cartItems.filter((cartItem) => {
          // Verifica o id e o tamanho para garantir que estamos removendo o item correto
          return cartItem.id !== item.id || cartItem.size !== item.size;
        });
      
        setCartItems(updatedCart);
      };
      

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CoffeeContext.Provider value={{selectedCoffee, setSelectedCoffee, cartItems, addItemToCart, removeItemFromCart, clearCart, user, setUserData}}>
            {children}
        </CoffeeContext.Provider>
  )
}

export function useItem() {
    return useContext(CoffeeContext);
}