
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer(){
  return (
    <footer style={{ textAlign: "center", padding: "20px", backgroundColor: "#1C1C1C", color: "#EAEAEA" }}>
      <p>Connect with me:</p>
      <div style={{ fontSize: "1.5rem", display: "flex", justifyContent: "center", gap: "15px" }}>
        <a href="https://www.youtube.com/@ewa_edun" target="_blank" rel="noopener noreferrer" style={{ color: "#FF0000" }}>
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        <a href="https://www.linkedin.com/in/oluwadamilola-edun/" target="_blank" rel="noopener noreferrer" style={{ color: "#0077B5" }}>
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="https://github.com/ewa-edun" target="_blank" rel="noopener noreferrer" style={{ color: "#FFFFFF" }}>
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
      <p>&copy; 2025 WWYRD. All rights reserved.</p>
    </footer>
  );
}

export default Footer