"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
const PUBLIC_URL=process.env.NEXT_PUBLIC_PUBLIC_URL;
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await fetch(`${PUBLIC_URL}/form`);
        if (!res.ok) throw new Error("Failed to fetch forms");

        const data = await res.json();
        setResponses(data.data || []); // assuming API returns { data: [...] }
      } catch (error) {
        console.error("Error fetching forms:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const totalForms = responses.length;
  const totalResponses = responses.length;
  const completionRate = totalForms > 0 ? "100%" : "0%";

  // ✅ Search filter
  const filteredResponses = responses.filter((res) =>
    (res.title || "Untitled Form")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // ✅ Delete
  const handleDelete = (id) => {
    const updated = responses.filter((res) => res.id !== id); // ✅ removes only that response
    setResponses(updated);
    localStorage.setItem("responses", JSON.stringify(updated));
  };

  // ✅ Export to CSV
  const handleExport = (res) => {
    const headers = Object.keys(res).join(",");
    const rows = [
      Object.values(res)
        .map((val) => `"${val}"`)
        .join(","),
    ];
    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${res.title || "form_response"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <div className="dashboard-header animate-slideInDown">
        <h1>Dashboard</h1>
        <p>Manage your forms and view responses</p>
      </div>

      <div
        className="search-bar"
        style={{ margin: "1rem 0", position: "relative" }}
      >
        <i
          className="fas fa-search"
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#888",
          }}
        ></i>
        <input
          type="text"
          placeholder="Search forms by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 10px 10px 36px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
      </div>

      {/* ✅ Stats */}
      <div className="stats-cards">
        <div className="stat-card animate-slideInUp">
          <div className="stat-icon">
            <i className="fas fa-file-alt"></i>
          </div>
          <div className="stat-info">
            <h3>{totalForms}</h3>
            <p>Total Forms</p>
          </div>
        </div>
        <div className="stat-card animate-slideInUp">
          <div className="stat-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-info">
            <h3>{totalResponses}</h3>
            <p>Total Responses</p>
          </div>
        </div>
        <div className="stat-card animate-slideInUp">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>{completionRate}</h3>
            <p>Completion Rate</p>
          </div>
        </div>
      </div>

      <div className="forms-list">
        <h2>Your Submitted Forms</h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : filteredResponses.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <i
              className="fas fa-inbox fa-3x"
              style={{ color: "#bdc3c7", marginBottom: "1rem" }}
            ></i>
            <p>No forms found.</p>
          </div>
        ) : (
          <div className="forms-container">
            {filteredResponses.map((res, idx) => (
              <div key={res.id || idx} className="form-card animate-slideInUp">
                <div className="form-card-header">
                  <h3 className="form-card-title">
                    {res.title || `Untitled Form`}
                  </h3>
                  <small className="text-gray-500">
                    Submitted at: {res.submittedAt || "N/A"}
                  </small>
                </div>

                <div
                  className="form-card-actions"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                    marginTop: "10px",
                  }}
                >
                  {/* Top Row */}
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => router.push(`/form/${res.formId}`)}
                  >
                    <i className="fas fa-eye"></i> View
                  </button>

                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => router.push(`/pages/responses/${res.formId}`)}

                  >
                    <i className="fas fa-book"></i> Responses
                  </button>

                  {/* Bottom Row */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(res.id)}
                  >
                    <i className="fas fa-trash"></i> Delete
                  </button>

                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleExport(res)}
                  >
                    <i className="fas fa-file-export"></i> Export CSV
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Notebook style modal */}
      {selectedForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setSelectedForm(null)}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "600px",
              maxHeight: "80vh",
              overflowY: "auto",
              fontFamily: "monospace",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedForm.title || "Untitled Form"}</h2>
            <p style={{ color: "#777" }}>
              Submitted: {selectedForm.submittedAt}
            </p>
            <hr />

            <div>
              {Object.entries(selectedForm)
                .filter(
                  ([key]) =>
                    !["formId", "title", "submittedAt", "id"].includes(key)
                )
                .map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}:</strong> {value}
                  </p>
                ))}
            </div>

            <button
              onClick={() => setSelectedForm(null)}
              style={{
                marginTop: "20px",
                padding: "8px 16px",
                background: "#3498db",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
