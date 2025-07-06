// src/Home.js


import React from 'react';
import heroShoe from './vapormax.jpeg';  // Importation de l'image Vapormax depuis le dossier src
import './Home.css'; // Importation des styles spécifiques à la page d'accueil


// Composant principal de la page d'accueil
export default function Home() {
 return (
   <div className="home">
     {/* SECTION HERO */}
     <section className="home-hero">
       <div className="text">
         {/* Titre principal */}
         <h1>Find your dream sneakers.</h1>


         {/* Description sous le titre */}
         <p>Discover our exclusive collection of top-quality kicks.</p>


         {/* Bouton pour accéder à la page des produits */}
         <button onClick={() => navigate('/products')}>
           Explore Our Products
         </button>
       </div>


       {/* Image principale de la Vapormax */}
       <img src={heroShoe} alt="Dream sneakers" />
     </section>


     {/* SECTION DES FONCTIONNALITÉS */}
     <section className="features">
       {/* Carte : Paiement sécurisé */}
       <div className="feature-card">
         <img src="/Imagesss/payment.avif" alt="Secure Payment" />
         <p>Secure Payment.</p>
       </div>


       {/* Carte : Support 24/7 */}
       <div className="feature-card">
         <img src="/Imagesss/support.png" alt="24/7 Support" />
         <p>24/7 Support.</p>
       </div>


       {/* Carte : Livraison rapide */}
       <div className="feature-card">
         <img src="/Imagesss/delivery.png" alt="Fast Delivery" />
         <p>Fast Delivery.</p>
       </div>
     </section>
   </div>
 );
}
