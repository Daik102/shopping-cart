import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Cart } from './Cart';

// Create mock handlers and a flexible context value container
const mockUpdateQuantity = vi.fn();
const mockRemoveFromCart = vi.fn();

const mockCartItems = [
  { id: 1, title: 'Fjallraven Backpack', price: 100, image: 'bag.jpg', quantity: 2 },
  { id: 2, title: 'Casual T-Shirt', price: 25, image: 'shirt.jpg', quantity: 1 },
];

// Hoist mock state so it can be safely updated inside tests
const contextMock = vi.hoisted(() => ({
  value: {
    cart: [],
    updateQuantity: vi.fn(),
    removeFromCart: vi.fn(),
  },
}));

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: () => contextMock.value,
  };
});

describe('Cart Component', () => {
  beforeEach(() => {
    // Reset context state to default populated cart before each test
    contextMock.value = {
      cart: mockCartItems,
      updateQuantity: mockUpdateQuantity,
      removeFromCart: mockRemoveFromCart,
    };
    vi.clearAllMocks();
  });

  it('renders cart items, quantity controls, and calculates total correctly', () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByText('Fjallraven Backpack')).toBeInTheDocument();
    expect(screen.getByText('Casual T-Shirt')).toBeInTheDocument();
    expect(screen.getByText(/Total \(3 items\): \$225\.00/i)).toBeInTheDocument();
  });

  it('triggers quantity increment, decrement, and removal actions', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    // Test '+' button on item 1
    const incrementButtons = screen.getAllByRole('button', { name: '+' });
    await user.click(incrementButtons[0]);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);

    // Test '-' button on item 1
    const decrementButtons = screen.getAllByRole('button', { name: '-' });
    await user.click(decrementButtons[0]);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);

    // Test 'delete' button on item 1
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    await user.click(deleteButtons[0]);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  it('renders empty cart view when cart array is empty', () => {
    // Override context value with an empty cart for this test
    contextMock.value = {
      cart: [],
      updateQuantity: mockUpdateQuantity,
      removeFromCart: mockRemoveFromCart,
    };

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Your cart is empty');
    expect(screen.getByRole('link', { name: /start shopping/i })).toHaveAttribute('href', '/shop');
  });
});
