import { useOutletContext, Link, useNavigate } from 'react-router';
import { ShoppingBag } from 'lucide-react';
import styles from './Cart.module.css';

export function Cart() {
  const { cart, updateQuantity, removeFromCart } = useOutletContext();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.emptyContainer}>
          <ShoppingBag size={64} className={styles.emptyIcon} aria-hidden="true" />
          <h2 className={styles.emptyTitle}>Your cart is empty</h2>
          <p className={styles.emptyText}>
            Looks like you haven't added anything to your cart yet. Let's find something you love!
          </p>
          <Link to="/shop" className={styles.startShoppingBtn}>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const totalItemCount = cart.reduce((total, item) => total += item.quantity, 0);

  const totalCents = cart.reduce((total, item) => {
    const priceInCents = Math.round(item.price * 100);
    return total + priceInCents * item.quantity;
  }, 0);

  const totalPrice = (totalCents / 100).toFixed(2);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.cartTitle}>Shopping Cart</h1>
      <div className={styles.cartContainer}>
        <ul className={styles.cartItemGrid}>
          {cart.map((cartItem) => (
            <li key={cartItem.id} className={styles.cartItem}>
              <img className={styles.cartItemImage} src={cartItem.image} alt={cartItem.title} />
              <div className={styles.descriptionContainer}>
                <div>
                  <p className={styles.cartItemTitle}>{cartItem.title}</p>
                  <p className={styles.cartItemPrice}>${cartItem.price}</p>
                </div>
                <div className={styles.btnContainer}>
                  <button
                    className={styles.decrementBtn}
                    onClick={() => {
                      cartItem.quantity > 1 ? updateQuantity(cartItem.id, cartItem.quantity - 1) : removeFromCart(cartItem.id);
                    }}
                  >
                    -
                  </button>
                  <p className={styles.quantityDisplay}>{cartItem.quantity}</p>
                  <button className={styles.incrementBtn} onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}>
                    +
                  </button>
                  <button className={styles.deleteBtn} onClick={() => removeFromCart(cartItem.id)}>
                    delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.summaryContainer}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          <p className={styles.totalAmount}>
            Total ({totalItemCount} {totalItemCount > 1 ? 'items' : 'item'}): ${totalPrice}
          </p>
          <button className={styles.checkoutBtn} onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}
