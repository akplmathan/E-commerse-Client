import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { verifyToken } from "../redux/slice/userSlice";
import axios from "axios"; // For OTP verification requests
import { enqueueSnackbar } from "notistack";

const OrderReviewPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [address, setAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");
  const [placeOrderItems,setPlaceOrdcerItems] = useState([])
  const user = useSelector((state) => state.userInfo.user);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();


useEffect(()=>{
      setPlaceOrdcerItems(
        orderItems?.map((item,i)=>{
          return {product:item.product._id,quantity:item.quantity,price:item.product.price}
        })
      )
},[orderItems])

const subtotal = orderItems.reduce(
  (acc, item) => acc + parseInt(item.product.price) * item.quantity,
  0
);

const handlePlaceOrder = async () => {
  
  try {
 
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/product/order`, {
      products:placeOrderItems,
      totalAmount:subtotal,
      paymentMethod:paymentMethod,
      shippingAddress:user.addresses,
      userID:user._id
    });
  
    
    if(response.status==201){
      navigate("/order-confirmed", {
        state: { orderItems, address, paymentMethod,totalAmount:subtotal },
      });
    }else{
      enqueueSnackbar(response.data.msg,{variant:'warning'})
    }
  } catch (error) {
    alert("Error placing order");
  }
};

const handlePayment = async () => {
  const orderResponse = await axios.post("http://localhost:4000/product/makePayment", { amount : subtotal });

  const { amount: orderAmount, id: order_id, currency } = orderResponse.data.order;

  const options = {
    key: 'rzp_test_MWZ7f2Pizd7gl9', // Enter the Key ID generated from the Dashboard
    amount: orderAmount,
    currency: currency,
    name: orderItems?.map((item,i)=>{
      return item.product.name
    }),
    description: "Test Transaction",
    image:  orderItems?.map((item,i)=>{
      return item.product.images[0]
    }),
    order_id: order_id,
    handler: async function (response) {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

      const verificationResponse = await axios.post("http://localhost:4000/product/verify", {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        signature: razorpay_signature,
      });

      if (verificationResponse.data.success) {
        handlePlaceOrder()
        
      } else {
        alert("Payment Verification Failed!");
      }
    },
    prefill: {
      name: user.name,
      email: user.email,
      contact: "9999999999",
    },
    notes: {
      address: user.addresses,
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};

 

  useEffect(() => {
    dispatch(verifyToken(token));
  }, [token]);

  useEffect(() => {
    const savedOrderItems =
      state?.selectedProducts ||
      JSON.parse(localStorage.getItem("orderItems")) ||
      [];
    setOrderItems(savedOrderItems);
    setAddress(user?.addresses || {});
  }, [state, user]);

  useEffect(() => {
    localStorage.setItem("orderItems", JSON.stringify(orderItems));
  }, [orderItems]);

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/product/send-otp`,
        { email: user.email }
      );

      if (response.status == 201) {
        setOtp(response.data.otp);

        setOtpSent(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpVerification = async () => {
    if (otp === Number(otpInput)) {
     handlePlaceOrder()
    } else {
      setOtpError("Invalid OTP, please try again.");
    }
  };

  const handleConfirmOrder = () => {
    if (!Object.keys(address).length) {
      navigate("/address");
    } else if (!paymentMethod) {
      alert("Please select a payment method.");
    } else if (paymentMethod === "upi") {
      handlePayment()
    } else if (paymentMethod === "Cash on Delivery") {
      handleSendOtp(); // Trigger OTP when COD is selected
    }
  };


  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">Order Review</h2>

      <div className="card p-4 mb-4">
        <h5 className="card-title">Order Details</h5>
        {orderItems.length > 0 ? (
          orderItems.map((item) => (
            <div
              key={item._id}
              className="d-flex justify-content-between border-bottom py-2"
            >
              <div className="d-flex">
                <img
                  src={item.product.images[0]}
                  alt=""
                  className="thumbnail mx-3 object-fit-contain"
                  width={60}
                  height={60}
                />
                <div>
                  <h6 className="fw-bold">{item.product.name}</h6>
                  <p className="text-muted">Quantity: {item.quantity}</p>
                </div>
              </div>
              <p className="fw-bold">
                ₹{parseInt(item.product.price) * item.quantity}
              </p>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        <div className="mt-3">
          <h5>
            Subtotal: <span className="fw-bold">₹{subtotal}</span>
          </h5>
        </div>
      </div>

      <div className="card p-4 mb-4">
        <h5 className="card-title">Payment Method</h5>
        <select
          className="form-select mb-3"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select Payment Method</option>
          <option value="upi">UPI</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
      </div>

      <div className="card p-4 mb-4">
        <h5 className="card-title">Delivery Address</h5>
        <div className="card">
          <div className="card-body text-center">
            {address ? (
              <>
                <p>{address.addressLine1}</p>
                <p>{address.addressLine2}</p>
                <p>
                  <strong className="fw-bold">City:</strong> {address.city}
                </p>
                <p>
                  <strong className="fw-bold">State:</strong> {address.state}
                </p>
                <p>
                  <strong className="fw-bold">Landmark:</strong>{" "}
                  {address.landmark}
                </p>
                <p>
                  <strong className="fw-bold">Pincode:</strong>{" "}
                  {address.pincode}
                </p>
              </>
            ) : (
              <p>No address available.</p>
            )}
          </div>
          <div
            className="btn btn-secondary mb-3 w-50 mx-auto"
            onClick={() =>
              navigate("/address", { state: { from: "order-review" } })
            }
          >
            <FaEdit /> Change Delivery Address
          </div>
        </div>

        <button
          className="btn btn-warning btn-lg w-100"
          onClick={handleConfirmOrder}
        >
          Confirm Order
        </button>
      </div>

      {/* OTP Modal */}
      {otpSent && (
        <div className="modal show d-block " tabIndex="-1" style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',backgroundColor:'rgba(0, 0, 0, 0.52)'}}>
          <div className="modal-dialog" style={{}}>
            <div className="modal-content">
              <div className="modal-header" >
               <p>Otp Sent to your Email {user.email}</p>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                />
                {otpError && <p className="text-danger mt-2">{otpError}</p>}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={handleOtpVerification}
                >
                  Verify OTP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderReviewPage;
