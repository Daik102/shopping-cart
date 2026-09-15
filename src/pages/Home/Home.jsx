import { Link } from "react-router";
import styles from './Home.module.css';

export function Home() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heroTitle}>Odin Shopping Cart</h1>
      <p className={styles.heroSubTitle}>Discover Quality Products</p>
      <Link to="/shop" className={styles.startShoppingBtn} >
        Start Shopping
      </Link>
      <img className={styles.heroImage} src="https://picsum.photos/600/600" alt="" />
      <div className={styles.linkContainer}>
        <p className={styles.linkDescription}>
          Hero images are from <a className={styles.outerLink} href="https://picsum.photos/" target="_blank" rel="noreferrer">Lorem Picsum</a>.
        </p>
        <p className={styles.linkDescription}>
          Product data is from <a className={styles.outerLink} href="https://fakestoreapi.com/" target="_blank" rel="noreferrer">Fake Store API</a>.
        </p>
        <p className={styles.linkDescription}>
          <a className={styles.outerLink} href="https://daik102.github.io/homepage/" target="_blank" rel="noreferrer">2026 Daik</a>
        </p>
      </div>
    </div>
  );
}
