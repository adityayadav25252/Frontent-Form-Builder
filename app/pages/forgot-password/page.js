"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Submitting email:", email); // ✅ Debugging

    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/forgetPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      console.log("API Response Status:", response.status); // ✅ Debugging

      const data = await response.json();
      console.log("API Response Data:", data); // ✅ Debugging

      if (response.ok) {
        alert("Reset link has been sent to your email!");
      } else {
        alert("Failed to send reset link: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error during request:", error); // ✅ Debugging
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <p>
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>

        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <button type="submit">Send Reset Link</button>
        </form>

        <div className="back-to-login">
          <Link href="/pages/login">Back to login</Link>
        </div>
      </div>

      {/* Inline CSS with style jsx */}
      <style jsx>{`
        .forgot-password-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          // background: linear-gradient(135deg, #3b82f6, #1e3a8a);
          font-family: Arial, sans-serif;
        }

        .forgot-password-container {
          background: #ffffff;
          padding: 2rem;
          border-radius: 8px;
          max-width: 400px;
          width: 100%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          text-align: center;
        }

        .forgot-password-container h2 {
          color: #1e40af;
          margin-bottom: 0.5rem;
        }

        .forgot-password-container p {
          font-size: 0.9rem;
          color: #4b5563;
          margin-bottom: 1.5rem;
        }

        .forgot-password-form .form-group {
          margin-bottom: 1rem;
          text-align: left;
        }

        .forgot-password-form label {
          display: block;
          font-size: 0.9rem;
          margin-bottom: 0.3rem;
          color: #1e3a8a;
        }

        .forgot-password-form input {
          width: 100%;
          padding: 0.6rem;
          border: 1px solid #93c5fd;
          border-radius: 4px;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .forgot-password-form input:focus {
          border-color: #2563eb;
        }

        .forgot-password-form button {
          width: 100%;
          padding: 0.7rem;
          background-color: #2563eb;
          color: #ffffff;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .forgot-password-form button:hover {
          background-color: #1e40af;
        }

        .back-to-login {
          margin-top: 1rem;
        }

        .back-to-login a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
        }

        .back-to-login a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
