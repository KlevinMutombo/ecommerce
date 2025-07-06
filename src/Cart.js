// src/pages/Cart.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Stepper = ({ steps, currentStep }) => (
  <div className="stepper">
    {steps.map((label, index) => (
      <div
        key={index}
        className={`step ${currentStep === index + 1 ? 'active' : ''}`}
      >
        <div className="step-number">{index + 1}</div>
        <div className="step-label">{label}</div>
      </div>
    ))}
  </div>
);

export default function Cart() {
  const [items, setItems] = useState([]);
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({ name: '', email: '', address: '' });
  const [payment, setPayment] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [survey, setSurvey] = useState({ rating: '', comments: '' });

  // Charger le panier au montage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setItems(cart);
  }, []);

  // Réinitialiser le panier lorsque l'utilisateur arrive à l'étape 4 (confirmation)
  useEffect(() => {
    if (step === 4) {
      localStorage.removeItem('cart');
      setItems([]);
    }
  }, [step]);

  const removeItem = index => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);
  const handleInfoChange = e => setInfo({ ...info, [e.target.name]: e.target.value });
  const handlePaymentChange = e => setPayment({ ...payment, [e.target.name]: e.target.value });
  const handleSurveyChange = e => setSurvey({ ...survey, [e.target.name]: e.target.value });

  const steps = ['Cart', 'Information', 'Payment', 'Confirmation', 'Survey'];

  return (
    <div className="cart-page">
      {/* Stepper en haut de la page */}
      <Stepper steps={steps} currentStep={step} />

      {step === 1 && (
        <>
          <h2>Your Cart</h2>
          {items.length === 0 ? (
            <p>Your cart is empty. <Link to="/products">Continue shopping</Link></p>
          ) : (
            <>
              <ul className="cart-items">
                {items.map((item, idx) => (
                  <li key={idx} className="cart-item">
                    <div className="info">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <h3>{item.name}</h3>
                        <p>Size: {item.size}, Color: {item.color}</p>
                        <p>Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="actions">
                      <p className="price">${(item.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => removeItem(idx)}>Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="summary">
                <h3>Total: ${total.toFixed(2)}</h3>
                <button className="checkout" onClick={handleNext}>Checkout</button>
              </div>
            </>
          )}
        </>
      )}

      {step === 2 && (
        <div className="form-step">
          <h2>Enter Your Information</h2>
          <label>Name:</label>
          <input name="name" value={info.name} onChange={handleInfoChange} />
          <label>Email:</label>
          <input name="email" type="email" value={info.email} onChange={handleInfoChange} />
          <label>Address:</label>
          <input name="address" value={info.address} onChange={handleInfoChange} />
          <div className="form-actions">
            <button onClick={handlePrev}>Back</button>
            <button onClick={handleNext} disabled={!(info.name && info.email && info.address)}>Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="form-step">
          <h2>Payment Method</h2>
          <label>Card Number:</label>
          <input name="cardNumber" value={payment.cardNumber} onChange={handlePaymentChange} />
          <label>Expiry Date:</label>
          <input name="expiry" value={payment.expiry} placeholder="MM/YY" onChange={handlePaymentChange} />
          <label>CVV:</label>
          <input name="cvv" type="password" value={payment.cvv} onChange={handlePaymentChange} />
          <div className="form-actions">
            <button onClick={handlePrev}>Back</button>
            <button onClick={handleNext} disabled={!(payment.cardNumber && payment.expiry && payment.cvv)}>Pay</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="confirmation">
          <h2>Thank you for your purchase!</h2>
          <p>A confirmation has been sent to {info.email}.</p>
          <div className="form-actions">
            <button onClick={handleNext}>Take our Survey</button>
            <Link to="/" className="button home-button">Home</Link>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="form-step">
          <h2>We value your feedback</h2>
          <label>Overall Rating (1–5):</label>
          <select name="rating" value={survey.rating} onChange={handleSurveyChange}>
            <option value="">Select...</option>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <label>Comments:</label>
          <textarea name="comments" rows="4" value={survey.comments} onChange={handleSurveyChange} />
          <div className="form-actions">
            <button onClick={handlePrev}>Back</button>
            <button
              disabled={!survey.rating}
              onClick={() => {
                alert('Thank you for your feedback!');
                setStep(1);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
