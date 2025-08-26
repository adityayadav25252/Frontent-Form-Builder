// app/page.js
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo */}
          <div className="logo">Vip Digital</div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <Link href="#" className="nav-link">Home</Link>
            <Link href="#" className="nav-link">Service</Link>
            <Link href="#" className="nav-link">About</Link>
            <Link href="/pages/register" className="nav-link">Register</Link>
          </div>

          {/* Mobile menu button */}
          <div className="mobile-button">
            <button className="menu-btn" onClick={toggleMobileMenu}>
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-menu ${isMobileOpen ? '' : 'hidden'}`}>
          <Link href="#" className="mobile-link">Home</Link>
          <Link href="#" className="mobile-link">Service</Link>
          <Link href="#" className="mobile-link">About</Link>
          <Link href="/pages/register" className="mobile-link">Register</Link>
        </div>
      </nav>

      <style jsx>{`
        .navbar {
          background-color: #2563eb;
          color: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: bold;
        }
        .desktop-nav {
          display: none;
        }
        .nav-link {
          margin-left: 1.5rem;
          font-weight: 500;
          text-decoration: none;
          color: white;
        }
        .nav-link:hover {
          color: #bfdbfe;
        }
        .mobile-button {
          display: block;
        }
        .menu-btn {
          padding: 0.5rem;
          border-radius: 0.375rem;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }
        .menu-btn:hover {
          background-color: #1d4ed8;
        }
        .icon {
          width: 1.5rem;
          height: 1.5rem;
        }
        .mobile-menu {
          display: none;
          flex-direction: column;
          background-color: #1e40af;
          padding: 0.5rem 1rem;
        }
        .mobile-menu a {
          padding: 0.5rem;
          margin-bottom: 0.25rem;
          border-radius: 0.25rem;
          text-decoration: none;
          color: white;
        }
        .mobile-menu a:hover {
          background-color: #2563eb;
        }
        .mobile-menu.hidden {
          display: none;
        }
        .mobile-menu:not(.hidden) {
          display: flex;
        }

        @media(min-width: 768px) {
          .desktop-nav {
            display: flex;
          }
          .mobile-button {
            display: none;
          }
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
