import React from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import './App.css';
import ApplePay from './components/ApplePay';

function App() {
  const publishableKey = loadStripe('pk_test_51LhsKwIJGlfLViwIdKRuWJZFrk3xq1FudOEV8ONVJYENZZhasMfWl4eP5lcDVv4MFNN8DmlGqrXgFyTz0Wdra76o00BnzTZAfN');

  return (
    <div className="App">
      <Elements stripe={publishableKey}>
        <ApplePay />
      </Elements>
    </div>
  );
}

export default App;
