import React from 'react';

const TermsConditions = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Terms and Conditions</h1>
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Introduction</h5>
        </div>
        <div className="card-body">
          <p>
            Welcome to [Your Company Name]. These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to comply with these Terms. If you do not agree, please do not use our services.
          </p>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h5 className="mb-0">Use of Services</h5>
        </div>
        <div className="card-body">
          <ul>
            <li>You must be at least 18 years old to use our services.</li>
            <li>You agree to provide accurate and complete information when creating an account.</li>
            <li>You are responsible for maintaining the confidentiality of your account and password.</li>
          </ul>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h5 className="mb-0">Intellectual Property</h5>
        </div>
        <div className="card-body">
          <p>
            All content, trademarks, and other intellectual property rights on our website are owned by [Your Company Name] or our licensors. You may not reproduce, distribute, or create derivative works without our express written consent.
          </p>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h5 className="mb-0">Limitation of Liability</h5>
        </div>
        <div className="card-body">
          <p>
            To the maximum extent permitted by law, [Your Company Name] shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.
          </p>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h5 className="mb-0">Governing Law</h5>
        </div>
        <div className="card-body">
          <p>
            These Terms and Conditions are governed by the laws of [Your Country/State]. Any disputes arising from these Terms will be resolved in the courts of [Your Jurisdiction].
          </p>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h5 className="mb-0">Changes to Terms</h5>
        </div>
        <div className="card-body">
          <p>
            We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on our website. Your continued use of our services after any changes constitutes your acceptance of the new Terms.
          </p>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h5 className="mb-0">Contact Us</h5>
        </div>
        <div className="card-body">
          <p>
            If you have any questions or concerns regarding these Terms and Conditions, please contact us at <a href="mailto:support@yourcompany.com">support@yourcompany.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
