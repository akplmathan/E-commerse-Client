import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RelatedProducts from "./RelatedProducts";
import { FaCartPlus, FaCheckCircle, FaTruck } from "react-icons/fa";
import axios from "axios";
import { useSnackbar } from "notistack";

const ProductView = ({cart,fetchCart}) => {
  const { id } = useParams();
  const user = useSelector((state) => state.userInfo.user);
  const navigate = useNavigate(); // To handle related product navigation
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const productInfo = useSelector((state) => state.productInfo.product);
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    setProduct(productInfo?.find((item) => item._id === id));
  }, [id, productInfo]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  const addToCart = async (userId, productId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/product/add-to-cart`,
        {
          userId,
          productId,
          quantity: 1,
        }
      );
      if (response.status === 201) {
        fetchCart();
        enqueueSnackbar("Product Added to Cart", { variant: "success" });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const checkIfProductInCart = (cart, productId) => {
    return cart?.some(
      (item) => item.product?._id.toString() === productId.toString()
    );
  };

  const removeFromCart = async (userId, productId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/product/remove-from-cart`,
        {
          userId,
          productId,
        }
      );
      if (response.status === 201) {
        fetchCart();
        enqueueSnackbar("Product Removed From Cart", { variant: "success" });
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const handleRelatedProductClick = (productId) => {
    setLoading(true);
    navigate(`/product/${productId}`);
    setProduct(productInfo.find((item) => item._id === productId)); // Smooth update
  };

  if (loading) return <div className="text-center my-5">Loading...</div>;

  return (
    <div className="container my-5">
      {/* Product Details Section */}
      <div className="row align-items-center">
        {/* Product Image */}
        <div className="col-md-6">
          <div
            id="productCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {product?.images &&
                product?.images.map((image, index) => (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    key={index}
                  >
                    <img
                      src={image}
                      className="d-block w-100"
                      alt={product?.name}
                      style={{ maxHeight: "500px", objectFit: "contain" }}
                    />
                  </div>
                ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#productCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#productCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="col-md-6">
          <h1 className="fw-bold mb-3">{product?.name}</h1>
          <h3 className="text-success fw-bold mb-2">Rs. {product?.price}   {product?.orgPrice && <span style={{color:'red',paddingLeft:'10px',fontSize:'20px',textDecoration:'line-through'}}> Rs.{product?.orgPrice}</span>}</h3>
          <div className="badge bg-danger my-2">{ product?.orgPrice &&  (((product?.orgPrice-product?.price)/product?.price)*100).toFixed(0)} %Offer</div>
          <p className="mb-3">{product?.description}</p>
          <ul className="list-unstyled">
            <li>
              <strong>Brand: </strong>
              {product?.brand}
            </li>
            <li>
              <strong>Category: </strong>
              {product?.category}
            </li>
            <li>
              <strong>Stock: </strong>
              <span
                className={product?.stock > 0 ? "text-success" : "text-danger"}
              >
                {product?.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </li>
          </ul>
          {checkIfProductInCart(cart, product?._id) ? (
            <button
              className="btn btn-secondary"
              onClick={() => removeFromCart(user._id, product?._id)}
            >
            <FaCartPlus/>  Remove From Cart
            </button>
          ) : (
            <button
              className="btn btn-warning"
              onClick={() => user? addToCart(user._id, product?._id): navigate('/login')}
            >
             <FaCartPlus/> Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* Shipping Information Section */}
      <div className="row mt-5 text-center">
        <div className="col-md-4 mb-3">
          <div className="border bg-light p-4 h-100">
            <FaCheckCircle className="text-primary" size={32} />
            <h5 className="fw-bold mt-3">30-Day Return Policy</h5>
            <p>Easy returns and exchanges within 30 days of purchase.</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="border bg-light p-4 h-100">
            <FaTruck className="text-warning" size={32} />
            <h5 className="fw-bold mt-3">Fast Shipping</h5>
            <p>Get your products delivered within 3-5 business days.</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="border bg-light p-4 h-100">
            <FaCheckCircle className="text-success" size={32} />
            <h5 className="fw-bold mt-3">Quality Guaranteed</h5>
            <p>All products are quality checked before delivery.</p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <hr className="my-5" />
      <h3 className="fw-bold mb-4">Related Products</h3>
      <RelatedProducts
        category={product?.category}
        onProductClick={handleRelatedProductClick}
      />
    </div>
  );
};

export default ProductView;
