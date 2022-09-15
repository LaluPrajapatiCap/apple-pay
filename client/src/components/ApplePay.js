import React, { useEffect, useState } from "react";
import {
  PaymentRequestButtonElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const ApplePay = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);
  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }
    const pr = stripe.paymentRequest({
      currency: "usd",
      country: "US",
      requestPayerEmail: true,
      requestPayerName: true,
      total: {
        label: "Demo Payment",
        amount: 1999,
      },
    });
    pr.canMakePayment().then((result) => {
      if (result) {
        // show pay button on page
        setPaymentRequest(pr);
      }
    });
  }, [stripe, elements]);
  return (
    <div>
      <h1>Apple Pay</h1>
      {paymentRequest && <PaymentRequestButtonElement options={{paymentRequest}} />}
    </div>
  );
};

export default ApplePay;
