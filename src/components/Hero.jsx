import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { about, profile } from '../data.js';
import portrait from '../assets/portrait-2.jpg';
import { Pressable, SPRING } from './motion.jsx';
import Skyline from './Skyline.jsx';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.985, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { ...SPRING, duration: 0.9 } },
};

export default function Hero() {
  const heroRef = useRef(null);

  // Progress runs from 0 (hero at the top) to 1 (hero has left the screen).
  // The city fades and eases forward as it goes; distant buildings drift more
  // than near ones. Every layer extends below the ground line, so the drift
  // never opens a gap. Reduced motion keeps only the fade.
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const cityOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const cityScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.06]);
  const farY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 90]);
  const midY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 40]);
  const glowY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140]);

  return (
    <header id="top" className="hero" ref={heroRef}>
      <motion.div className="hero-city" aria-hidden="true" style={{ opacity: cityOpacity, scale: cityScale }}>
        <motion.div className="hero-glow" style={{ y: glowY }} />
        <Skyline farY={farY} midY={midY} />
      </motion.div>
      <div className="hero-fade" aria-hidden="true" />

      <motion.div className="container hero-inner" variants={container} initial="hidden" animate="show">
        <motion.div className="portrait" variants={item}>
          <div className="portrait-photo">
            <img src={portrait} alt={profile.portraitAlt} width="960" height="1280" fetchPriority="high" />
          </div>
        </motion.div>
        <motion.p className="hero-role" variants={item}>
          {profile.role}
        </motion.p>
        <motion.h1 className="hero-name" variants={item}>
          {profile.name}
        </motion.h1>
        <motion.div id="about" className="hero-about" variants={item}>
          <h2 className="visually-hidden">About</h2>
          {about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </motion.div>
        <motion.div className="hero-actions" variants={item}>
          <Pressable className="btn btn-primary" href={profile.cv} download magnetic>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" />
            </svg>
            Download CV
          </Pressable>
          <Pressable className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer" magnetic>
            GitHub
          </Pressable>
          <Pressable className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer" magnetic>
            LinkedIn
          </Pressable>
          <Pressable className="btn btn-ghost" href={`mailto:${profile.email}`} magnetic>
            Email
          </Pressable>
        </motion.div>
      </motion.div>
    </header>
  );
}
