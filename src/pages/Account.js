import React from 'react';
import { FaClipboardList, FaUserEdit, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AccountPage = () => {
  return (
    <div className="container my-5">
      <h2 className="mb-4">Your Account</h2>
      
      {/* Main Sections */}
      <div className="row">
        
        {/* Your Orders Section */}
        <Link to={'/orders'} style={{textDecoration:'none'}}>
        <div className="col-md-4 mb-4 w-auto">
          <div className="border p-4 text-center bg-light shadow-sm">
            <FaClipboardList size={40} className="text-primary mb-3" />
            <h4 className='text-dark'>Your Orders</h4>
             <p className='text-dark'>Track, return, or buy things again</p>
          </div>
        </div>
        </Link>
      

        {/* Change Details Section */}
        <Link to={'/change-details'} style={{textDecoration:'none'}}>
        <div className="col-md-4 mb-4 w-auto">
          <div className="border p-4 text-center bg-light shadow-sm">
            <FaUserEdit size={40} className="text-primary mb-3" />
            <h4 className='text-dark'>Login & security</h4>
             <p className='text-dark'>Edit login, name, and mobile number</p>
          </div>
        </div>
        </Link>

        {/* Your Addresses Section */}
        <Link to={'/address'} style={{textDecoration:'none'}}>
        <div className="col-md-4 mb-4 w-auto">
          <div className="border p-4 text-center bg-light shadow-sm">
            <FaHome size={40} className="text-primary mb-3" />
            <h4 className='text-dark'>Your Addresses</h4>
             <p className='text-dark'>Edit addresses for orders and gifts</p>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default AccountPage;
