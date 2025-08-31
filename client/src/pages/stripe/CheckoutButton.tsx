import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Public kay Stripe (publishable key, not secret!)
const stripePromise = loadStripe("pk_test_***************");

type CheckoutButtonProps = {
  amount: number; // in cents
  currency: string;
};

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({ amount, currency }) => {
  const handleCheckout = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/api/stripe/checkout", {
        amount,
        currency,
      });

      const stripe = await stripePromise;
      if (stripe && data.url) {
        window.location.href = data.url;
      } else {
        alert("Error: Failed to create payment session");
      }
    } catch (err) {
      console.error("Error creating checkout:", err);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Оплатить {amount / 100} {currency.toUpperCase()}
    </button>
  );
};

// Workflow
// User clicks a button.
// Front sends a POST request to NestJS / stripe / checkout.
// NestJS creates a Checkout Session and returns a url.
// React makes window.location.href = session.url.
// User lands on the Stripe checkout page.

//how to use
//<CheckoutButton amount={2000} currency="usd" />