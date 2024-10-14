import React from "react";
function Footer() {
  const styles = {
    footerContainer: {
      backgroundColor: "#f3f3f3",
      padding: "1.5rem 0",
      textAlign: "center",
      borderTop: "1px solid #e7e7e7",
    },
    footerLinks: {
      margin: "0 1rem",
      color: "#0066c0",
      textDecoration: "none",
    },
    footerText: {
      color: "#555",
      fontSize: "0.875rem",
    },
  };

  return (
    <footer style={styles.footerContainer} className="mt-5">
      <div className="container">
        <a href="/conditions-of-use" style={styles.footerLinks}>
          Conditions of Use
        </a>
        <a href="/privacy-notice" style={styles.footerLinks}>
          Privacy Notice
        </a>
        <a href="/help" style={styles.footerLinks}>
          Help
        </a>
      </div>
      <div style={styles.footerText} className="mt-3">
        © 2024-2025, Raibs.com, Inc. or its affiliates
      </div>
    </footer>
  );
}

export default Footer;
