import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from './ProductCard';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    title: 'Fjallraven - Backpack',
    price: 109.95,
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  };

  it('renders product details accurately', () => {
    render(<ProductCard product={mockProduct} addToCart={vi.fn()} />);

    // Check title
    expect(screen.getByText('Fjallraven - Backpack')).toBeInTheDocument();

    // Check price with exact string match
    expect(screen.getByText('$109.95')).toBeInTheDocument();

    // Check image alt text
    const image = screen.getByRole('img', { name: 'Fjallraven - Backpack' });
    expect(image).toHaveAttribute('src', mockProduct.image);
  });

  it('allows user to change quantity and trigger addToCart callback', async () => {
    const mockAddToCart = vi.fn();
    const user = userEvent.setup();

    render(<ProductCard product={mockProduct} addToCart={mockAddToCart} />);

    // 1. Target the select element by its aria-label
    const select = screen.getByRole('combobox', { name: /select quantity/i });

    // 2. Select option '3'
    await user.selectOptions(select, '3');
    expect(select.value).toBe('3');

    // 3. Click 'Add to Cart' button
    const addButton = screen.getByRole('button', { name: /add to cart/i });
    await user.click(addButton);

    // 4. Verify callback parameters (Product object and Number 3)
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 3);
  });
});
