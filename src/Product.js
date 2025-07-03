import React, { useState } from 'react';
import { useCartDispatch } from '../context/CartContext';
import './Product.css';

export default function Product() {
  const product = {
    id: 1,
    name: 'Air max 270',
    price: 150,
    image: '/images/airmax270.png',
    description: 'Find your dream sneakers with comfort and style.'
  };

  const [quantity, setQuantity] = useState(1);
  const dispatch = useCartDispatch();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity } });
  };

  return (
    <div className="product-page">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details">
        <h1>{product.name}</h1>
        <p className="price">${product.price}</p>
        <p className="description">{product.description}</p>
        <div className="purchase-section">
          <div className="quantity-input">
            <label htmlFor="quantity">Quantity:</label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(+e.target.value)}
            />
          </div>
          <button className="btn-add" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}