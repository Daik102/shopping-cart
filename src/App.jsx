import { useState, useEffect, useRef } from 'react'
import { Outlet } from 'react-router';
import { Navbar } from './components/Navbar/Navbar';
import { Toast } from './components/Toast/Toast';

export function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart-items');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [toastMessage, setToastMessage] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('cart-items', JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const showToast = (message) => {
    // Clear existing timer if a user clicks fast multiple times
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setToastMessage(message);

    // Auto-hide toast after 3 seconds
    timeoutRef.current = setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };
  
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
          thumbnail: product.thumbnail,
        },
      ]);
    }

    showToast(`Added ${product.title} to cart!`);
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
    <>
      <Navbar cartCount={cartCount} />
      <main>
        <Outlet context={{ cart, addToCart, updateQuantity, removeFromCart }} />
        <Toast toastMessage={toastMessage} />
      </main>
    </>
  )
}
