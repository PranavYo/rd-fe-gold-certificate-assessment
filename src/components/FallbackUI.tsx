import React from 'react'

export default function FallbackUI() {
  return (
    <div className='d-flex w-100 align-items-center justify-content-center' data-testid="fallback-ui">
      <span className='fs-2 fw-semibold text-primary'>You ran into an error. Please resolve and comback</span>
    </div>
  );
}
