import { useState } from 'react';
import styles from './ProductCard.module.css';

export function ProductCard({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <li className={styles.product}>
      <img className={styles.productImage} src={product.image} alt={product.title} />
      <p className={styles.productTitle}>{product.title}</p>
      <p className={styles.productPrice}>${product.price}</p>
      <div className={styles.actionsContainer}>
        <div className={styles.quantityContainer}>
          <select 
            id={`quantity-${product.id}`}
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)}
            className={styles.quantitySelect}
            aria-label="Select quantity"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                Quantity: {num}
              </option>
            ))}
          </select>
        </div>
        <button className={styles.addToCartBtn} onClick={() => addToCart(product, Number(quantity))}>
          Add to Cart
        </button>
      </div>
    </li>
  );
}
