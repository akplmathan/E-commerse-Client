import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  // State for form inputs and OTP management
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords does not match", { variant: "warning" });
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, {
        name,
        email,
        password,
        otp,
      });
      if (response.status == 200) {
        enqueueSnackbar(response.data.msg, { variant: "success" });
        navigate('/login')
      } else {
        enqueueSnackbar(response.data.msg, { variant: "warning" });
      }
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  // Function to handle OTP request
  const handleRequestOtp = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.put(
        `${backendUrl}/user/signup/verify`,
        { email: email }
      );
      console.log(response);
      if (response.status === 200) {
        enqueueSnackbar("OTP sent to your email.", { variant: "success" });
        setOtpSent(true);
        startResendTimer();
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  // Function to start resend timer
  const startResendTimer = () => {
    setResendTimer(60);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (resendTimer === 0) {
      handleRequestOtp();
    } else {
      enqueueSnackbar("You can resend the OTP after 1 minute", {
        variant: "warning",
      });
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
    resendTimer: {
      color: "red",
      fontSize: "0.875rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 className="text-center mb-4">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name" style={styles.formLabel}>
              <FaUser className="me-2" /> Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.formControl}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" style={styles.formLabel}>
              <FaEnvelope className="me-2" /> Email Address
            </label>
            <input
              disabled={otpSent? true:false}
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.formControl}
            />
          </div>
          <div className="form-group mb-3">
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
          <div className="form-group mb-4">
            <label htmlFor="confirmPassword" style={styles.formLabel}>
              <FaLock className="me-2" /> Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.formControl}
            />
          </div>
          {otpSent && (
            <>
              <div className="form-group mb-3">
                <label htmlFor="otp" style={styles.formLabel}>
                  <FaLock className="me-2" /> OTP
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  style={styles.formControl}
                />
              </div>
              <button
                type="button"
                className="btn btn-link d-block"
                onClick={handleResendOtp}
                style={styles.textLink}
              >
                Resend OTP{" "}
                {resendTimer > 0 &&
                  `(${Math.floor(resendTimer / 60)}:${resendTimer % 60})`}
              </button>
            </>
          )}
          {!otpSent && (
            <button
              type="button"
              className="btn btn-primary btn-block mt-3 w-100"
              style={styles.btnPrimary}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.btnPrimaryHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  styles.btnPrimary.backgroundColor)
              }
              onClick={handleRequestOtp}
            >
              Request OTP
            </button>
          )}
          {otpSent && (
            <button
              type="submit"
              className="btn btn-primary btn-block mt-3 w-100"
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
              {otpSent ? "Verify OTP" : "Sign Up"}
            </button>
          )}
          <p className="text-center mt-3">
            Already have an account?{" "}
            <a href="/login" style={styles.textLink}>
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
