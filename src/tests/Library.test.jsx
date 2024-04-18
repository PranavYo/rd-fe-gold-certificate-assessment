import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Library from '../components/Library';
import AlertContext from '../context/Alerts/AlertContext';

describe('Library', () => {
  it('renders the library component with books', () => {
    render(
      <Library />
    );
    const bookElements = screen.getAllByTestId('book');
    expect(bookElements.length).toBeGreaterThan(0);
  });

  it('filters books when search input is changed', () => {
    render(
      <Library />
    );
    const searchInput = screen.getByPlaceholderText('Enter the book name');
    fireEvent.change(searchInput, { target: { value: '' } });
    const bookElements = screen.getAllByTestId('book');
    expect(bookElements.length).toBe(12);
  });

  it('updates book status when borrow/return button is clicked', () => {
    const mockAlertState = {
      alertState: {},
      setAlertState: jest.fn(),
    };
    render(
      <AlertContext.Provider value={mockAlertState}>
        <Library />
      </AlertContext.Provider>
    );
    const borrowButtons = screen.getAllByTestId('borrow-button');
    borrowButtons.forEach(button => {
        fireEvent.click(button);
    });
    expect(mockAlertState.setAlertState).toHaveBeenCalled();
  });
});
