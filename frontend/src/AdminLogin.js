import React, { useState } from "react";
import axios from "axios";
import "./AdminLogin.css";

const AdminLogin = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(""); // Clear error on input change
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate inputs
      if (!formData.email || !formData.password) {
        setError("Email and password are required");
        setLoading(false);
        return;
      }

      console.log("axios post");
      // Make login request to backend
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/login`,  // ✅ uses .env
        {
          email: formData.email,
          password: formData.password,
        },
      );

      if (response.data.success) {
        /*  
            Store admin info in localStorage or state: The program is using localStorage 
            so the browser can remember the admin login state even after the page refreshes.
        */

        localStorage.setItem("adminInfo", JSON.stringify(response.data.admin));
        localStorage.setItem("adminLoggedIn", "true");

        // Call parent callback if provided
        if (onLoginSuccess) {
          onLoginSuccess(response.data.admin);
        }

        // Clear form
        setFormData({
          email: "",
          password: "",
        });

        alert("Login successful!");
        // Redirect to Reports page or dashboard
        window.location.href = "#/reports";
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Login failed");
      } else {
        console.log("axios post error");
        setError("Network error. Please try again.");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h1>Admin Login</h1>
        <p className="login-subtitle">
          Enter your credentials to access Reports
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Submit Button */}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="login-footer">Accounting Services | Admin Portal</p>
      </div>
    </div>
  );
};

export default AdminLogin;
