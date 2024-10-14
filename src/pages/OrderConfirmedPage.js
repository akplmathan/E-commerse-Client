import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmedPage = () => {
  const { state } = useLocation(); // Fetching order details passed through navigate
  const navigate = useNavigate();

  const { orderItems, address, paymentMethod, totalAmount } = state || {}; // Destructuring order details

  return (
    <div className="container mt-5 text-center">
      <div className="alert alert-success" role="alert">
        <h2 className="fw-bold text-success">Order Confirmed!</h2>
        <p>Your order has been successfully placed. Thank you for shopping with us!</p>
      </div>

      <div className="card p-4 mb-4">
        <h4 className="card-title mb-4 fw-bold">Order Summary</h4>

        <div className="mb-4">
          <h5 className="fw-bold">Payment Method:</h5>
          <p>{paymentMethod}</p>
        </div>

        <div className="mb-4">
          <h5 className="fw-bold">Shipping Address:</h5>
          <p>{address?.addressLine1}</p>
          <p>{address?.addressLine2}</p>
          <p>{address?.city}, {address?.state}, {address?.pincode}</p>
        </div>

        <div className="mb-4">
          <h5 className="fw-bold">Items Ordered:</h5>
          {orderItems && orderItems.length > 0 ? (
            orderItems.map((item, index) => (
              <div key={index} className="d-flex justify-content-between border-bottom py-2">
                <div className="d-flex align-items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="thumbnail mx-3 object-fit-contain"
                    width={60}
                    height={60}
                  />
                  <div>
                    <h6 className="fw-bold">{item.product.name}</h6>
                    <p className="text-muted">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="fw-bold">₹{parseInt(item.product.price) * item.quantity}</p>
              </div>
            ))
          ) : (
            <p>No items found in your order.</p>
          )}
        </div>

        <div className="mb-4">
          <h5 className="fw-bold">Total Amount:</h5>
          <p className="fs-4 fw-bold">₹{totalAmount}</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ConfirmedPage;
