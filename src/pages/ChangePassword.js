import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/user/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 201) {
        enqueueSnackbar(response.data.msg, { variant: 'success' });
        navigate('/');
      } else {
        enqueueSnackbar(response.data.msg, { variant: 'warning' });
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.msg || 'Error changing password', {
        variant: 'error',
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Change Password</h3>
        <div className="form-group mb-3">
          <label>Old Password</label>
          <input
            type="password"
            className="form-control"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleChangePassword}>
          Change Password
        </button>
        <a className="d-block text-center mt-3" href="/forgot-password">
          Forgot Old Password?
        </a>
      </div>
    </div>
  );
};

export default ChangePassword;
