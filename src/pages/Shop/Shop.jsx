import { useOutletContext } from 'react-router';
import { useFetch } from '../../hooks/useFetch';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ErrorView } from '../../components/ErrorView/ErrorView';
import styles from './Shop.module.css';

export function Shop() {
  const { addToCart } = useOutletContext();
  const { data: products, loading, error } = useFetch('https://dummyjson.com/products');

  const formattedProducts = Array.isArray(products) 
  ? products.map(({ id, title, price, thumbnail }) => ({ id, title, price, thumbnail }))
  : [];

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorView 
        title="Failed to Load Products" 
        message={error} 
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <ul className={styles.productGrid}>
        {formattedProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            addToCart={addToCart} 
          />
        ))}
      </ul>
    </div>
  );
}
