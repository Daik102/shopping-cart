import { useState, useEffect } from 'react'
import { Outlet } from 'react-router';
import Navbar from './components/Navbar/Navbar'

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart-items');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart-items', JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((total, item) => total += item.quantity, 0);
  
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
      <Navbar cartCount={cartCount} />
      <main>
        <Outlet context={{ cart, addToCart, updateQuantity, removeFromCart }} />
      </main>
    </div>
  )
}

export default App
