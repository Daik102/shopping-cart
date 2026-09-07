import { Link } from "react-router";
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heroTitle}>Odin Shopping Cart</h1>
      <p className={styles.heroSubTitle}>Discover Quality Products</p>
      <Link to="/shop" className={styles.shopBtn} >
        Shop Now
      </Link>
      <img src="https://picsum.photos/800/600" alt="Featured products banner" />
    </div>
  );
}

export default Home
