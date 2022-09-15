import React, { useState } from 'react';
import StripeCheckout from "react-stripe-checkout";

const StripeCardPay = () => {
  const [product, setProduct] = useState({
    name: "React from FB",
    productBy: "facebook"
  })

  const makePayment = async (token) => {
    const body ={
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }
    
    return await fetch(`http://localhost:5000/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(res => {
      console.log("RESPONSE", res);
      const { status } = res;
      console.log("STATUS", status);
    })
    .catch(err => console.log(err))
  }
  return (
    <div>
      <h1>Stripe Card Pay</h1>
      <StripeCheckout 
        stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY} 
        token={makePayment} 
        name='Buy React'        
        />
    </div>
    
  )
}

export default StripeCardPay