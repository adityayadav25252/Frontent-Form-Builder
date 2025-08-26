"use client";
import { useEffect, useState } from "react";

export default function ResponsesPage({ params }) {
  const { formId } = params;
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
const PUBLIC_URL = process.env.NEXT_PUBLIC_PUBLIC_URL;
  useEffect(() => {
    if (!formId) return;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("No token found. Please login again.");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${PUBLIC_URL}/form/getDataByFromIdResponses/${formId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch responses");
        }

        const result = await res.json();
        setForm(result.data.form || null);
        setResponses(result.data.responses || []);
      } catch (err) {
        console.error("Error fetching responses:", err);
        setError("Failed to load responses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [formId]);

  // ✅ Filtered responses
  const filteredResponses = responses.filter((resp) =>
    JSON.stringify(resp.response)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ✅ Export CSV
  const exportCSV = () => {
    if (!form) return;
    const headers = ["ID", "Submitted At", ...form.fields.map((f) => f.label)];
    const rows = responses.map((r) => [
      r.id,
      new Date(r.submittedAt).toLocaleString(),
      ...form.fields.map((f) => r.response[f.name] || ""),
    ]);
    const csv =
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.title}_responses.csv`;
    a.click();
  };

  return (
    <div style={{ display: "flex", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* LEFT SIDE: Form Info */}
      {form && (
        <div
          style={{
            width: "300px",
            marginRight: "20px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fafafa",
          }}
        >
          <h2 style={{ color: "#0070f3", marginBottom: "10px" }}>
            {form.title}
          </h2>
          <p style={{ margin: "5px 0" }}>
            <strong>Created At:</strong>{" "}
            {new Date(form.createdAt).toLocaleString()}
          </p>
          <h3 style={{ marginTop: "15px", marginBottom: "8px" }}>Form Fields:</h3>
          <ul style={{ margin: 0, paddingLeft: "18px" }}>
            {form.fields.map((f, i) => (
              <li key={i}>
                {f.label} ({f.type})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* RIGHT SIDE: Table */}
      <div style={{ flexGrow: 1 }}>
        <h2 style={{ marginBottom: "10px" }}>Responses</h2>

        {/* Search + Export */}
        <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flexGrow: 1,
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <button
            onClick={exportCSV}
            style={{
              padding: "8px 12px",
              background: "#0070f3",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Export CSV
          </button>
        </div>

        {loading ? (
          <p>Loading responses...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : filteredResponses.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#fff",
            }}
          >
            <thead>
              <tr style={{ background: "#f4f4f4" }}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Submitted At</th>
                {form.fields.map((f) => (
                  <th key={f.name} style={thStyle}>
                    {f.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredResponses.map((resp) => (
                <tr key={resp.id}>
                  <td style={tdStyle}>{resp.id}</td>
                  <td style={tdStyle}>
                    {new Date(resp.submittedAt).toLocaleString()}
                  </td>
                  {form.fields.map((f) => (
                    <td key={f.name} style={tdStyle}>
                      {resp.response[f.name]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No responses yet.</p>
        )}
      </div>
    </div>
  );
}

// ✅ Internal CSS (inline styles)
const thStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ddd",
};
