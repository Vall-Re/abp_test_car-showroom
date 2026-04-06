export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <p className="footer-copyright">&copy; 2026 CAR SHOWROOM</p>
          <p className="footer-note">Test task for a vacancy Junior/Trainee Frontend Developer</p>
        </div>
        <div className="footer-links">
          <a 
            className="footer-link" 
            href="https://github.com/Vall-Re" 
            target="_blank" 
            rel="noreferrer"
          >
            GitHub
          </a>
          <a 
            className="footer-link" 
            href="mailto:svitlana.chepa0@gmail.com"
          >
            Contact me
          </a>
        </div>
      </div>
    </footer>
  );
}