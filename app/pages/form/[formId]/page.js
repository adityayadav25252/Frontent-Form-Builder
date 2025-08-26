"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PublicFormPage() {
  const { formId } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/form/${formId}`);
        if (!res.ok) throw new Error("Form not found");
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error("Error fetching form:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [formId]);

  const handleChange = (fieldName, value, type) => {
    if (type === "checkbox") {
      setResponses((prev) => {
        const prevValues = prev[fieldName] || [];
        if (prevValues.includes(value)) {
          return { ...prev, [fieldName]: prevValues.filter((v) => v !== value) };
        } else {
          return { ...prev, [fieldName]: [...prevValues, value] };
        }
      });
    } else {
      setResponses((prev) => ({ ...prev, [fieldName]: value }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:4000/api/form/formsResponseSubmit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formId,
        responseData: responses,  
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Form submitted successfully!");
      console.log("Response saved:", data);
    } else {
      alert(data.message || "Failed to submit form");
      console.error(data);
    }
  } catch (err) {
    console.error("Error submitting form:", err);
  }
};

  if (loading) return <p>Loading form...</p>;
  if (!formData) return <p>Form not found</p>;

  return (
    <div className="public-form-container">
      <h2>{formData.title}</h2>
      <p>{formData.description}</p>

      <form onSubmit={handleSubmit}>
        {formData.fields.map((field, index) => (
          <div key={index} className="form-field">
            <label>
              {field.label} {field.required && <span className="required">*</span>}
            </label>

            {field.type === "text" && (
              <input
                type="text"
                placeholder="Your answer"
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            )}
            {field.type === "textarea" && (
              <textarea
                placeholder="Your answer"
                onChange={(e) => handleChange(field.name, e.target.value)}
              ></textarea>
            )}
            {field.type === "email" && (
              <input
                type="email"
                placeholder="email@example.com"
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            )}
            {field.type === "number" && (
              <input
                type="number"
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            )}
            {field.type === "date" && (
              <input
                type="date"
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            )}

            {field.type === "radio" &&
              field.options?.map((opt, i) => (
                <div key={i} className="option">
                  <input
                    type="radio"
                    name={field.name}
                    value={opt}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />
                  <label>{opt}</label>
                </div>
              ))}

            {field.type === "checkbox" &&
              field.options?.map((opt, i) => (
                <div key={i} className="option">
                  <input
                    type="checkbox"
                    name={field.name}
                    value={opt}
                    onChange={(e) => handleChange(field.name, opt, "checkbox")}
                  />
                  <label>{opt}</label>
                </div>
              ))}

            {field.type === "dropdown" && (
              <select onChange={(e) => handleChange(field.name, e.target.value)}>
                <option value="">Select</option>
                {field.options?.map((opt, i) => (
                  <option key={i}>{opt}</option>
                ))}
              </select>
            )}
          </div>
        ))}

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {/* Internal CSS */}
      <style jsx>{`
        .public-form-container {
          max-width: 600px;
          margin: 30px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
          background: #fff;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
        }

        h2 {
          margin-bottom: 5px;
          font-size: 24px;
          color: #333;
        }

        p {
          color: #666;
          margin-bottom: 20px;
        }

        .form-field {
          margin-bottom: 20px;
        }

        label {
          display: block;
          font-weight: 600;
          margin-bottom: 6px;
        }

        input[type="text"],
        input[type="email"],
        input[type="number"],
        input[type="date"],
        textarea,
        select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
        }

        textarea {
          min-height: 80px;
        }

        .option {
          display: flex;
          align-items: center;
          gap: 6px;
          margin: 4px 0;
        }

        .required {
          color: red;
        }

        .submit-btn {
          background: #0070f3;
          color: #fff;
          padding: 10px 16px;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
        }

        .submit-btn:hover {
          background: #005bb5;
        }
      `}</style>
    </div>
  );
}
