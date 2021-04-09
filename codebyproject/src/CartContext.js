import React from 'react';

const CartContext = React.createContext();

export const CartStorage = ({ children }) => {
  const [dataCart, setDataCart] = React.useState([]);
  return (
    <CartContext.Provider value={{ dataCart, setDataCart }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
