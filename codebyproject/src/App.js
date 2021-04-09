import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Product from './Product';
import Cart from './Cart';
import './styles/css/global.css';
import { CartStorage } from './CartContext';

function App() {
  return (
    <CartStorage>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartStorage>
  );
}

export default App;
