import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



const Home = () => {
  const products = useSelector(state=>state.productInfo.product)
  const categories = [...new Set(products?.map(product => product.category))];

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary text-center fw-bold">Products</h2>

      {categories.map((category,i) => (
        <div key={i} className="mb-5">
          <h3 className="mb-3" style={{ borderBottom: "2px solid #f8f8f8", paddingBottom: "10px", color: "#212121" }}>
           Best Of {category}
          </h3>
          <div className="row d-flex" style={{ flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '1rem' }}>
          {products
  .filter((product) => product.category === category)
  .slice(0, 10)  // Show only the first 10 products
  .map((product) => (
    <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4 rounded">
      <Link to={`/products/${product.category}`} style={{textDecoration:'none'}}>
        <div className="card border-0 shadow-sm" style={{cursor:'pointer'}}>
          <img
            src={product.images[0]}
            className="card-img-top"
            alt={product.name}
            style={{ objectFit: "contain", height: "200px" }}
          />
          <div className="card-body text-center" style={{ backgroundColor: "#ffffff" }}>
            <h5 className="card-title mb-2" style={{ fontSize: "1rem", fontWeight: "bold", color: "#333" }}>
              {product.name}
            </h5>
            <p className="card-text mb-3 text-muted" style={{ fontSize: "1.1rem" }}>
              Starting from Rs.{product.price}/-
            </p>
          </div>
        </div>
      </Link>
    </div>
  ))
}

                {/* <div className="w-auto d-flex align-items-center">
            <button className="btn btn-primary" style={{ backgroundColor: "#2874f0", borderColor: "#2874f0", padding: "10px 20px" }}>
              Load More ...
            </button>
          </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
