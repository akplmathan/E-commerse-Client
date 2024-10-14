import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const YourOrders = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const user = useSelector(state => state.userInfo.user);
  const [deleteOrder,setDeleteOrder] = useState(null)
  
  // Extract orders from user data
  const allOrders = user?.orderHistory || []; // Handle case where orderHistory might be undefined

  const currentOrders = allOrders.filter(order => order.orderStatus !== 'Delivered' && order.orderStatus !== 'Cancelled' );
  const previousOrders = allOrders.filter(order => order.orderStatus === 'Delivered');
  const cancelledOrders = allOrders.filter(order => order.orderStatus === 'Cancelled');

  // Handle opening the modal and set the selected order
  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    const trackOrderModal = new window.bootstrap.Modal(
      document.getElementById('trackOrderModal')
    );
    trackOrderModal.show();
  };

  // Function to handle order cancellation
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/product/cancel/${orderId}`);
      setDeleteOrder(null)
     if(response.status==201){
      enqueueSnackbar(response.data.msg,{variant:'success'})
     }
     else{
      enqueueSnackbar(response.data.msg,{variant:'warning'})
     }
      window.location.reload(); 
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order. Please try again.');
    }
  };


  return (
    <div className="container mt-5">
        {deleteOrder &&
          <div className="container-fluid" style={{backgroundColor:'rgba(30, 28, 29, 0.59)',zIndex:10000, position:'fixed',height:'100vh',width:'100vw',top:0,left:0,display:'flex',justifyContent:'center',alignItems:'center'}}>
          <div className="card p-3">
            <div>
              <h2 className='mb-5'>Are You Sure Want To Cancel Order ?</h2>
            </div>
            <div className='d-flex justify-content-end gap-4'>
              <div className="btn btn-outline-danger px-3" onClick={()=>handleCancelOrder(deleteOrder)}>Yes</div>
              <div className="btn btn-outline-success px-3" onClick={()=>setDeleteOrder(null)}>No</div>
            </div>
          </div>
        </div>}

      <h2 className="fw-bold mb-4">Your Orders</h2>

      {/* Tabs Navigation */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'current' ? 'active' : ''}`}
            onClick={() => setActiveTab('current')}
          >
            Current Orders
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'previous' ? 'active' : ''}`}
            onClick={() => setActiveTab('previous')}
          >
            Previous Orders
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'cancelled' ? 'active' : ''}`}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled Orders
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Current Orders */}
        {activeTab === 'current' && (
          <div className="tab-pane fade show active">
            {currentOrders.length > 0 ? (
              currentOrders.map(order => (
                <div key={order._id} className="card mb-4 p-3">
                  <div className="row align-items-center">
                    
                    <div className="col-md-6">
                      <h5>{order.products?.name}</h5>
                      <p><strong>Price:</strong> ₹{order.totalAmount}</p>
                      <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                      <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                      {order.deliveryDate && <p><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>}
                      {/* <p className={`fw-bold ${order.orderStatus === 'Shipped' ? 'text-success' : 'text-warning'}`}> */}
                       {/* Sta! */}
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                      <button className="btn btn-outline-info me-2" onClick={() => handleTrackOrder(order)}>
                        Track Order
                      </button>
                      {order.orderStatus === 'Processing' && (
                        <button className="btn btn-outline-danger" onClick={()=>setDeleteOrder(order._id)}>
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Loop through all products in the order */}
                  <div className="row mt-3">
                    {order.products.map(product => (
                      <div key={product._id} className="col-md-12 mb-2">
                        <div className="d-flex align-items-center">
                          <img
                            src={product?.product?.images[0]} // Use product image
                            alt={product.name}
                            className="img-fluid me-3"
                            style={{ width: '60px' }} // Smaller image for products
                          />
                          <div>
                            <h6>{product.name}</h6>
                            <p>
                            <strong>Name:</strong> {product.product.name} |  <strong>Price:</strong> ₹{product.price} | <strong>Quantity:</strong> {product.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No current orders found.</p>
            )}
          </div>
        )}

        {/* Previous Orders */}
        {activeTab === 'previous' && (
          <div className="tab-pane fade show active">
            {previousOrders.length > 0 ? (
              previousOrders.map(order => (
                <div key={order._id} className="card mb-4 p-3">
                <div className="row align-items-center">
                  
                  <div className="col-md-6">
                    <h5>{order.products?.name}</h5>
                    <p><strong>Price:</strong> ₹{order.totalAmount}</p>
                    <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                    <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                    {order.deliveryDate && <p><strong>Delivery Date:</strong> {new Date(order.DeliveryDate).toLocaleDateString()}</p>}
                    {/* <p className={`fw-bold ${order.orderStatus === 'Shipped' ? 'text-success' : 'text-warning'}`}> */}
                     {/* Sta! */}
                  </div>
               
                </div>
                {/* Loop through all products in the order */}
                <div className="row mt-3">
                  {order.products.map(product => (
                    <div key={product._id} className="col-md-12 mb-2">
                      <div className="d-flex align-items-center">
                        <img
                          src={product?.product?.images[0]} // Use product image
                          alt={product.name}
                          className="img-fluid me-3"
                          style={{ width: '60px' }} // Smaller image for products
                        />
                        <div>
                          <h6>{product.name}</h6>
                          <p>
                          <strong>Name:</strong> {product.product.name} |  <strong>Price:</strong> ₹{product.price} | <strong>Quantity:</strong> {product.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              ))
            ) : (
              <p>No previous orders found.</p>
            )}
          </div>
        )}

         {/* Previous Orders */}
         {activeTab === 'cancelled' && (
          <div className="tab-pane fade show active">
            {cancelledOrders.length > 0 ? (
              cancelledOrders.map(order => (
                <div key={order._id} className="card mb-4 p-3">
                <div className="row align-items-center">
                  
                  <div className="col-md-6">
                    <h5>{order.products?.name}</h5>
                    <p><strong>Price:</strong> ₹{order.totalAmount}</p>
                    <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                    <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                    <p className={`fw-bold text-danger`}>
                     Status : {order.orderStatus}
                    </p>
                  </div>
                 
                </div>
                {/* Loop through all products in the order */}
                <div className="row mt-3">
                  {order.products.map(product => (
                    <div key={product._id} className="col-md-12 mb-2">
                      <div className="d-flex align-items-center">
                        <img
                          src={product?.product?.images[0]} // Use product image
                          alt={product.name}
                          className="img-fluid me-3"
                          style={{ width: '60px' }} // Smaller image for products
                        />
                        <div>
                          <h6>{product.name}</h6>
                          <p>
                          <strong>Name:</strong> {product.product.name} |  <strong>Price:</strong> ₹{product.price} | <strong>Quantity:</strong> {product.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              ))
            ) : (
              <p>No Cancelled orders found.</p>
            )}
          </div>
        )}
      </div>

      {/* Modal for Tracking Order */}
      <div className="modal fade" id="trackOrderModal" tabIndex="-1" aria-labelledby="trackOrderModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="trackOrderModalLabel">Track Your Order</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {selectedOrder ? (
          <div>
            {/* Order Summary Section */}
            <div className="mb-4">
              <h6 className="fw-bold">Order Summary</h6>
              {selectedOrder.products.map(product => (
                <div key={product._id} className="d-flex align-items-center mb-3">
                  <img
                    src={product.product.images[0]}
                    alt={product.name}
                    className="img-fluid"
                    style={{ width: '80px', height: '80px', objectFit: 'contain', marginRight: '15px' }}
                  />
                  <div>
                    <h6>{product.name}</h6>
                    <p className="mb-0">
                    <strong>Name:</strong> {product.product.name} | <strong>Price:</strong> ₹{product.price} | <strong>Quantity:</strong> {product.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Progress Bar */}
            <div className="mb-4">
              <h6 className="fw-bold">Shipping Progress</h6>
              <div className="progress">
                <div
                  className={`progress-bar ${
                    selectedOrder.orderStatus === 'Delivered'
                      ? 'bg-success'
                      : selectedOrder.orderStatus === 'Out For Delivery'
                      ? 'bg-success'
                      : selectedOrder.orderStatus === 'Shipped'
                      ? 'bg-warning'
                      : 'bg-primary'
                  }`}
                  role="progressbar"
                  style={{
                    width:
                      selectedOrder.orderStatus === 'Delivered'
                        ? '100%'
                        : selectedOrder.orderStatus === 'Out For Delivery'
                        ? '75%'
                        : selectedOrder.orderStatus === 'Shipped'
                        ? '50%' 
                        : '25%',
                  }}
                ></div>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <small>Processing</small>
                <small>Confirmed</small>
                <small>Shipped</small>
                <small>Out for Delivery</small>
                <small>Delivered by {new Date(selectedOrder.deliveryDate).toLocaleDateString()}</small>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-4">
              <h6 className="fw-bold">Shipping Address</h6>
              <p>
                {selectedOrder.shippingAddress.addressLine1}, {selectedOrder.shippingAddress.addressLine2}
                <br />
                {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} -{' '}
                {selectedOrder.shippingAddress.pincode}
              </p>
            </div>

            {/* Payment and Order Details */}
            <div className="mb-4">
              <h6 className="fw-bold">Order Details</h6>
              <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
              <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
              <p><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</p>
              <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
            </div>
          </div>
        ) : (
          <p>No order selected for tracking.</p>
        )}
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default YourOrders;
