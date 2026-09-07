import { useState } from 'react'
import { Outlet } from 'react-router';
import Navbar from "./components/Navbar";
import "./Layout.css";

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

  const a = {id: 1, title: "aaa", price: 10, image: "xxx"};
  console.log(cart);
//const totalQuantity = cart.reduce((total, item) => total += item.quantity, 0);

  return (
    <div>
      <button className='btn' onClick={() => addToCart(a, 2)}>Add</button>
      <button onClick={() => updateQuantity(1, 5)}>Update</button>
      <button onClick={() => removeFromCart(1)}>Remove</button>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
