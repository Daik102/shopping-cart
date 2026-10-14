import styles from './Toast.module.css';

export function Toast({ toastMessage }) {
  if (!toastMessage) {
    return null;
  }

  return (
    <div className={styles.toast}>
      <span>✓</span>
      <span>{toastMessage}</span>
    </div>
  );
}
