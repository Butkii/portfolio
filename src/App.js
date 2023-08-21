import React from 'react';
import colors from './styles/colors';
import Header from './components/Header';
import Hero from './components/Hero';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
// import About from './components/About';
// import Projects from './components/Projects';
// import Resume from './components/Resume';
// import Contact from './components/Contact';
// import SocialLinks from './components/SocialLinks';

function App() {
  return (
    <div className={`bg-${colors.primary} text-black`}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/projects" element={<Projects />} />
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;

