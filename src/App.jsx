import { MotionConfig, motion, useScroll, useSpring } from 'motion/react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import { profile } from './data.js';

// A thin yellow bar along the top edge that fills as the page scrolls.
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });
  return <motion.div className="scroll-progress" aria-hidden="true" style={{ scaleX }} />;
}

export default function App() {
  return (
    // reducedMotion="user" swaps movement for simple fades when the visitor
    // has asked their device to reduce motion.
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <Nav />
      <Hero />
      <main id="main">
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>{profile.location}</span>
        </div>
      </footer>
    </MotionConfig>
  );
}
