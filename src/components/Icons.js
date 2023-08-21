import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHtml5,
  faCss3,
  faJs,
  faReact,
  faNodeJs,
  faNode,
  faLinux,
  faAws,
  faGoogle,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'; // Import your CSS file for styling

const AboutMeIcons = () => {
  const icons = [
    faHtml5,
    faCss3,
    faJs,
    faReact,
    faNodeJs,
    faNode,
    faLinux,
    faAws,
    faGoogle,
    faGithub,
  ];

  return (
    <div className="icon-container">
      {icons.map((icon, index) => (
        <FontAwesomeIcon key={index} icon={icon} className="icon" />
      ))}
    </div>
  );
};

export default AboutMeIcons;
