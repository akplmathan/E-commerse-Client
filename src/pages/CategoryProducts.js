import React, { useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams,Navigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import {LineWave} from 'react-loader-spinner'
import { RotatingLines } from "react-loader-spinner";

const CategoryProducts = ({ cart, fetchCart }) => {
  const { category } = useParams();
  const [priceRange, setPriceRange] = useState(500);
  const user = useSelector((state) => state.userInfo.user);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const [loading, setLoading] = useState(false);
  const [maxPrice, setMaxPrice] = useState(0);
  const product = useSelector((state) => state.productInfo.product);
  const { enqueueSnackbar } = useSnackbar();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the filter modal
  const [filteredProducts, setFilterProducts] = useState([]);
  const navigate = useNavigate();

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
      (item) => item.product._id.toString() === productId.toString()
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

  const brands = [
    ...new Set(
      product
        ?.filter((pro) => pro.category === category)
        ?.map((pro) => pro.brand)
    ),
  ];

  useEffect(() => {
    setFilterProducts(
      product?.filter((product) => product.category === category)
    );
    if (filteredProducts?.length > 0) {
      const highestPrice = Math.max(
        ...filteredProducts.map((product) => product.price)
      );
      setMaxPrice(highestPrice);
    }
  }, [category, product]);

  const applyFilters = () => {
    setLoading(true);
    setFilterProducts(
      product
        ?.filter(
          (product) =>
            product.category === category &&
            product.price >= priceRange &&
            (selectedBrand === "" || product.brand === selectedBrand)
        )
        ?.sort((a, b) => {
          return sortOrder === "lowToHigh"
            ? a.price - b.price
            : b.price - a.price;
        })
    );

    setIsModalOpen(false);
    setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-primary text-center">{category} Products</h4>
        {/* Mobile Filter Button */}
        <button
          className="btn btn-outline-primary d-md-none"
          onClick={() => setIsModalOpen(true)}
        >
          Filter
        </button>
      </div>

      <div className="row">
        {/* Sidebar for larger screens */}
        <div className="col-md-3 d-none d-md-block">
          <div className="p-3 border bg-light">
            <h5>Filters</h5>
            {/* Price Range */}
            <label className="form-label">Price: Up to Rs.{priceRange}</label>
            <input
              type="range"
              className="form-range"
              min={0}
              max={maxPrice}
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            />

            {/* Brand Filter */}
            <h6 className="mt-4">Brand</h6>
            {brands.map((brand) => (
              <div key={brand} className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="brand"
                  value={brand}
                  checked={selectedBrand === brand}
                  onChange={() => setSelectedBrand(brand)}
                />
                <label className="form-check-label">{brand}</label>
              </div>
            ))}
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="brand"
                value=""
                checked={selectedBrand === ""}
                onChange={() => setSelectedBrand("")}
              />
              <label className="form-check-label">All Brands</label>
            </div>

            {/* Sort Options */}
            <h6 className="mt-4">Sort By</h6>
            <select
              className="form-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>

            <button
              className="btn btn-primary mt-4 w-100"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Product Listings */}
        <div className="col-md-9">
          {loading ? (
            <div className="d-flex justify-content-center">
              <RotatingLines strokeColor="grey" />
            </div>
          ) : (
            <div className="row">
              {filteredProducts?.map((product) => (
                <div key={product.id} className="col-lg-4 col-md-6 mb-4">
                  <div className="card h-100">
                    <img
                      onClick={() => navigate(`product-view/${product._id}`)}
                      src={product.images[0]}
                      className="card-img-top"
                      alt={product.name}
                      style={{ objectFit: "contain", height: "200px" }}
                    />
                    <div className="card-body text-center">
                      <h5
                        onClick={() => navigate(`product-view/${product._id}`)}
                        className="card-title"
                      >
                        {product.name}
                      </h5>
                      <p
                        onClick={() => navigate(`product-view/${product._id}`)}
                        className="card-text"
                      >
                        Price: Rs.{product.price}
                      </p>
                      <p
                        onClick={() => navigate(`product-view/${product._id}`)}
                        className="card-text"
                      >
                        Brand: {product.brand}
                      </p>
                      <p
                        onClick={() => navigate(`product-view/${product._id}`)}
                        className="card-text"
                      >
                        {product.description}
                      </p>
                      {checkIfProductInCart(cart, product._id) ? (
                        <button
                          className="btn btn-secondary"
                          onClick={() => removeFromCart(user._id, product._id)}
                        >
                          Remove From Cart
                        </button>
                      ) : (
                        <button
                          className="btn btn-warning"
                          onClick={() => user? addToCart(user._id, product._id): navigate('/login')}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <div
        className={`modal fade ${isModalOpen ? "show d-block" : ""}`}
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Filters</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsModalOpen(false)}
              ></button>
            </div>
            <div className="modal-body">
              {/* Price Range */}
              <label className="form-label">Price: Up to Rs.{priceRange}</label>
              <input
                type="range"
                className="form-range"
                min="0"
                max={maxPrice}
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              />

              {/* Brand Filter */}
              <h6 className="mt-4">Brand</h6>
              {brands.map((brand) => (
                <div key={brand} className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="brand"
                    value={brand}
                    checked={selectedBrand === brand}
                    onChange={() => setSelectedBrand(brand)}
                  />
                  <label className="form-check-label">{brand}</label>
                </div>
              ))}
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="brand"
                  value=""
                  checked={selectedBrand === ""}
                  onChange={() => setSelectedBrand("")}
                />
                <label className="form-check-label">All Brands</label>
              </div>

              {/* Sort Options */}
              <h6 className="mt-4">Sort By</h6>
              <select
                className="form-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
