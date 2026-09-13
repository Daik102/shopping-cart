import { Link } from 'react-router';
import { Construction } from 'lucide-react';
import styles from '../Cart/Cart.module.css';

export function Checkout() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.checkoutContainer}>
        <Construction size={64} className={styles.checkoutIcon} />
        <h2 className={styles.checkoutTitle}>Sorry, this is a practice site</h2>
        <p className={styles.checkoutText}>
          Checkout feature might be added in the future. Stay tuned.
        </p>
        <Link to="/cart" className={styles.backToTheCartBtn}>
          Back to the cart
        </Link>
      </div>
    </div>
  );
}
