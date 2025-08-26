"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FirstNavBar from "../../components/FirstNavBar";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  // validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (!response.ok) {
        setErrors({ general: data.message || "Login failed" });
        return;
      }

      if (data.token) {
        localStorage.setItem("authToken", data.token);
      } else {
        console.warn("No token found in response");
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      router.push("/pages/allpage");
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <FirstNavBar className="top-navbar" />

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {/* email input */}
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            {/* password input */}
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "error" : ""}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            <div className="forgot-password">
              <Link href="/pages/forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            {errors.general && (
              <p style={{ color: "red", marginTop: "10px" }}>
                {errors.general}
              </p>
            )}
          </form>

          <div className="signup-link">
            Don&apos;t have an account?{" "}
            <Link href="/pages/register">Register</Link>
          </div>
        </div>
      </div>

      {/* same styling */}
      <style jsx>{`
        .top-navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
        }
        .login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f8ff 0%, #e6f2ff 100%);
        }
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        .login-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 82, 204, 0.15);
          width: 100%;
          max-width: 420px;
          padding: 32px;
        }
        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .login-header h2 {
          color: #0052cc;
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .login-header p {
          color: #666;
          font-size: 16px;
          margin: 0;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        label {
          font-size: 14px;
          font-weight: 500;
          color: #344563;
        }
        input {
          padding: 12px 16px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 16px;
          transition: all 0.2s ease;
        }
        input:focus {
          outline: none;
          border-color: #0052cc;
          box-shadow: 0 0 0 3px rgba(0, 82, 204, 0.1);
        }
        input.error {
          border-color: #ff5630;
        }
        .error-text {
          color: #ff5630;
          font-size: 13px;
          margin-top: 4px;
        }
        .password-input-container {
          position: relative;
        }
        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #0052cc;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          padding: 4px 8px;
        }
        .forgot-password {
          text-align: right;
          margin-top: -10px;
        }
        .forgot-password a {
          color: #0052cc;
          font-size: 14px;
          text-decoration: none;
        }
        .forgot-password a:hover {
          text-decoration: underline;
        }
        .submit-button {
          padding: 14px;
          background: #0052cc;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 8px;
        }
        .submit-button:hover:not(:disabled) {
          background: #0044aa;
        }
        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .signup-link {
          text-align: center;
          margin-top: 24px;
          color: #666;
          font-size: 14px;
        }
        .signup-link a {
          color: #0052cc;
          text-decoration: none;
          font-weight: 500;
        }
        .signup-link a:hover {
          text-decoration: underline;
        }
        @media (max-width: 600px) {
          .login-card {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
}
