import React from 'react';

const ContactUs = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Contact Us</h1>
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Get in Touch</h5>
        </div>
        <div className="card-body">
          <p>If you have any questions, feel free to reach out to us through the following channels:</p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:support@yourcompany.com">support@yourcompany.com</a></li>
            <li><strong>Phone:</strong> <a href="tel:+12345678901">+1 (234) 567-8901</a></li>
            <li><strong>Address:</strong> 123 Your Street, City, State, ZIP</li>
            <li>
              <strong>Social Media:</strong>
              <ul>
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              </ul>
            </li>
          </ul>
          <p>You can also fill out our <a href="#">Contact Form</a> for any inquiries.</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
