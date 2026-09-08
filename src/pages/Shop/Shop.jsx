import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router';
import styles from './Shop.module.css';

function Shop() {
  const { addToCart } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = 'https://fakestoreapi.com/products';
        const response = await fetch(url, { signal });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const responseArray = data.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
        }));
  
        setProducts(responseArray);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.statusContainer}>
          <p className={styles.loadingText}>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.statusContainer}>
          <p className={styles.errorText}>Error: {error}</p>
          <button className={styles.tryAgainBtn} onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <ul className={styles.productGrid}>
          {products.map((product) => (
            <li key={product.id} className={styles.product}>
              <img className={styles.productImage} src={product.image} alt={product.title} />
              <p className={styles.productTitle}>{product.title}</p>
              <p className={styles.productPrice}>${product.price}</p>
              <button className={styles.addToCartBtn} onClick={() => addToCart(product, 1)}>Add to Cart</button>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default Shop
