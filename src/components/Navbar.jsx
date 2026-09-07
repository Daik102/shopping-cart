import { NavLink } from "react-router";
//import "./Navbar.css";

function Navbar({ cart = 0 }) {
  const totalItemCount = cart.reduce((total, item) => total += item.quantity, 0);

  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink 
        to="/shop"
        //className={({ isActive }) => (isActive ? "custom-active" : "nav-item")}
      >
        Shop
      </NavLink>
      <NavLink 
        to="/cart"
        //className={({ isActive }) => (isActive ? "custom-active" : "nav-item")}
      >
        Cart {totalItemCount > 0 && <span>({totalItemCount})</span>}
      </NavLink>
    </nav>
  );
}

export default Navbar
