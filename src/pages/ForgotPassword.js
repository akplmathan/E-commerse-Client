import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/forgot-password`, { email });
      if (response.status === 201) {
        enqueueSnackbar(response.data.msg, { variant: 'success' });
        setOtpSent(true);
      } else {
        enqueueSnackbar(response.data.msg, { variant: 'warning' });
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.msg || 'Error sending OTP', { variant: 'error' });
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/reset-password`, {
        email,
        otp,
        newPassword,
      });
      if (response.status === 201) {
        enqueueSnackbar(response.data.msg, { variant: 'success' });
        navigate('/');
      } else {
        enqueueSnackbar(response.data.msg, { variant: 'warning' });
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.msg || 'Error resetting password', { variant: 'error' });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#f7f7f7' }}>
      <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Forgot Password</h3>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            disabled={otpSent}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        {otpSent && (
          <>
            <div className="form-group mb-3">
              <label>OTP</label>
              <input
                type="text"
                className="form-control"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
            </div>
            <div className="form-group mb-3">
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
              
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <button className="btn btn-success w-100" onClick={handleResetPassword}>
              Reset Password
            </button>
          </>
        )}
        {!otpSent && (
          <button className="btn btn-primary w-100" onClick={handleSendOtp}>
            Send OTP
          </button>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
