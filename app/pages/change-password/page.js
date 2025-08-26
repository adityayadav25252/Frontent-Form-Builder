"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    console.log("Input Changed:", e.target.name, e.target.value); // Debug log
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Submitted:", formData);

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    // Get the authToken from localStorage
    const authToken = localStorage.getItem("authToken");
    console.log("Auth Token:", authToken);

    if (!authToken) {
      toast.error("You are not logged in.");
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/changePassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // <--- Use authToken here
          },
          body: JSON.stringify({
             oldPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        toast.success("Password changed successfully!");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(data.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleBack = () => {
    router.push("/pages/allpage");
  };

  return (
    <div className="change-password-container">
      <ToastContainer />
      <div className="change-password-card">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Change Password</button>
        </form>

        <button className="back-btn" onClick={handleBack}>
          &larr; Back to Dashboard
        </button>
      </div>

      <style jsx>{`
        .change-password-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 80vh;
        }

        .change-password-card {
          background: #ffffff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          width: 320px;
          text-align: center;
        }

        h2 {
          color: #1e3a8a;
          margin-bottom: 1.5rem;
        }

        input {
          display: block;
          width: 100%;
          padding: 0.6rem;
          margin-bottom: 1rem;
          border-radius: 6px;
          border: 1px solid #ccc;
        }

        button[type="submit"] {
          background-color: #1e3a8a;
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 6px;
          cursor: pointer;
          width: 100%;
          margin-bottom: 1rem;
        }

        button[type="submit"]:hover {
          background-color: #374abe;
        }

        .back-btn {
          background: none;
          border: none;
          color: #1e3a8a;
          cursor: pointer;
          font-size: 0.9rem;
          text-decoration: underline;
        }

        .back-btn:hover {
          color: #374abe;
        }
      `}</style>
    </div>
  );
}
