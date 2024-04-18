import React from 'react';
import './App.scss';
import Library from './components/Library';
import AlertState from './context/Alerts/AlertState';
import AlertNotifier from './components/Alert';
import ErrorBoundary from './components/ErrorBoundry';

function App() {
  return (
    <div className='container p-2'>
      <div className="d-flex w-100 align-items-center justify-content-center">
        <span className='fs-2 fw-semibold text-primary'>Online Library</span>
      </div>
      <ErrorBoundary>
        <AlertState>
          <div className='position-fixed start-50 translate-middle' style={{top: '5rem', zIndex: 100}}>
            <AlertNotifier />
          </div>
          <Library />
        </AlertState>
      </ErrorBoundary>
    </div>
  );
}

export default App;
