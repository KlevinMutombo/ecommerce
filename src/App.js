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
      {/* Barre de navigation */}
      <nav>
        {/* Logo à gauche */}
        <img src="/Ryanairee.png" alt="Company Logo" />

        {/* Liens à droite */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </nav>

      {/* Routes principales */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
