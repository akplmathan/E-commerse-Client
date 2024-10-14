import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const AccountSettings = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [showModal, setShowModal] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [newValue, setNewValue] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false); // Track OTP sending
  const [accountData, setAccountData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const user = useSelector((state) => state.userInfo.user);

  const navigate = useNavigate()
  useEffect(() => {
    const handleSetValues = () => {
      setAccountData({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    };
    handleSetValues();
  }, [user]);

  const handleEdit = (field) => {
    setCurrentField(field);
    setNewValue(accountData[field]);
    setShowModal(true);
    setIsOtpSent(false); // Reset OTP state when opening modal
  };

  const handleOtpVerification = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/phone/verify`, { email: accountData.email });
      enqueueSnackbar(response.data.msg, { variant: 'success' }); // Show success alert
      setIsOtpSent(true);
    } catch (error) {
      enqueueSnackbar('Error sending OTP', { variant: 'error' }); // Show error alert
    }
  };

  const handlePhoneChange = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/user-edit`, {
        phone: newValue,
        otp: otp,
        email: accountData.email,
      });

      if (response.status === 201) {
        enqueueSnackbar('User Updated Successfully', { variant: 'success' });
        setShowModal(false); // Close modal only on successful update
      } else {
        enqueueSnackbar('Incorrect OTP. Please try again.', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Error updating phone number. Please try again.', { variant: 'error' });
    }
  };

  const handleChange = () => {
    if (currentField === 'phone') {
      handlePhoneChange();
    } else {
      // Handle other fields if needed
    }
  };

  return (
    <div className="container my-5 p-4 border rounded bg-light shadow">
      <h2 className="mb-4">Login and Security</h2>

      <div className="list-group">
        <div className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>Name</strong>
            <p className="mb-0">{accountData.name}</p>
          </div>
          <button className="btn btn-outline-primary" onClick={() => handleEdit('name')}>
            <FaEdit /> Edit
          </button>
        </div>
        <div className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>Email</strong>
            <p className="mb-0">{accountData.email}</p>
          </div>
        </div>
        <div className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>Primary mobile number</strong>
            <p className="mb-0">{accountData.phone}</p>
            <small>
              Quickly sign in, easily recover passwords, and receive security notifications with this mobile number.
            </small>
          </div>
          <button className="btn btn-outline-primary" onClick={() => handleEdit('phone')}>
            <FaEdit /> Edit
          </button>
        </div>
        <div className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>Password</strong>
            <p className="mb-0">{accountData.password}</p>
          </div>
          <button className="btn btn-outline-primary" onClick={() =>navigate('/change-password')}>
            <FaEdit /> Change Password
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Edit {currentField}</h5>
                <button
                  type="button"
                  className="close btn btn-danger ms-auto"
                  onClick={() => setShowModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {currentField === 'phone' && !isOtpSent ? (
                  <div>
                    <button className="btn btn-primary mb-3" onClick={handleOtpVerification}>
                      Send OTP to Email
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="form-group">
                      <label>Existing {currentField}</label>
                      <input type="text" className="form-control" value={accountData[currentField]} disabled />
                    </div>
                    <div className="form-group">
                      <label>New {currentField}</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        placeholder={`Enter new ${currentField}`}
                      />
                    </div>
                    {currentField === 'phone' && (
                      <div className="form-group">
                        <label>Enter OTP</label>
                        <input
                          type="text"
                          className="form-control"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter the OTP sent to your email"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleChange}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Backdrop for the modal */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default AccountSettings;
