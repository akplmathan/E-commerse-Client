import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmOrderPage = () => {
  const { state } = useLocation();
  const { orderItems, address, paymentMethod } = state || {};

  const subtotal = orderItems?.reduce((acc, item) => acc + parseInt(item.price.replace(/₹|,/g, '')) * item.quantity, 0);

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">Order Confirmation</h2>
      <div className="card p-4 mb-4">
        <h5 className="card-title">Order Summary</h5>
        {orderItems?.map((item) => (
          <div key={item.id} className="d-flex justify-content-between border-bottom py-2">
            <div>
              <h6 className="fw-bold">{item.name}</h6>
              <p className="text-muted">Quantity: {item.quantity}</p>
            </div>
            <p className="fw-bold">₹{parseInt(item.price.replace(/₹|,/g, '')) * item.quantity}</p>
          </div>
        ))}
        <div className="mt-3">
          <h5>Subtotal: <span className="fw-bold">₹{subtotal}</span></h5>
        </div>
      </div>

      <div className="card p-4 mb-4">
        <h5 className="card-title">Delivery Address</h5>
        <p>{address}</p>
      </div>

      <div className="card p-4 mb-4">
        <h5 className="card-title">Payment Method</h5>
        <p>{paymentMethod}</p>
      </div>

      <div className="text-center">
        <h3 className="fw-bold">Thank you for your order!</h3>
        <p>Your order has been placed successfully and will be processed shortly.</p>
      </div>
    </div>
  );
};

export default ConfirmOrderPage;
