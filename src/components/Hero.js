import React from 'react';
import { Link } from 'react-router-dom';
import { useMode } from '../ModeContext';

function Hero() {
  const { mode } = useMode();

  return (
    <div className={`flex lg:flex-row justify-between items-center flex-col lg:px-20 lg:py-10 py-5 lg:mr-20 mr-10 lg:mb-8 mb-0 lg:ml-4 ml-2 ${mode === 'light' ? 'bg-light-background' : 'bg-dark-background'}`}>
      <div className={`sm:text-center md:text-left ${mode === 'light' ? 'text-light-primary' : 'text-dark-primary'} lg:p-10 p-5 lg:mr-20 mr-10 lg:mb-8 mb-0 ml-4`}>
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
          Find out more <Link to="/about" className={`${mode === 'light' ? 'text-light-secondary' : 'text-dark-secondary'}`}> about me </Link> or <Link to="/contact" className={`${mode === 'light' ? 'text-light-secondary' : 'text-dark-secondary'}`}>get in touch</Link>.
        </h4>
      </div>
      <div className="flex-shrink-0 ml-10 mt-0 flex items-center justify-center">
        <img
          src={`heroimg-${mode === 'light' ? 'light' : 'dark'}.svg`}
          alt="Developer"
          className="hero-image"
        />
      </div>
    </div>
  );
}

export default Hero;
