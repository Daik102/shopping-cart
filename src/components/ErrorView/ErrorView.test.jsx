import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { describe, it, expect } from 'vitest';
import { ErrorView } from './ErrorView';

describe('ErrorView Component', () => {
  it('renders default props when none are provided', () => {
    render(
      <BrowserRouter>
        <ErrorView />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Something Went Wrong');
    expect(screen.getByText('An unexpected error occurred. Please try again.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
  });

  it('renders dynamic title, message, and link props correctly', () => {
    render(
      <BrowserRouter>
        <ErrorView 
          title="Page Not Found" 
          message="The path /xyz does not exist." 
          buttonText="Back to Home" 
          buttonLink="/Home" 
        />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Page Not Found');
    expect(screen.getByText('The path /xyz does not exist.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
  });
});
