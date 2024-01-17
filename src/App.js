import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Contact from './pages/Contact';
import { useMode } from './ModeContext';
import { Helmet } from 'react-helmet';
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
        <meta name="image" content="bhakti.jpeg" />
      </Helmet>
      
      <div className={`min-h-screen ${mode === 'light' ? 'bg-light-background' : 'bg-dark-background'} text-black`}>
        <Router>
          <header className="sticky top-0 z-50">
            <Header />
          </header>
          <div className='md:hidden h-20'></div>
          <div id="home">
            <Home/>
          </div>
          <div className='md:hidden h-52'></div>
          <div id="about">
            <About />
          </div>
          <div id="projects">
            <Projects />
          </div>
          <div id="contact">
            <Contact />
          </div>
          <footer className="sticky top-0 z-50">
            <Footer />
          </footer>
          <Routes>
            <Route exact path="/#home" element={<Home />} />
            <Route exact path="/#about" element={<About />} />
            <Route exact path="/#projects" element={<Projects />} />
            <Route exact path="/#contact" element={<Contact/>} />
          </Routes>
        </Router>
      </div>
    </>
    
  );
}

export default App;

