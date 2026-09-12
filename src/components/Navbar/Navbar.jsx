import { NavLink } from "react-router";
import { House, Store, ShoppingCart } from 'lucide-react';
import styles from "./Navbar.module.css";

function Navbar({ cartCount }) {
  return (
    <nav>
      <NavLink 
        to="/" end
        className={({ isActive }) => (isActive ? styles.customActive : styles.navItem)}
      >
        <span className={styles.cartLinkContent}>
          <House className={styles.cartIcon} size={20} />
          Home
        </span>
      </NavLink>
      <NavLink 
        to="/shop"
        className={({ isActive }) => (isActive ? styles.customActive : styles.navItem)}
      >
        <span className={styles.cartLinkContent}>
          <Store className={styles.cartIcon} size={20} />
          Shop
        </span>
      </NavLink>
      <NavLink 
        to="/cart"
        className={({ isActive }) => (isActive ? styles.customActive : styles.navItem)}
      >
        <span className={styles.cartLinkContent}>
          <ShoppingCart className={styles.cartIcon} size={20} />
          Cart
          {cartCount > 0 && <span className={styles.badge}>({cartCount})</span>}
        </span>
      </NavLink>
    </nav>
  );
}

export default Navbar
