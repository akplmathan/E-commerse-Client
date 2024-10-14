import React from 'react';

const Footer1 = () => {
  return (
    <footer style={{ backgroundColor: '#232F3E', color: 'white', paddingTop: '30px', fontFamily: 'Arial, sans-serif' }}>
      {/* Back to Top Button */}
      <div style={{ textAlign: 'center', padding: '15px 0', backgroundColor: '#37475A' }}>
        <a
          href="#"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '16px',
            letterSpacing: '0.5px',
            fontWeight: 'bold',
          }}
          onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
          onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
        >
          Back to top
        </a>
      </div>

      {/* Footer Links Section */}
      <div className="container">
        <div className="row text-start">
          {/* Column 1 */}
          <div className="col-md-3 col-sm-6">
            <h5 className="fw-bold mt-4" style={{ fontSize: '18px' }}>Get to Know Us</h5>
            <ul className="list-unstyled">
              <FooterLink text="About Us" />
              <FooterLink text="Careers" />
              <FooterLink text="Press Releases" />
              <FooterLink text="Amazon Cares" />
            </ul>
          </div>

          {/* Column 2 */}
          <div className="col-md-3 col-sm-6">
            <h5 className="fw-bold mt-4" style={{ fontSize: '18px' }}>Connect with Us</h5>
            <ul className="list-unstyled">
              <FooterLink text="Facebook" />
              <FooterLink text="Twitter" />
              <FooterLink text="Instagram" />
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-md-3 col-sm-6">
            <h5 className="fw-bold mt-4" style={{ fontSize: '18px' }}>Make Money with Us</h5>
            <ul className="list-unstyled">
              <FooterLink text="Sell on Amazon" />
              <FooterLink text="Become an Affiliate" />
              <FooterLink text="Advertise Your Products" />
              <FooterLink text="Amazon Pay" />
            </ul>
          </div>

          {/* Column 4 */}
          <div className="col-md-3 col-sm-6">
            <h5 className="fw-bold mt-4" style={{ fontSize: '18px' }}>Let Us Help You</h5>
            <ul className="list-unstyled">
              <FooterLink text="Your Account" />
              <FooterLink text="Returns Centre" />
              <FooterLink text="100% Purchase Protection" />
              <FooterLink text="Help" />
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div style={{ backgroundColor: '#131A22', textAlign: 'center', padding: '20px 0', marginTop: '30px' }}>
        <small>&copy; 2024, YourCompanyName.com, Inc. or its affiliates</small>
      </div>
    </footer>
  );
};

// Reusable Footer Link Component
const FooterLink = ({ text }) => (
  <li>
    <a
      href="#"
      style={{
        color: 'white',
        textDecoration: 'none',
        fontSize: '14px',
        lineHeight: '1.8',
        letterSpacing: '0.5px',
        display: 'block',
      }}
      onMouseOver={(e) => (e.target.style.color = '#ff9900')}
      onMouseOut={(e) => (e.target.style.color = 'white')}
    >
      {text}
    </a>
  </li>
);

export default Footer1;
