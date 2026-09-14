import { Link } from 'react-router';
import { AlertTriangle } from 'lucide-react';
import styles from './ErrorView.module.css';

export function ErrorView({ title, message }) {
  return (
    <div className={styles.container}>
      <AlertTriangle size={64} className={styles.icon} aria-hidden="true" />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{message}</p>
      <Link to="/" className={styles.actionBtn}>
        Back to Home
      </Link>
    </div>
  );
}
