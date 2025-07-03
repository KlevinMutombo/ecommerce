import React from 'react';
import './Footer.css';


export default function Footer() {
 return (
   <footer>
     <h3>Subscribe to our newsletter</h3>
     <form onSubmit={(e) => e.preventDefault()}>
       <input type="email" placeholder="Enter your email" required />
       <button type="submit">Subscribe</button>
     </form>
   </footer>
 );
}




