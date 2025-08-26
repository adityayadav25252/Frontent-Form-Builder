"use client";
import { useEffect, useState } from "react";

export default function ResponsesPage({ params }) {
  const { formId } = params; // 👈 dynamic param
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!formId) return;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authaToken"); 
        const res = await fetch(
          `http://localhost:4000/api/form/getDataByFromIdResponses/${formId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        const data = await res.json();
        setResponses(data.data || []);
      } catch (err) {
        console.error("Error fetching responses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [formId]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Form Responses for ID: {formId}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : responses.length > 0 ? (
        <pre>{JSON.stringify(responses, null, 2)}</pre>
      ) : (
        <p>No responses yet</p>
      )}
    </div>
  );
}
