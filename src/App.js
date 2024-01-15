import React from 'react';
import Header from './components/Header';
// import Hero from './components/Hero';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Contact from './pages/Contact';
import { useMode } from './ModeContext';
// import About from './components/About';
// import Projects from './components/Projects';
// import Resume from './components/Resume';
// import Contact from './components/Contact';
// import SocialLinks from './components/SocialLinks';

function App() {
  const { mode } = useMode();
  return (
    <>
      <Helmet>
        <title>Bhakti Ghaghda</title>
        <meta name="description" content="Bhakti Ghaghda is a software engineer with a double major in Computer Science and Business Information Systems" />
        <meta name="type" content="website" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          ></meta>
      </Helmet>
      <div className={`min-h-screen ${mode === 'light' ? 'bg-light-background' : 'bg-dark-background'} text-black`}>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/projects" element={<Projects />} />
            <Route exact path="/contact" element={<Contact/>} />
          </Routes>
        </Router>
      </div>
    </>
    
  );
}

export default App;

