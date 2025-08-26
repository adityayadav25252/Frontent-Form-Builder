export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-info">
            <h3>FormBuilder Pro</h3>
            <p>Create beautiful forms and collect responses effortlessly.</p>
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link">About</a>
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
          <div className="footer-creator">
            <p>Created by <strong>Satyajit Sethy</strong></p>
            <a href="https://github.com/sethysatyajit" target="_blank" className="github-link">
              <i className="fab fa-github"></i> GitHub
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Satyajit Sethy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}