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
    pr.on('paymentmethod', async(e) => {
      // create a payment intent on the server
      const { clientSecret } = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodType: 'card',
          currency:'usd',          
        })
      }).then(res => res.json());

      // confirm payment intent on the client
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: e.paymentMethod.id
      },
       {
        handleActions: false // to disbale any other security layer like 3D
       }
      )
      if(error){
        e.complete('fail');
      }
      e.complete('success');
      if(paymentIntent.status === 'requires_action'){
        stripe.confirmCardPayment(clientSecret);
      }
    })
  }, [stripe, elements]);
  return (
    <div>
      <h1>Apple Pay</h1>
      <PaymentRequestButtonElement options={{paymentRequest}} />
    </div>
  );
};

export default ApplePay;
