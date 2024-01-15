import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { useMode } from '../ModeContext';

function ContactMe() {
  const { mode } = useMode();
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
    <div className={`contact-container ${mode === 'light' ? 'bg-light-background' : 'bg-dark-background'}`}>
      <div className="lg:px-60 px-10 lg:mx-10 lg:pt-4 md:text-center">
        <h5 className={`mb-6 font-semibold ${mode === 'light' ? 'text-light-primary' : 'text-dark-primary'}`}>
          I'm always available to chat. Feel free to send me an email!
        </h5>
        <button
          className={`bg-${mode === 'light' ? 'light' : 'dark'}-accent text-${mode === 'light' ? 'light' : 'dark'}-secondary text-lg px-4 py-2 rounded-lg font-semibold`}
          onClick={handleEmailButtonClick}
        >
          <FaEnvelope className="text-center" />
          Email Me
        </button>
        {copySuccess && <p className={`${mode === 'light' ? 'text-light-secondary' : 'text-dark-secondary'} mt-2`}>Email address copied to clipboard!</p>}
      </div>
    </div>
  );
}

export default ContactMe;
