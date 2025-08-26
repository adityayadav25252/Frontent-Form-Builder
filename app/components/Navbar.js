"use client";

import { useState } from "react";
import FormBuilder from "../components/FormBuilder";
import NavbarBuilder from "../components/NavbarBuilder";
import Dashboard from "../components/Dashboard";
import Help from "../components/Help";
import ProfilePage from "../components/ProfilePage";
import FooterBuilder from "../components/FooterBuilder";

export default function AllPage() {
  const [activeTab, setActiveTab] = useState("builder");

  const renderContent = () => {
    switch (activeTab) {
      case "builder":
        return <FormBuilder />;
      case "navbar":
        return <NavbarBuilder />;
      case "footer":
        return <FooterBuilder />;
      case "dashboard":
        return <Dashboard />;
      case "help":
        return <Help />;
      case "profile":
        return <ProfilePage />;
      default:
        return <FormBuilder />;
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">VIP DIGITAL HUB</div>
        <div className="nav-right">
          <button onClick={() => setActiveTab("builder")} className="nav-btn">
            Form Builder
          </button>
          <button onClick={() => setActiveTab("navbar")} className="nav-btn">
            Navbar Builder
          </button>
          <button onClick={() => setActiveTab("footer")} className="nav-btn">
            Footer Builder
          </button>
          <button onClick={() => setActiveTab("dashboard")} className="nav-btn">
            Dashboard
          </button>
          <button onClick={() => setActiveTab("help")} className="nav-btn">
            Help
          </button>
          <button onClick={() => setActiveTab("profile")} className="nav-btn">
            👤
          </button>
        </div>
      </nav>

      <main className="main-content">{renderContent()}</main>

      {/* Internal CSS */}
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: "Poppins", sans-serif;
          line-height: 1.6;
          color: #333;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
        }

        .navbar {
          background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
          color: white;
          padding: 1rem 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.2rem;
          font-weight: bold;
          letter-spacing: 1px;
        }

        .nav-right {
          display: flex;
          gap: 1rem;
        }

        .nav-btn {
          color: #fff;
          background: none;
          border: 1px solid #fff;
          padding: 0.5rem 1rem;
          cursor: pointer;
          border-radius: 6px;
          transition: 0.3s;
        }

        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .main-content {
          padding: 2rem;
          animation: fadeIn 0.5s ease-in-out;
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
