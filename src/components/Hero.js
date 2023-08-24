import React from 'react';

function Hero() {
  return (
    <div className="flex flex-row justify-between items-center px-20 py-10 mr-20 md:mr-10 mb-8 md:mb-0 ml-4">
      <div className="text-left text-light-primary p-10 mr-20 md:mr-10 mb-8 md:mb-0 ml-4 md:ml-0">
        <h3 className="font-semibold font-heading mb-2">
          Hi there 👋 I'm
        </h3>
        <h1 className="font-bold font-heading mb-4">
          Bhakti Ghaghda
        </h1>
        <h4 className="font-accent mb-6">
          Software developer with a love for coding, creativity, <br /> and making a positive impact.
        </h4>
        <h4 className="font-accent">
          Find out more <a href="#about" className="text-light-secondary"> about me </a> or <a href="#contact" className="text-light-secondary">get in touch</a>.
        </h4>
        
      </div>
      <div className="flex-shrink-0 md:ml-10 mt-0 flex items-center justify-center md:justify-start">
        <img src="hero.svg" alt="Developer" className="hero-image" />
      </div>
    </div>
  );
}

export default Hero;
