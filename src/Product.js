import React from 'react';
import { useParams } from 'react-router-dom';

export default function Product() {
  const { productId } = useParams();

  // fetch product by productId, render details...
  return (
    <main>
      <h1>Product: {productId}</h1>
      {/* ... */}
    </main>
  );
}
