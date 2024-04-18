import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AlertNotifier from '../components/Alert';
import initialAlert from '../constants/initialAlertState';
import AlertContext from '../context/Alerts/AlertContext';

describe('AlertNotifier', () => {
  it('renders nothing if alertContext is not provided', () => {
    const alertState = null;
    render(
      <AlertContext.Provider value={alertState}>
        <AlertNotifier />
      </AlertContext.Provider>
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('renders alert based on context data', () => {
    const alertState = {
      show: true,
      variant: 'danger',
      title: 'Test Alert',
      message: 'This is a test alert'
    };
    render(
      <AlertContext.Provider value={{ alertState, setAlertState: jest.fn() }}>
        <AlertNotifier />
      </AlertContext.Provider>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Test Alert')).toBeInTheDocument();
    expect(screen.getByText('This is a test alert')).toBeInTheDocument();
  });

  it('calls handleOnClose when close button is clicked', () => {
    const alertState = {
      show: true,
      variant: 'danger',
      title: 'Test Alert',
      message: 'This is a test alert'
    };
    const setAlertStateMock = jest.fn();
    render(
      <AlertContext.Provider value={{ alertState, setAlertState: setAlertStateMock }}>
        <AlertNotifier />
      </AlertContext.Provider>
    );
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(setAlertStateMock).toHaveBeenCalledWith(initialAlert);
  });
});
