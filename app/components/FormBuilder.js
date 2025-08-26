  "use client";

  import { useState, useEffect } from "react";

  export default function FormBuilder() {
    const [formData, setFormData] = useState({
      formId: "",
      title: "",
      fields: [],
    });

    const [currentFieldId, setCurrentFieldId] = useState(null);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

    useEffect(() => {
      if (!document.querySelector("#font-awesome")) {
        const link = document.createElement("link");
        link.id = "font-awesome";
        link.rel = "stylesheet";
        link.href =
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
        document.head.appendChild(link);
      }
    }, []);

    const fieldTypes = [
      { type: "text", icon: "fas fa-font", label: "Text Input" },
      { type: "textarea", icon: "fas fa-paragraph", label: "Text Area" },
      { type: "email", icon: "fas fa-envelope", label: "Email" },
      { type: "number", icon: "fas fa-hashtag", label: "Number" },
      { type: "date", icon: "fas fa-calendar", label: "Date" },
      { type: "radio", icon: "fas fa-dot-circle", label: "Multiple Choice" },
      { type: "checkbox", icon: "fas fa-check-square", label: "Checkboxes" },
      { type: "dropdown", icon: "fas fa-caret-down", label: "Dropdown" },
    ];

    const addFieldToForm = (type) => {
      const fieldId = "field-" + Date.now();
      const field = {
        id: fieldId,
        type: type,
        label: "",
        required: false,
        options:
          type === "radio" || type === "checkbox" || type === "dropdown"
            ? ["Option 1", "Option 2"]
            : [],
      };

      setFormData((prev) => ({
        ...prev,
        fields: [...prev.fields, field],
      }));

      setCurrentFieldId(fieldId);
    };

    const updateFieldProperty = (fieldId, property, value) => {
      setFormData((prev) => ({
        ...prev,
        fields: prev.fields.map((field) =>
          field.id === fieldId ? { ...field, [property]: value } : field
        ),
      }));
    };

    const removeField = (fieldId) => {
      setFormData((prev) => ({
        ...prev,
        fields: prev.fields.filter((field) => field.id !== fieldId),
      }));

      if (currentFieldId === fieldId) {
        setCurrentFieldId(null);
      }
    };

    const addOptionToField = (fieldId) => {
      setFormData((prev) => ({
        ...prev,
        fields: prev.fields.map((field) =>
          field.id === fieldId
            ? {
                ...field,
                options: [...field.options, `Option ${field.options.length + 1}`],
              }
            : field
        ),
      }));
    };

    const removeOptionFromField = (fieldId, optionIndex) => {
      setFormData((prev) => ({
        ...prev,
        fields: prev.fields.map((field) =>
          field.id === fieldId
            ? {
                ...field,
                options: field.options.filter(
                  (_, index) => index !== optionIndex
                ),
              }
            : field
        ),
      }));
    };

    const updateOption = (fieldId, optionIndex, value) => {
      setFormData((prev) => ({
        ...prev,
        fields: prev.fields.map((field) =>
          field.id === fieldId
            ? {
                ...field,
                options: field.options.map((option, index) =>
                  index === optionIndex ? value : option
                ),
              }
            : field
        ),
      }));
    };

    const [savedFormId, setSavedFormId] = useState(null); // new state

    const generateFormId = () => {
      return Math.floor(100000000 + Math.random() * 900000000);
    };
    const saveForm = async () => {
      const token = localStorage.getItem("authToken");

      // Agar formId empty hai to naya number generate karo
      const generatedFormId =
        formData.formId && formData.formId.trim() !== ""
          ? formData.formId
          : generateFormId();

      const payload = {
        formId: generatedFormId,
        title: formData.title,
        fields: formData.fields.map((field) => ({
          name: field.label
            ? field.label.replace(/\s+/g, "").toLowerCase()
            : field.type,
          label: field.label,
          type: field.type,
        })),
      };

      try {
        const response = await fetch(
          "http://localhost:4000/api/form/formsCreate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          const result = await response.json();

          // Yaha backend se jo bhi aaya usse check karo
          console.log("Form create result:", result);

          // Yahi pe apna formId save kar lo (backend ka id ho ya apna generated)
          setSavedFormId(payload.formId);

          setIsLinkModalOpen(true);
        } else {
          const err = await response.json();
          alert(err.message || "Form save failed.");
        }
      } catch (error) {
        console.error("Error saving form:", error);
        alert("Error saving form. See console for details.");
      }
    };

    const currentField = formData.fields.find(
      (field) => field.id === currentFieldId
    );

    return (
      <div className="container">
        <div className="builder-container">
          <div className="fields-panel">
            <h3>Form Fields</h3>
            {fieldTypes.map((field) => (
              <div
                key={field.type}
                className="field-option"
                onClick={() => addFieldToForm(field.type)}
              >
                <i className={field.icon}></i>
                <span>{field.label}</span>
              </div>
            ))}
          </div>

          <div className="form-preview">
            <div className="preview-header">
              <input
                type="text"
                className="form-title-input"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Form Title"
              />
              <input
                type="text"
                className="form-desc-input"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Form Description"
              />
            </div>

            <div className="preview-body">
              {formData.fields.length === 0 ? (
                <div className="empty-prompt">
                  <i className="fas fa-inbox fa-3x"></i>
                  <p>
                    No fields added yet. Drag and drop fields from the left panel.
                  </p>
                </div>
              ) : (
                formData.fields.map((field) => (
                  <div
                    key={field.id}
                    className={`form-field ${
                      currentFieldId === field.id ? "selected" : ""
                    }`}
                    onClick={() => setCurrentFieldId(field.id)}
                  >
                    <label className="form-label">
                      {field.label}
                      {field.required && <span className="required">*</span>}
                    </label>

                    {field.type === "text" && (
                      <input type="text" placeholder="Text input" disabled />
                    )}

                    {field.type === "textarea" && (
                      <textarea
                        placeholder="Long text answer"
                        disabled
                      ></textarea>
                    )}

                    {field.type === "email" && (
                      <input type="email" placeholder="Email address" disabled />
                    )}

                    {field.type === "number" && (
                      <input type="number" placeholder="Number" disabled />
                    )}

                    {field.type === "date" && <input type="date" disabled />}

                    {(field.type === "radio" || field.type === "checkbox") && (
                      <div>
                        {field.options.map((option, index) => (
                          <div key={index} className="option">
                            <input type={field.type} name={field.id} disabled />
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {field.type === "dropdown" && (
                      <select disabled>
                        <option value="">Select an option</option>
                        {field.options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}

                    <div className="field-actions">
                      <button
                        className="btn-edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentFieldId(field.id);
                        }}
                      >
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeField(field.id);
                        }}
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="preview-actions">
              <button
                className="btn btn-primary"
                onClick={() => setIsPreviewModalOpen(true)}
              >
                <i className="fas fa-eye"></i> Preview
              </button>
              <button className="btn btn-primary" onClick={saveForm}>
                <i className="fas fa-save"></i> Pulish
              </button>
            </div>
          </div>

          <div className="properties-panel">
            <h3>Field Properties</h3>
            {currentField ? (
              <div>
                <div className="property-group">
                  <label>Question</label>
                  <input
                    type="text"
                    value={currentField.label}
                    onChange={(e) =>
                      updateFieldProperty(
                        currentField.id,
                        "label",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="property-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={currentField.required}
                      onChange={(e) =>
                        updateFieldProperty(
                          currentField.id,
                          "required",
                          e.target.checked
                        )
                      }
                    />
                    Required
                  </label>
                </div>

                {(currentField.type === "radio" ||
                  currentField.type === "checkbox" ||
                  currentField.type === "dropdown") && (
                  <div className="property-group">
                    <label>Options</label>
                    {currentField.options.map((option, index) => (
                      <div key={index} className="option-input">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            updateOption(currentField.id, index, e.target.value)
                          }
                        />
                        <button
                          className="btn-remove-option"
                          onClick={() =>
                            removeOptionFromField(currentField.id, index)
                          }
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                    <button
                      className="btn-add-option"
                      onClick={() => addOptionToField(currentField.id)}
                    >
                      <i className="fas fa-plus"></i> Add Option
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p>Select a field to edit its properties</p>
            )}
          </div>
        </div>

        {/* Preview Modal */}
        {isPreviewModalOpen && (
          <div className="modal" style={{ display: "flex" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h2>Form Preview</h2>
                <span
                  className="close"
                  onClick={() => setIsPreviewModalOpen(false)}
                >
                  <i className="fas fa-times"></i>
                </span>
              </div>
              <div className="modal-body">
                <div className="form-container">
                  <div className="form-header">
                    <h2 className="form-title">{formData.title}</h2>
                    <p className="form-description">{formData.description}</p>
                  </div>

                  {formData.fields.map((field) => (
                    <div key={field.id} className="form-field">
                      <label>
                        {field.label}{" "}
                        {field.required && <span className="required">*</span>}
                      </label>

                      {field.type === "text" && (
                        <input type="text" placeholder="Your answer" />
                      )}

                      {field.type === "textarea" && (
                        <textarea placeholder="Your answer"></textarea>
                      )}

                      {field.type === "email" && (
                        <input type="email" placeholder="email@example.com" />
                      )}

                      {field.type === "number" && (
                        <input type="number" placeholder="Enter a number" />
                      )}

                      {field.type === "date" && <input type="date" />}

                      {field.type === "radio" && (
                        <div>
                          {field.options.map((option, index) => (
                            <div key={index} className="option">
                              <input
                                type="radio"
                                name={field.id}
                                value={option}
                              />
                              <label>{option}</label>
                            </div>
                          ))}
                        </div>
                      )}

                      {field.type === "checkbox" && (
                        <div>
                          {field.options.map((option, index) => (
                            <div key={index} className="option">
                              <input
                                type="checkbox"
                                name={field.id}
                                value={option}
                              />
                              <label>{option}</label>
                            </div>
                          ))}
                        </div>
                      )}

                      {field.type === "dropdown" && (
                        <select>
                          <option value="">Select an option</option>
                          {field.options.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}

                  <button className="submit-btn">Submit</button>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsPreviewModalOpen(false)}
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}

        {isLinkModalOpen && (
          <div className="modal" style={{ display: "flex" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h2>Form Created Successfully!</h2>
                <span className="close" onClick={() => setIsLinkModalOpen(false)}>
                  <i className="fas fa-times"></i>
                </span>
              </div>
              <div className="modal-body">
                <p>
                  Your form has been created and is now ready to collect
                  responses.
                </p>
                <p>Share this link with others:</p>
                <div className="link-container">
                  <input
                    type="text"
                    id="shareable-link"
                    value={savedFormId ? `${window.location.origin}/pages/form/${savedFormId}` : ""}
                    readOnly
                  />
                  <button
                    className="btn btn-primary"
                    id="copy-link"
                      onClick={() => {
                        if (savedFormId) {
                          navigator.clipboard.writeText(
                            `${window.location.origin}/pages/form/${savedFormId}`
                          );
                          alert("Link copied to clipboard!");
                        }
                      }}
                  >
                    <i className="fas fa-copy"></i> Copy
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => setIsLinkModalOpen(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
