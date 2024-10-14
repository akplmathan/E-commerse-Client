import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Refund Policy</h1>
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Refund Policy Overview</h5>
        </div>
        <div className="card-body">
          <p>Last updated: [Date]</p>
          <p>
            Our goal is to ensure complete customer satisfaction. If you are not satisfied with your purchase, you may be eligible for a refund based on the following conditions:
          </p>
          <ul>
            <li><strong>Cancellation:</strong> You may cancel your order within [X] hours for a full refund.</li>
            <li><strong>Refund Requests:</strong> To request a refund, please contact us at <a href="mailto:support@yourcompany.com">support@yourcompany.com</a> within [X] days of receiving your order.</li>
            <li><strong>Eligibility:</strong> Refunds are only processed for items that are returned in their original condition.</li>
            <li><strong>Exclusions:</strong> Certain items may be non-refundable, including digital products and items marked as final sale.</li>
          </ul>
          <p>If you have any questions about our refund policy, please contact us directly.</p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
