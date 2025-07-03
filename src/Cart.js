// src/Cart.js
import React from 'react';

export default function Cart() {

  const cartItems = [];

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map(item => (
              <li key={item.id} style={{ marginBottom: '1rem' }}>
                <strong>{item.name}</strong> x {item.quantity} — ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <button>Proceed to Checkout</button>
        </>
      )}
    </main>
  );
}
