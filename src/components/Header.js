import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/slice/userSlice";

function Header({ cart, products,handleResultClick,setShowSearchResults,setSearchQuery,searchQuery,showSearchResults }) {
  const user = useSelector((state) => state.userInfo.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSearch,setOpenSearch] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false);
 
  
  const [selectedIndex, setSelectedIndex] = useState(-1); // For keyboard navigation

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(removeUser());
    navigate('/');
    setShowLogoutModal(false);
  };

  const category = products?.map((item)=> item.category);
  const categories = [...new Set(category)]


  const headerStyles = {
    backgroundColor: "#131921",
    color: "white",
    padding: "10px 0",
    boxShadow: "0 4px 2px -2px gray",
    position: "relative",
  };

  const logoStyles = {
    textDecoration: "none",
    color: "white",
  };

  const cartIconStyles = {
    position: "relative",
    textDecoration: "none",
    color: "white",
  };

  const cartCountStyles = {
    position: "absolute",
    top: "-8px",
    right: "0",
    padding: "2px 6px",
    fontSize: "12px",
    borderRadius: "50%",
    backgroundColor: "#ffc107",
    color: "#131921",
  };

  const linkStyles = {
    textDecoration: "none",
    color: "white",
  };

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);

    setSelectedIndex(-1); // Reset selection on input change
    setShowSearchResults(e.target.value !== "");
  };

  const filteredCategories = categories?.filter(category =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const results = [
    ...filteredCategories, 
    ...(Array.isArray(filteredProducts) ? filteredProducts : [])
  ];

 
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleResultClick(searchQuery)
      setShowSearchResults(false);
    } else if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  return (
    <header style={headerStyles}>
      <div className="container-fluid px-3 d-flex align-items-center justify-content-between p-0">
        {/* Logo */}
        <div>
          <a href="/" style={logoStyles}>
            <img src="https://via.placeholder.com/100x40?text=Logo" alt="Logo" />
          </a>
        </div>

        {/* Search Bar */}
        <div className="input-group w-50 position-relative postion-md-none" style={{ zIndex: 1000}}>
          <input
            type="text"
            className={`form-control p-2  ${openSearch? "d-block" : "d-none"} d-md-block`}
            placeholder="Search for products, brands and more..."
            value={searchQuery}
            onChange={handleSearchInput}
            onFocus={() => setShowSearchResults(true)}
            onKeyPress={(e)=>handleKeyPress(e)}
          
          />
          <button className={`btn btn-warning ${openSearch? "d-block" : "d-none"} d-md-block `} type="button" onClick={() => {
            handleResultClick(searchQuery)
            setShowSearchResults(false);
          }}>
            <FaSearch size={20} color="white" />
          </button>
        </div>

        {/* User Options */}
        <div className="d-flex align-items-center">
        <button className={`btn btn-warning d-block d-md-none ${openSearch ? "d-none" : ""}`} type="button" onClick={() => {
            setOpenSearch(true)
            setShowSearchResults(true)
          }}>
            <FaSearch size={20} color="white" />
          </button>
          {user ? (
            <Link to={"/account"}>
              <a className="btn btn-link" style={linkStyles}>
                <FaUser size={20} />
                {user.name}
              </a>
            </Link>
          ) : (
            <Link to={"/login"}>
              <a className="btn btn-link" style={linkStyles}>
                <FaUser size={20} />
                Login
              </a>
            </Link>
          )}
          {user && (
            <a onClick={() => setShowLogoutModal(true)} className="btn btn-link" style={linkStyles}>
              <LuLogOut size={20} />
              Logout
            </a>
          )}
          <Link to={"/cart"}>
            <div style={cartIconStyles}>
              <a href="#" className="btn btn-link" style={linkStyles}>
                <FaShoppingCart size={20} />
              </a>
              <span style={cartCountStyles}>{cart?.length}</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Search Results */}
      {showSearchResults && searchQuery && (
        <div style={{
          position: "absolute",
          width: "50%",
          maxHeight: "300px",
          overflowY: "auto",
          backgroundColor: "white",
          border: "1px solid #ccc",
          zIndex: 1000,
          marginLeft: "25%",
          marginTop: "5px",
          borderRadius: "4px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}>
          {results.length > 0 ? (
            results.map((item, index) => (
              <div 
                key={index} 
                style={{
                  padding: "10px",
                  color:'black',
                  cursor: "pointer",
                  backgroundColor: selectedIndex === index ? "#f0f0f0" : "white",
                }}
                onClick={() =>
                   handleResultClick(item.name || item)}
              >
                {item.name || item} {/* Show name for products or categories */}
              </div>
            ))
          ) : (
            <div style={{ padding: "10px", color:'black',textAlign: "center" }}>No results found.</div>
          )}
        </div>
      )}

      {/* Dark Overlay */}
      {showSearchResults && <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
      }}></div>}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white py-0">
                <h5 className="modal-title">Confirm Logout</h5>
                <button type="button" className="ms-auto btn fs-3 fw-bold text-light" onClick={() => setShowLogoutModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p className="text-dark fw-bold">Are you sure you want to log out?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowLogoutModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showLogoutModal && <div className="modal-backdrop fade show"></div>}
    </header>
  );
}

export default Header;
