import React, { useState } from "react";
import {
  FaSearch,
  FaBell,
  FaShoppingCart,
  FaUser,
  FaBars,
} from "react-icons/fa"; // Importing React Icons

function Header({products}) {
  // State to manage sidebar visibility
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  
  const category = products?.map((item)=> item.category);
  const categories = [...new Set(category)]

  // Array of navbar links (dynamically generated)
  const navLinks = categories.map((item,i)=>{
    return {
      name:item,url:`/products/${item}`
    }
  })
  // Sidebar items
  const sidebarItems = [
    { name: "Hello, sign in", url: "/login" },
    { name: "Trending", url: "/trending" },
    { name: "Best Sellers", url: "/best-sellers" },
    { name: "New Releases", url: "/new-releases" },
    { name: "Movers and Shakers", url: "/movers-shakers" },
    { name: "Digital Content and Devices", url: "/digital-content" },
    { name: "Amazon miniTV- FREE entertainment", url: "/minitv" },
    { name: "Echo & Alexa", url: "/echo-alexa" },
    { name: "Fire TV", url: "/fire-tv" },
    { name: "Kindle E-Readers & eBooks", url: "/kindle" },
    { name: "Audible Audiobooks", url: "/audible" },
    { name: "Amazon Prime Video", url: "/prime-video" },
    { name: "Amazon Prime Music", url: "/prime-music" },
    { name: "Shop by Category", url: "/shop-by-category" },

  ];

  return (
    <header
      style={{
        backgroundColor: "#131921",
        color: "white",
        padding: "10px 0",
        boxShadow: "0 4px 2px -2px gray",
        position: "relative",
      }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#232f3e', padding: '10px 0' }}>
        <div className="container-fluid d-flex" style={{ overflowX: 'scroll', width: '100vw',scrollbarWidth:'none'
         }}>
          {/* Sidebar Toggle Button */}
       

          {/* Navbar Links */}
          <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
          <div 
            onClick={toggleSidebar}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              marginRight: '15px',
            }}
            className="d-flex align-items-center gap-2 ms-3"
          >
            <FaBars />  All
          </div>
            {navLinks.map((link, index) => (
              <div key={index} className="w-auto">
                <a
                  href={link.url}
                  style={{
                    color: 'white',
                    width:'auto',
                    textDecoration: 'none',
                    padding: '10px 0px',
                    margin:'15px',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    fontFamily: 'Arial, sans-serif',
                    letterSpacing: '0.5px',
                  }}
                >
                  {link.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: sidebarVisible ? 0 : "-350px", // Slide in or out
          width: "350px",
          height: "100%",
          backgroundColor: "#232f3e",
          color: "white",
          zIndex: 999,
          padding: "20px",
          overflowY: "auto",
          scrollbarWidth:'thin',
          boxShadow: "2px 0 5px rgba(0,0,0,0.5)",
          transition: "left 0.3s ease", // Smooth transition effect
        }}
      >
        <button
          onClick={toggleSidebar}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          &times;
        </button>
        <ul style={{ listStyle: "none", padding: "0" }}>
          {sidebarItems.map((item, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <a
                href={item.url}
                style={{ color: "white", textDecoration: "none" }}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar Overlay */}
      {sidebarVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 998,
          }}
          onClick={toggleSidebar}
        />
      )}
    </header>
  );
}

export default Header;
