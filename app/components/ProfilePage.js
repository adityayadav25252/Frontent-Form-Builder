"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    email: "",
  });

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user")) || {};
    setUser({
      firstName: loggedInUser.firstName || "First",
      lastName: loggedInUser.lastName || "Last",
      organization: loggedInUser.organization || "Org",
      email: loggedInUser.email || "guest@example.com",
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/"); 
  };

  const handleChangePassword = () => {
    router.push("/pages/change-password"); 
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="avatar">👤</div>
        <h2>{user.firstName} {user.lastName}</h2>
        <p>Email: {user.email}</p>
        <p>Organization: {user.organization}</p>
        <div className="buttons">
          <button className="edit-btn">Edit Profile</button>
          <button className="password-btn" onClick={handleChangePassword}>Change Password</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <style jsx>{`
        .profile-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 80vh;
          background: linear-gradient(135deg, #c3e0f5 0%, #7bb7f0 100%);
        }

        .profile-card {
          background: #ffffff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
          width: 320px;
        }

        .avatar {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        h2 {
          margin-bottom: 0.5rem;
          color: #1e3a8a;
        }

        p {
          margin-bottom: 0.5rem;
          color: #333;
        }

        .buttons {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .edit-btn, .password-btn, .logout-btn {
          padding: 0.6rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.3s;
          color: white;
        }

        .edit-btn { background-color: #1e3a8a; }
        .edit-btn:hover { background-color: #374abe; }

        .password-btn { background-color: #6b7280; }
        .password-btn:hover { background-color: #4b5563; }

        .logout-btn { background-color: #dc2626; }
        .logout-btn:hover { background-color: #b91c1c; }
      `}</style>
    </div>
  );
}
