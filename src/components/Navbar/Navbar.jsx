import { NavLink } from "react-router";
import { Sparkle, House, Store, ShoppingCart } from 'lucide-react';
import styles from "./Navbar.module.css";

export function Navbar({ cartCount }) {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.navbarTitle}>
        <Sparkle className={styles.titleIcon} size={20} aria-hidden="true" />
        Odin Shopping Cart
      </h1>
      <NavLink 
        to="/" end
        className={({ isActive }) => (isActive ? styles.customActive : styles.navItem)}
      >
        <span className={styles.linkContent}>
          <House className={styles.linkIcon} size={20} aria-hidden="true" />
          Home
        </span>
      </NavLink>
      <NavLink 
        to="/shop"
        className={({ isActive }) => (isActive ? styles.customActive : styles.navItem)}
      >
        <span className={styles.linkContent}>
          <Store className={styles.linkIcon} size={20} aria-hidden="true" />
          Shop
        </span>
      </NavLink>
      <NavLink 
        to="/cart"
        className={({ isActive }) => (isActive ? styles.customActive : styles.navItem)}
      >
        <span className={styles.linkContent}>
          <ShoppingCart className={styles.linkIcon} size={20} aria-hidden="true" />
          Cart
          <span className={styles.badge}>({cartCount})</span>
        </span>
      </NavLink>
    </nav>
  );
}
