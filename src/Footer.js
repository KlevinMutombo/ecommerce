import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ padding: '1rem', textAlign: 'center' }}>
      <Link to="/" style={{ margin: '0 1rem' }}>Bla</Link>
      <Link to="/products" style={{ margin: '0 1rem' }}>Bla</Link>
      <Link to="/cart" style={{ margin: '0 1rem' }}>Bla</Link>
      {/* add more links as you build more pages */}
    </footer>
  );
}
