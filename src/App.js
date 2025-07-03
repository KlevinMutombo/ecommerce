import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Footer from './Footer';
import Home from './Home';
import Product from './Product';
import Cart from './Cart';

function App() {
  return (
    <Router>
      <div className="App">
        {/* You can add a <Header> here if you like */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<div>All Products List</div>} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          {/* add more <Route>s as you build out categories, checkout, etc. */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

