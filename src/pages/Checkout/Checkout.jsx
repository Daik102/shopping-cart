import { Link } from 'react-router';
import { Construction } from 'lucide-react';
import styles from '../../components/ErrorView/ErrorView.module.css';

export function Checkout() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Construction size={64} className={styles.icon} />
        <h2 className={styles.title}>Sorry, this is a practice site</h2>
        <p className={styles.text}>
          Checkout feature might be added in the future. Stay tuned.
        </p>
        <Link to="/cart" className={styles.actionBtn}>
          Back to Cart
        </Link>
      </div>
    </div>
  );
}
