import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const CartPage = ({ cart }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(cart);
  const [selectedItems, setSelectedItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const user = useSelector(state=>state.userInfo.user)
  const {enqueueSnackbar} = useSnackbar()


    // Remove from cart function
   const removeFromCart = async (userId, productId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/product/remove-from-cart`,
        {
          userId,
          productId,
        }
      );
      console.log(response);
      
      if (response.status == 201) {
        fetchCart();
        enqueueSnackbar('Product Removed From cart',{variant:'success'})
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  //cart details
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/cart/${user._id}`);
      setCartItems(res.data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  useEffect(() => {
    // Calculate the total price whenever selected items or quantities change
    const total = cartItems
      .filter((item) => selectedItems[item._id])
      .reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setTotalPrice(total);
  }, [selectedItems, cartItems]);

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity less than 1

    // Update the quantity in the cartItems state
    const updatedCartItems = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);

 
  };

  const handleDecreaseQuantity = (id) => {
    const item = cartItems.find((item) => item._id === id);
    if (item.quantity > 1) {
      handleQuantityChange(id, item.quantity - 1);
    }
  };

  const handleIncreaseQuantity = (id,stock) => {
    const item = cartItems.find((item) => item._id === id);
    
    
    handleQuantityChange(id, stock>=item.quantity? item.quantity + 1:item.quantity);
  };

  const handlePlaceOrder = () => {
    const selectedProducts = cartItems.filter((item) => selectedItems[item._id]);
    if (selectedProducts.length > 0) {
      navigate('/order-review', { state: { selectedProducts } });
    } else {
      alert('Please select at least one item to proceed.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">Your Cart ({cartItems?.length})</h2>
      <div className="row">
        <div className="col-md-8">
          {cartItems.map((item) => (
            <div key={item._id} className="card mb-3 p-3">
                {item.product.stock > 0 &&  <div className="form-check mt-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`item-${item._id}`}
                        checked={selectedItems[item._id] || false}
                        onChange={() => handleCheckboxChange(item._id)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`item-${item._id}`}
                      >
                        Select Item
                      </label>
                    </div>}
              <div className="row g-0 align-items-center">
                <div className="col-md-3">
                  <img
                    src={item.product.images[0]}
                    className="img-fluid rounded-start"
                    alt={item.product.name}
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h5 className="card-title">{item.product.name}</h5>
                    <p className="card-text text-muted">
                      Price: ₹{item.product.price}
                    </p>

                     <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleDecreaseQuantity(item._id)}
                      >
                        -
                      </button>
                      <input
                      disabled
                        type="number"
                        className="form-control text-center mx-2"
                        value={item.quantity }
                        
                        style={{ width: '60px' }}
                        onChange={(e) =>
                          handleQuantityChange(
                            item._id,
                            parseInt(e.target.value)
                          )
                        }
                      />
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleIncreaseQuantity(item._id,item.product.stock)}
                      >
                        +
                      </button>
                    </div>

                {
                      item.product.stock == 0 ? <p className='text-danger fw-bold mt-3'>No Stack Available </p>: item.product.stock>10? <p className='text-success fw-bold'>in Stock</p> :<p className='text-warning fw-bold'>Only Few item Left</p>
                    }
                    <button className="btn btn-secondary mt-2" onClick={()=>removeFromCart(user?._id,item?.product._id)}>
                      <FaCartPlus className="me-2" />
                      Remove From Cart
                    </button>
                  </div>
                </div>
                <div className="col-md-3 text-end">
                  <p className="fw-bold">
                    ₹{item.product.price * item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h5 className="card-title">Order Summary</h5>
            <p>
              Selected items:{' '}
              {Object.values(selectedItems).filter(Boolean).length}
            </p>
            <p className="fw-bold">Total Price: ₹{totalPrice}</p> 
            <button
              className="btn btn-warning btn-lg w-100"
              onClick={handlePlaceOrder}
            >
              Proceed to Checkout ({totalPrice})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
