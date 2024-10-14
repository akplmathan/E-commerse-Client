import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Our Policies</h1>

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">About Us</h5>
        </div>
        <div className="card-body">
          <p>
            Welcome to [Your Company Name], where we are dedicated to providing exceptional services and products to our customers. Founded in [Year], we strive to create value for our clients through innovation, quality, and customer satisfaction.
          </p>
          <p>
            At [Your Company Name], we believe in the power of collaboration and community. Our team of experts is passionate about what they do and committed to delivering the best possible experience for our customers.
          </p>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Contact Us</h5>
        </div>
        <div className="card-body">
          <p>Email: support@yourcompany.com</p>
          <p>Phone: +1 (234) 567-8901</p>
          <p>Address: 123 Your Street, City, State, ZIP</p>
          <p>You can also fill out our <a href="#">Contact Form</a> for any inquiries.</p>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Privacy Policy</h5>
        </div>
        <div className="card-body">
          <p>Last updated: [Date]</p>
          <p>
            [Your Company Name] is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website or use our services.
          </p>
          <ul>
            <li><strong>Information We Collect:</strong> Personal information such as your name, email address, and payment information.</li>
            <li><strong>How We Use Your Information:</strong> To process transactions, improve our services, and communicate with you.</li>
            <li><strong>Data Security:</strong> We take reasonable measures to protect your information from unauthorized access.</li>
          </ul>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Terms & Conditions</h5>
        </div>
        <div className="card-body">
          <p>Last updated: [Date]</p>
          <p>These Terms & Conditions govern your use of our website and services. By accessing or using our site, you agree to comply with these terms.</p>
          <ul>
            <li><strong>Eligibility:</strong> You must be at least 18 years old to use our services.</li>
            <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account information.</li>
            <li><strong>Intellectual Property:</strong> All content on this site is protected by copyright laws.</li>
          </ul>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Cancellation/Refund Policies</h5>
        </div>
        <div className="card-body">
          <p>Last updated: [Date]</p>
          <p>If you are not satisfied with your purchase, please review our cancellation and refund policies:</p>
          <ul>
            <li><strong>Cancellation:</strong> You may cancel your order within [X] hours for a full refund.</li>
            <li><strong>Refunds:</strong> Contact us at support@yourcompany.com within [X] days for a refund request.</li>
            <li><strong>Exclusions:</strong> Certain items may be non-refundable.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
