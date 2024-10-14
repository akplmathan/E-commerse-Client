import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { verifyToken } from "../redux/slice/userSlice";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.userInfo.user);
  const dispatch = useDispatch()
  const[loading,setLoading] = useState(false)
  const navigate = useNavigate()
  // Function to handle form submission
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
        email,
        password,
      });
        setLoading(false);
      if (response.data.token) {
        enqueueSnackbar("Login Successfully", { variant: "success" });
        localStorage.setItem('token',response.data.token)
        dispatch(verifyToken(response.data.token));
        navigate("/");
        console.log(user);
      } else {
        enqueueSnackbar(`${response.data.msg}`, { variant: "warning" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Style objects
  const styles = {
    container: {
      marginTop: "5rem",
      display: "flex",
      justifyContent: "center",
    },
    formContainer: {
      backgroundColor: "#f8f9fa",
      padding: "2rem",
      borderRadius: "0.5rem",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "500px",
    },
    formLabel: {
      fontWeight: "bold",
      color: "#333",
    },
    formControl: {
      borderRadius: "0.25rem",
      borderColor: "#ced4da",
      boxShadow: "none",
    },
    btnPrimary: {
      backgroundColor: "#007bff",
      borderColor: "#007bff",
      borderRadius: "0.25rem",
    },
    btnPrimaryHover: {
      backgroundColor: "#0056b3",
      borderColor: "#004085",
    },
    textLink: {
      color: "#007bff",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 className="text-center mb-4">Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email" style={styles.formLabel}>
              <FaEnvelope className="me-2" /> Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.formControl}
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" style={styles.formLabel}>
              <FaLock className="me-2" /> Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.formControl}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block w-100"
            style={styles.btnPrimary}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.btnPrimaryHover.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                styles.btnPrimary.backgroundColor)
            }
          >
            Login
          </button>
          <a className="my-3 d-block" href='/forgot-password'> Forgot Password ? </a>   
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <a href="/signup" style={styles.textLink}>
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

