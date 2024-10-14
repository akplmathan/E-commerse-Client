import React, { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RelatedProducts = ({ category }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  const product = useSelector((state) => state.productInfo.product);

  useEffect(() => {
    setRelatedProducts(product.filter((item) => item.category == category));
  }, [category]);

  return (
    <div
      style={{
        display: "flex",
        overflowX: "scroll",
        gap: "20px",
        padding: "10px",
      }}
    >
      {relatedProducts?.map((product) => (
        <div className="text-center"
        onClick={()=>window.location.reload()}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            width: "200px",
            padding: "10px",
          }}
        >
          <Link
            to={`/products/${category}/product-view/${product._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              style={{ width: "100%", height: "150px", objectFit: "contain" }}
            />
            <h4 style={{ fontWeight: "bold", margin: "10px 0" }}>
              {product.name}
            </h4>
            <p style={{ color: "green" }}>Rs.{product.price}</p>
          </Link>
         <p>{
product.brand
}</p>
        </div>
      ))}
    </div>
  );
};

export default RelatedProducts;
