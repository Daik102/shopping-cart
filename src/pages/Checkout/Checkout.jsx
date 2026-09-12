import { Link } from 'react-router';
import styles from '../Cart/Cart.module.css';

export function Checkout() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.cartTitle}>Sorry, this is a practice site</h1>
      <Link to="/cart" className={styles.backToTheCartBtn}>
        Back to the cart
      </Link>
    </div>
  );
}
