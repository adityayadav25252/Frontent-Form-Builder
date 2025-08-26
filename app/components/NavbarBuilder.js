import { useState, useRef } from "react";
import Head from "next/head";

export default function NavbarBuilder() {
  const [navbarData, setNavbarData] = useState({
    logo: "Your Logo",
    logoImage: null,
    bgColor: "#ffffff",
    linkColor: "#333333",
    hoverColor: "#0070f3",
    links: [
      { id: 1, text: "Home", url: "/" },
      { id: 2, text: "About", url: "/about" },
      { id: 3, text: "Contact", url: "/contact" },
    ],
  });

  // State for active link editing
  const [activeLink, setActiveLink] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNavbarData({ ...navbarData, logoImage: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Add a new link
  const addLink = () => {
    const newId = Math.max(0, ...navbarData.links.map((link) => link.id)) + 1;
    const newLink = { id: newId, text: "New Link", url: "#" };
    setNavbarData({
      ...navbarData,
      links: [...navbarData.links, newLink],
    });
    setActiveLink(newId);
  };

  // Update a specific link
  const updateLink = (id, field, value) => {
    setNavbarData({
      ...navbarData,
      links: navbarData.links.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      ),
    });
  };

  // Remove a link
  const removeLink = (id) => {
    setNavbarData({
      ...navbarData,
      links: navbarData.links.filter((link) => link.id !== id),
    });
    if (activeLink === id) setActiveLink(null);
  };

  // Drag and drop handlers
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
    setIsDragging(true);
    e.currentTarget.classList.add("dragging");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, newIndex) => {
    e.preventDefault();
    const originalIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const links = [...navbarData.links];
    const [movedItem] = links.splice(originalIndex, 1);
    links.splice(newIndex, 0, movedItem);
    setNavbarData({ ...navbarData, links });
    setIsDragging(false);
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    e.currentTarget.classList.remove("dragging");
  };

  // Generate code for export
  const generateCode = () => {
    const code = `
import Link from 'next/link';
import { useState } from 'react';

export default function CustomNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav style={{ backgroundColor: '${navbarData.bgColor}' }}>
      <div className="container">
        <div className="nav-content">
          <div className="logo">
            ${
              navbarData.logoImage
                ? `<img src="${navbarData.logoImage}" alt="${navbarData.logo}" />`
                : `<span>${navbarData.logo}</span>`
            }
          </div>
          
          <div className={\`nav-links $\{isMenuOpen ? 'active' : ''}\`}>
            <ul>
              ${navbarData.links
                .map(
                  (link) => `
                <li key="${link.id}">
                  <Link href="${link.url}">
                    <a style={{ color: '${navbarData.linkColor}' }} 
                       onMouseOver="this.style.color='${navbarData.hoverColor}'" 
                       onMouseOut="this.style.color='${navbarData.linkColor}'">
                      ${link.text}
                    </a>
                  </Link>
                </li>
              `
                )
                .join("")}
            </ul>
          </div>
          
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      
      <style jsx>{'
        nav {
          padding: 1rem 0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: bold;
        }
        .logo img {
          height: 40px;
        }
        .nav-links ul {
          display: flex;
          list-style: none;
          gap: 2rem;
          margin: 0;
          padding: 0;
        }
        .nav-links a {
          text-decoration: none;
          transition: color 0.3s;
        }
        .menu-toggle {
          display: none;
          flex-direction: column;
          background: none;
          border: none;
          cursor: pointer;
        }
        .menu-toggle span {
          width: 25px;
          height: 3px;
          background: #333;
          margin: 3px 0;
          transition: 0.3s;
        }
        
        @media (max-width: 768px) {
          .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: ${navbarData.bgColor};
            padding: 1rem;
            box-shadow: 0 5px 10px rgba(0,0,0,0.1);
            transform: translateY(-10px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
          }
          .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }
          .nav-links ul {
            flex-direction: column;
            gap: 1rem;
          }
          .menu-toggle {
            display: flex;
          }
        }
      '}</style>
    </nav>
  );
}
    `;

    // Create a blob and download
    const blob = new Blob([code], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "CustomNavbar.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <header className="builder-header">
        <h1>Navbar Builder</h1>
        <p>Create a professional navbar for your Next.js application</p>
      </header>
      <div className="builder-container">
        <div className="builder-body">
          {/* Left Panel: Settings */}
          <aside className="panel settings-panel">
            <div className="panel-header">
              <h2>Navbar Settings</h2>
            </div>

            <div className="settings-group">
              <h3>Branding</h3>
              <div className="form-group">
                <label>Logo Text</label>
                <input
                  type="text"
                  value={navbarData.logo}
                  onChange={(e) =>
                    setNavbarData({ ...navbarData, logo: e.target.value })
                  }
                  placeholder="Enter logo text"
                />
              </div>

              <div className="form-group">
                <label>Logo Image</label>
                <div className="file-upload">
                  <button
                    className="btn btn-secondary"
                    onClick={() => fileInputRef.current.click()}
                  >
                    Upload Image
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleLogoUpload}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                  {navbarData.logoImage && (
                    <span className="upload-feedback">✓ Image uploaded</span>
                  )}
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h3>Colors</h3>
              <div className="form-group">
                <label>Background Color</label>
                <div className="color-input">
                  <input
                    type="color"
                    value={navbarData.bgColor}
                    onChange={(e) =>
                      setNavbarData({ ...navbarData, bgColor: e.target.value })
                    }
                  />
                  <span>{navbarData.bgColor}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Link Color</label>
                <div className="color-input">
                  <input
                    type="color"
                    value={navbarData.linkColor}
                    onChange={(e) =>
                      setNavbarData({
                        ...navbarData,
                        linkColor: e.target.value,
                      })
                    }
                  />
                  <span>{navbarData.linkColor}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Hover Color</label>
                <div className="color-input">
                  <input
                    type="color"
                    value={navbarData.hoverColor}
                    onChange={(e) =>
                      setNavbarData({
                        ...navbarData,
                        hoverColor: e.target.value,
                      })
                    }
                  />
                  <span>{navbarData.hoverColor}</span>
                </div>
              </div>
            </div>

            <div className="settings-actions">
              <button
                className="btn btn-primary btn-full"
                onClick={generateCode}
              >
                Export Navbar Code
              </button>
            </div>
          </aside>

          {/* Right Panel: Preview */}
          <main className="panel preview-panel">
            <div className="settings-group">
              <h3>Navigation Links</h3>
              <div className="links-list">
                {navbarData.links.map((link, index) => (
                  <div
                    key={link.id}
                    className={`link-item ${
                      activeLink === link.id ? "active" : ""
                    }`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    onClick={() => setActiveLink(link.id)}
                  >
                    <div className="link-handle">≡</div>
                    <div className="link-content">
                      <input
                        type="text"
                        value={link.text}
                        onChange={(e) =>
                          updateLink(link.id, "text", e.target.value)
                        }
                        placeholder="Link text"
                      />
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) =>
                          updateLink(link.id, "url", e.target.value)
                        }
                        placeholder="Link URL"
                      />
                    </div>
                    <button
                      className="btn btn-icon"
                      onClick={() => removeLink(link.id)}
                      aria-label="Remove link"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary btn-full" onClick={addLink}>
                + Add New Link
              </button>
            </div>
            <div className="panel-header">
              <h2>Live Preview</h2>
              <p>See how your navbar will look</p>
            </div>

            <div className="navbar-preview">
              <nav
                className="preview-navbar"
                style={{ backgroundColor: navbarData.bgColor }}
              >
                <div className="nav-container">
                  <div className="nav-brand">
                    {navbarData.logoImage ? (
                      <img
                        src={navbarData.logoImage}
                        alt={navbarData.logo}
                        className="logo-img"
                      />
                    ) : (
                      <span className="logo-text">{navbarData.logo}</span>
                    )}
                  </div>

                  <ul className="nav-links-preview">
                    {navbarData.links.map((link) => (
                      <li key={link.id}>
                        <a
                          href={link.url}
                          style={{
                            color: navbarData.linkColor,
                          }}
                          onMouseOver={(e) =>
                            (e.target.style.color = navbarData.hoverColor)
                          }
                          onMouseOut={(e) =>
                            (e.target.style.color = navbarData.linkColor)
                          }
                        >
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <button className="mobile-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </nav>

             
            </div>
          </main>
        </div>

        <style jsx>{`
          .builder-container {
            font-family: "Inter", sans-serif;
            min-height: 100vh;
            background: #f8fafc;
            color: #334155;
          }

          .builder-header {
            background: #fff;
            padding: 1.5rem 2rem;
            border-bottom: 1px solid #e2e8f0;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          }

          .builder-header h1 {
            margin: 0;
            font-weight: 700;
            font-size: 1.8rem;
            color: #1e293b;
          }

          .builder-header p {
            margin: 0.5rem 0 0;
            color: #64748b;
            font-size: 1rem;
          }

          .builder-body {
            display: flex;
            gap: 1.5rem;
            padding: 1.5rem;
            width: 1200px;
            margin: 0 auto;
          }

          .panel {
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            overflow: hidden;
          }

          .settings-panel {
            flex: 1;
            min-width: 320px;
            max-width: 400px;
            display: flex;
            flex-direction: column;
          }

          .preview-panel {
            flex: 2;
            min-width: 500px;
          }

          .panel-header {
            padding: 1.25rem 1.5rem;
            border-bottom: 1px solid #f1f5f9;
          }

          .panel-header h2 {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 600;
            color: #1e293b;
          }

          .panel-header p {
            margin: 0.25rem 0 0;
            color: #64748b;
            font-size: 0.875rem;
          }

          .settings-group {
            padding: 1.25rem 1.5rem;
            border-bottom: 1px solid #f1f5f9;
          }

          .settings-group:last-child {
            border-bottom: none;
          }

          .settings-group h3 {
            margin: 0 0 1rem;
            font-size: 1rem;
            font-weight: 600;
            color: #1e293b;
          }

          .form-group {
            margin-bottom: 1.25rem;
          }

          .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
            font-weight: 500;
            color: #374151;
          }

          .form-group input[type="text"] {
            width: 100%;
            padding: 0.625rem 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 0.875rem;
            transition: border-color 0.2s;
          }

          .form-group input[type="text"]:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }

          .color-input {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          .color-input input[type="color"] {
            width: 40px;
            height: 40px;
            padding: 0;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            cursor: pointer;
          }

          .color-input span {
            font-size: 0.875rem;
            color: #6b7280;
          }

          .file-upload {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          .upload-feedback {
            font-size: 0.875rem;
            color: #059669;
          }

          .links-list {
            margin-bottom: 1rem;
          }

          .link-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem;
            margin-bottom: 0.5rem;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
          }

          .link-item:hover {
            border-color: #bfdbfe;
          }

          .link-item.active {
            border-color: #3b82f6;
            background-color: #eff6ff;
          }

          .link-handle {
            color: #9ca3af;
            cursor: grab;
            font-size: 1.25rem;
            padding: 0.25rem;
          }

          .link-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .link-content input {
            padding: 0.375rem 0.5rem;
            font-size: 0.8125rem;
          }

          .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 6px;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
          }

          .btn-primary {
            background-color: #3b82f6;
            color: white;
          }

          .btn-primary:hover {
            background-color: #2563eb;
          }

          .btn-secondary {
            background-color: #f1f5f9;
            color: #475569;
          }

          .btn-secondary:hover {
            background-color: #e2e8f0;
          }

          .btn-icon {
            padding: 0.25rem 0.5rem;
            background: none;
            color: #9ca3af;
            font-size: 1.25rem;
          }

          .btn-icon:hover {
            color: #ef4444;
            background: none;
          }

          .btn-full {
            width: 100%;
          }

          .settings-actions {
            padding: 1.5rem;
            margin-top: auto;
          }

          .navbar-preview {
            padding: 1.5rem;
          }

          .preview-navbar {
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            margin-bottom: 1.5rem;
          }

          .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .nav-brand {
            font-weight: 700;
            font-size: 1.25rem;
          }

          .logo-img {
            height: 40px;
          }

          .nav-links-preview {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 1.5rem;
          }

          .nav-links-preview a {
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s;
          }

          .mobile-toggle {
            display: none;
            flex-direction: column;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.25rem;
          }

          .mobile-toggle span {
            width: 20px;
            height: 2px;
            background: #334155;
            margin: 2px 0;
          }

          .preview-content {
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }

          @media (max-width: 768px) {
            .builder-body {
              flex-direction: column;
            }

            .settings-panel,
            .preview-panel {
              min-width: 100%;
              max-width: 100%;
            }

            .nav-links-preview {
              display: none;
            }

            .mobile-toggle {
              display: flex;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
