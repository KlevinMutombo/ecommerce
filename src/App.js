import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';
import Footer from './Footer';
import Home from './Home';
import Product from './Product';
import Cart from './Cart';

function App() {
  return (
    <Router>
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
        background: '#f8f8f8',
        borderBottom: '1px solid #ddd'
      }}>
        <Link to="/" style={{ margin: '0 1rem', textDecoration: 'none' }}>Home</Link>
        <Link to="/products" style={{ margin: '0 1rem', textDecoration: 'none' }}>Products</Link>
        <Link to="/cart" style={{ margin: '0 1rem', textDecoration: 'none' }}>Cart</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* THIS is the key: Products goes to YOUR Product component */}
        <Route path="/products" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        {/* Optional catch-all: */}
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
