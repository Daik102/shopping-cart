import { NavLink } from "react-router";
//import "./Navbar.css";

function Navbar() {
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
        Cart
      </NavLink>
    </nav>
  );
}

export default Navbar
