import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';

function ContactMe() {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleEmailButtonClick = () => {
    const email = 'youremail@example.com';
    const subject = encodeURIComponent('Let\'s Chat');
    const body = encodeURIComponent('Hello! I\'d love to have a conversation with you.');

    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopySuccess(true);
    } else {
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }
  };

  return (
    <div className="contact-container">
      <div className="text-container">
        <h5 className="mb-6 font-semibold">I'm always available to chat. Feel free to send me an email!</h5>
        <button
          className="bg-light-accent text-light-secondary text-lg px-4 py-2 rounded-lg font-semibold"
          onClick={handleEmailButtonClick}
        >
          <FaEnvelope className="text-center" />
          Email Me
        </button>
        {copySuccess && <p className="text-light-secondary mt-2">Email address copied to clipboard!</p>}
      </div>
    </div>
  );
}

export default ContactMe;
