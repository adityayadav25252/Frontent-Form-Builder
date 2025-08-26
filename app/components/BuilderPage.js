"use client";

import { useState } from "react";
import FormBuilder from "./FormBuilder";
import NavbarBuilder from "./NavbarBuilder";

export default function BuilderPage() {
  const [activeBuilder, setActiveBuilder] = useState("form");

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveBuilder("form")}
          style={{
            marginRight: "10px",
            backgroundColor: activeBuilder === "form" ? "#007bff" : "#ccc",
            color: "#fff",
            padding: "10px 15px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Form Builder
        </button>
        <button
          onClick={() => setActiveBuilder("navbar")}
          style={{
            backgroundColor: activeBuilder === "navbar" ? "#007bff" : "#ccc",
            color: "#fff",
            padding: "10px 15px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Navbar Builder
        </button>
      </div>

      {activeBuilder === "form" && <FormBuilder />}
      {activeBuilder === "navbar" && <NavbarBuilder />}
    </div>
  );
}
