import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import ParticleCanvas from './components/ParticleCanvas.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Projects from './sections/Projects.jsx';
import Skills from './sections/Skills.jsx';
import Experience from './sections/Experience.jsx';
import GithubFeed from './sections/GithubFeed.jsx';
import Contact from './sections/Contact.jsx';

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <GithubFeed />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <>
      <ParticleCanvas />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}
