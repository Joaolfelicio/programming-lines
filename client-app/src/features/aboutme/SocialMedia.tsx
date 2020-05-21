import React from "react";
import "./styles/socialMediaStyle.css"

const SocialMedia = () => {
  return (
    <div className="social-media">
      <a
        href="https://github.com/Joaolfelicio"
        className="icon-button github"
        rel="noopener noreferrer"
        target="_blank"
        title="/joaolfelicio"
      >
        <i className="fab fa-github"></i>
      </a>

      <a
        href="https://www.linkedin.com/in/joaolfelicio/"
        className="icon-button linkedin"
        rel="noopener noreferrer"
        target="_blank"
        title="/joaolfelicio"
      >
        <i className="fab fa-linkedin-in"></i>
      </a>

      <a
        href="mailto:joaolfelicio@gmail.com"
        className="icon-button mail"
        rel="noopener noreferrer"
        target="_blank"
        title="joaolfelicio@gmail.com"
      >
        <i className="fas fa-envelope"></i>
      </a>
    </div>
  );
};

export default SocialMedia;
