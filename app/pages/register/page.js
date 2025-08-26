"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FirstNavBar from "../../components/FirstNavBar";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    organizationName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.organizationName.trim())
      newErrors.organizationName = "Organization name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      console.log("Sending data:", formData);

      const response = await fetch("http://localhost:4000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (!response.ok) {
        alert(data.message || "Registration failed");
      } else {
        alert("Registration successful!");
        router.push("/pages/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      {/* Navbar */}
      <FirstNavBar />

      {/* Page Content */}
      <div className="page-container">
        <div className="form-box">
          {/* Header */}
          <div className="form-header">
            <h2>Create Account</h2>
            <p>Join us to get started with your organization</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="form">
            {/* First Name */}
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className={errors.firstName ? "error" : ""}
              />
              {errors.firstName && <p className="error-text">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className={errors.lastName ? "error" : ""}
              />
              {errors.lastName && <p className="error-text">{errors.lastName}</p>}
            </div>

            {/* Organization Name */}
            <div className="form-group">
              <label htmlFor="organizationName">Organization Name</label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="Enter your organization name"
                className={errors.organizationName ? "error" : ""}
              />
              {errors.organizationName && (
                <p className="error-text">{errors.organizationName}</p>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={errors.email ? "error" : ""}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className={errors.password ? "error" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-btn"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isLoading} className="submit-btn">
              {isLoading ? (
                <>
                  <span className="loader"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="login-link">
            Already have an account?{" "}
            <Link href="/pages/login" className="link">
              Login
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .register-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #fff;
        }
        .page-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 16px;
        }
        .form-box {
          width: 100%;
          max-width: 400px;
          background: #e1e3e8;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .form-header {
          text-align: center;
          margin-bottom: 24px;
        }
        .form-header h2 {
          font-size: 22px;
          font-weight: 600;
          color: #111;
        }
        .form-header p {
          font-size: 14px;
          color: #666;
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 6px;
          color: #333;
        }
        .form-group input {
          width: 100%;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 14px;
          color: #000;
        }
        .form-group input:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
        }
        .form-group input.error {
          border-color: red;
        }
        .error-text {
          margin-top: 4px;
          font-size: 12px;
          color: red;
        }
        .password-box {
          position: relative;
        }
        .password-box .toggle-btn {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          background: none;
          border: none;
          color: #4f46e5;
          cursor: pointer;
        }
        .submit-btn {
          width: 100%;
          background: #4f46e5;
          color: #fff;
          font-weight: 500;
          padding: 10px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }
        .submit-btn:hover {
          background: #4338ca;
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .loader {
          width: 16px;
          height: 16px;
          border: 2px solid white;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .login-link {
          text-align: center;
          margin-top: 16px;
          font-size: 14px;
          color: #555;
        }
        .login-link .link {
          color: #4f46e5;
          font-weight: 500;
          text-decoration: none;
        }
        .login-link .link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
