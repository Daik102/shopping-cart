import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, it, expect, vi } from 'vitest';
import { Shop } from './Shop';

// 1. Mock react-router's useOutletContext while preserving other exports (like MemoryRouter)
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: () => ({ addToCart: vi.fn() }),
  };
});

// 2. Mock our custom useFetch hook
vi.mock('../../hooks/useFetch', () => ({
  useFetch: vi.fn(),
}));

import { useFetch } from '../../hooks/useFetch';

describe('Shop Component', () => {
  it('displays loading state when data is being fetched', () => {
    useFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <Shop />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading products/i)).toBeInTheDocument();
  });

  it('renders sanitized products grid on successful fetch', () => {
    const mockRawProducts = [
      { id: 1, title: 'Item 1', price: 10, image: 'img1.jpg' },
      { id: 2, title: 'Item 2', price: 20, image: 'img2.jpg' },
    ];

    useFetch.mockReturnValue({
      data: mockRawProducts,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <Shop />
      </MemoryRouter>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('$10')).toBeInTheDocument();
    expect(screen.getByText('$20')).toBeInTheDocument();
  });

  it('renders ErrorView when fetching fails with an error', () => {
    useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: 'Network Error: Failed to fetch',
    });

    render(
      <MemoryRouter>
        <Shop />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Failed to Load Products');
    expect(screen.getByText('Network Error: Failed to fetch')).toBeInTheDocument();
  });
});
