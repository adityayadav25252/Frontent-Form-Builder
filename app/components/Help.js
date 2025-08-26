export default function Help() {
  return (
    <div className="container">
      <div className="builder-header animate-slideInDown">
        <h1>Help & Documentation</h1>
        <p>Learn how to create effective forms with our guide</p>
      </div>

      <div className="help-content animate-fadeIn">
        <h2>Getting Started with FormBuilder</h2>
        <p>FormBuilder allows you to create beautiful, responsive forms to collect data from your users. Follow these steps to create your first form:</p>
        
        <div className="help-sections">
          <div className="help-section">
            <h2><i className="fas fa-plus-circle"></i> Adding Fields</h2>
            <p>Drag and drop fields from the left panel to your form. You can add text inputs, checkboxes, radio buttons, and more.</p>
          </div>
          
          <div className="help-section">
            <h2><i className="fas fa-edit"></i> Customizing Fields</h2>
            <p>Click on any field to edit its properties. You can change the label, set it as required, or add options for choice fields.</p>
          </div>
          
          <div className="help-section">
            <h2><i className="fas fa-eye"></i> Previewing Your Form</h2>
            <p>Use the preview button to see how your form will look to respondents before publishing it.</p>
          </div>
          
          <div className="help-section">
            <h2><i className="fas fa-share-alt"></i> Sharing Your Form</h2>
            <p>After saving your form, you'll get a unique link that you can share with anyone to start collecting responses.</p>
          </div>
          
          <div className="help-section">
            <h2><i className="fas fa-chart-bar"></i> Viewing Responses</h2>
            <p>All responses are collected in your dashboard where you can view, analyze, and export the data.</p>
          </div>
          
          <div className="help-section">
            <h2><i className="fas fa-question-circle"></i> Getting Help</h2>
            <p>If you need additional assistance, check out our FAQ section or contact our support team.</p>
          </div>
        </div>
        
        <div style={{marginTop: '2rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px'}}>
          <h3>Need more help?</h3>
          <p>Contact our support team at <a href="mailto:support@formbuilder.com">support@formbuilder.com</a> or check out our comprehensive documentation.</p>
          <button className="btn btn-primary" style={{marginTop: '1rem'}}>
            <i className="fas fa-book"></i> View Full Documentation
          </button>
        </div>
      </div>
    </div>
  );
}