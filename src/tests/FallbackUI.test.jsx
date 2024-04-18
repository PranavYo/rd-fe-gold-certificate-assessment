import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FallbackUI from '../components/FallbackUI';

describe('FallbackUI', () => {
  it('renders fallback UI correctly', () => {
    render(<FallbackUI />);
    const errorMessage = screen.getByText(/You ran into an error. Please resolve and comback/i);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('fs-2 fw-semibold text-primary');
  });
});
