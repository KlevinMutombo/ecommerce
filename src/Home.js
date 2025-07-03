// src/Home.js
import React from 'react';
import heroShoe from './vapormax.jpeg';  // path to your image
import './App.css';

export default function Home() {
  return (
    <div className="home">
      <section className="home-hero">
        <div className="text">
          <h1>Find your dream sneakers</h1>
          <p>Discover our exclusive collection of top-quality kicks.</p>
          <button onClick={() => window.location.href = '/products'}>
            Explore Our Products
          </button>
        </div>
        <img src={heroShoe} alt="Dream sneakers" />
      </section>

      {/* …rest of your home page content here… */}

      <section className="features">
        <div className="feature-card">
          <img src="/Imagesss/payment.avif" alt="Secure Payment" />
          <p>Secure Payment</p>
        </div>
        <div className="feature-card">
          <img src="/Imagesss/support.png" alt="24/7 Support" />
          <p>24/7 Support</p>
        </div>
        <div className="feature-card">
          <img src="/Imagesss/delivery.png" alt="Fast Delivery" />
          <p>Fast Delivery</p>
        </div>
      </section>
    </div>

              
  );
}
