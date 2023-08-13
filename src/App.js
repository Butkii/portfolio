import React from 'react';
import colors from './styles/colors';
import Header from './components/Header';
import Hero from './components/Hero';
// import About from './components/About';
// import Projects from './components/Projects';
// import Resume from './components/Resume';
// import Contact from './components/Contact';
// import SocialLinks from './components/SocialLinks';

function App() {
  return (
    <div className={`bg-${colors.primary} text-black`}>
      {/* <div className="text-3xl font-bold underline">Hello</div> */}
      <Header />
      <div className="container mx-auto p-4">
        <Hero />
        {/* <About />
        <Projects />
        <Resume />
        <Contact />
        <SocialLinks /> */}
      </div> 
    </div>
  );
}

export default App;

