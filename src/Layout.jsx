import { useState } from 'react'
import { Outlet } from 'react-router';
import "./Layout.module.css";
import Navbar from './components/Navbar/Navbar'

function Layout() {
  const [cart, setCart] = useState([]);

  const addToCart = ((product, quantity) => {
    const duplication = cart.find((item) => item.id === product.id);
    
    if (duplication) {
      setCart((prevCart) => 
        prevCart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        { 
          id: product.id,
          title: product.title,
          price: product.price,
          quantity,
          image: product.image,
        },
      ]);
    }
  });

  const updateQuantity = ((id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart((prevCart) => 
      prevCart.map((item) => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  });

  const removeFromCart = ((id) => {
    setCart((prevCart) => 
      prevCart.filter((item) => item.id !== id)
    );
  });

  return (
    <div>
      <Navbar cart={cart} />
      <main>
        <Outlet context={{ cart, addToCart, updateQuantity, removeFromCart }} />
      </main>
    </div>
  )
}

export default Layout
