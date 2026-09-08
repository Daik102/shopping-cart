import { NavLink } from "react-router";
import styles from "./Navbar.module.css";

function Navbar({ cart = 0 }) {
  const totalItemCount = cart.reduce((total, item) => total += item.quantity, 0);

  return (
    <nav>
      <NavLink 
        to="/" end
        className={({ isActive }) => (isActive ? styles.customActive : styles.navItem)}
      >
        Home
      </NavLink>
      <NavLink 
        to="/shop"
        className={({ isActive }) => (isActive ? styles.customActive : styles.navItem)}
      >
        Shop
      </NavLink>
      <NavLink 
        to="/cart"
        className={({ isActive }) => (isActive ? styles.customActive : styles.navItem)}
      >
        Cart {totalItemCount > 0 && <span>({totalItemCount})</span>}
      </NavLink>
    </nav>
  );
}

export default Navbar
