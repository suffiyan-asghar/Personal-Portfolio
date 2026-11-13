import { useRef } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react';
import { profile } from '../data.js';
import portrait from '../assets/portrait.jpg';
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
  const nameRef = useRef(null);
  const cityRef = useRef(null);
  const started = useRef(false);
  // Where the name and the city sit inside the hero, so one pointer position
  // can drive all three light effects.
  const offsets = useRef({ name: [0, 0], city: [0, 0] });

  // The searchlight follows the pointer through a spring, so it glides.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lightX = useSpring(x, { stiffness: 220, damping: 30 });
  const lightY = useSpring(y, { stiffness: 220, damping: 30 });

  const paint = () => {
    const hero = heroRef.current;
    if (!hero || !started.current) return;
    const px = lightX.get();
    const py = lightY.get();
    hero.style.setProperty('--px', `${px}px`);
    hero.style.setProperty('--py', `${py}px`);
    const { name, city } = offsets.current;
    nameRef.current?.style.setProperty('--mx', `${px - name[0]}px`);
    nameRef.current?.style.setProperty('--my', `${py - name[1]}px`);
    cityRef.current?.style.setProperty('--cx', `${px - city[0]}px`);
    cityRef.current?.style.setProperty('--cy', `${py - city[1]}px`);
  };

  useMotionValueEvent(lightX, 'change', paint);
  useMotionValueEvent(lightY, 'change', paint);

  const onPointerMove = (event) => {
    const hero = heroRef.current;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const offsetOf = (el) => {
      if (!el) return [0, 0];
      const r = el.getBoundingClientRect();
      return [r.left - rect.left, r.top - rect.top];
    };
    offsets.current = { name: offsetOf(nameRef.current), city: offsetOf(cityRef.current) };

    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    if (!started.current) {
      // First contact: start the light where the pointer is, not at 0,0.
      started.current = true;
      lightX.jump(px);
      lightY.jump(py);
      x.jump(px);
      y.jump(py);
      paint();
    } else {
      x.set(px);
      y.set(py);
    }
  };

  // Distant buildings drift more than near ones as the page scrolls.
  const { scrollY } = useScroll();
  const farY = useTransform(scrollY, [0, 900], [0, 70]);
  const midY = useTransform(scrollY, [0, 900], [0, 30]);
  const glowY = useTransform(scrollY, [0, 900], [0, 120]);

  return (
    <header id="top" className="hero" ref={heroRef} onPointerMove={onPointerMove}>
      <motion.div className="hero-glow" aria-hidden="true" style={{ y: glowY }} />
      <Skyline farY={farY} midY={midY} />
      <Skyline lit farY={farY} midY={midY} innerRef={cityRef} />
      <div className="hero-pool" aria-hidden="true" />

      <motion.div className="container hero-inner" variants={container} initial="hidden" animate="show">
        <motion.div className="portrait" variants={item}>
          <img src={portrait} alt={`Portrait of ${profile.name}`} width="800" height="800" />
        </motion.div>
        <motion.p className="hero-role" variants={item}>
          {profile.role}
        </motion.p>
        <motion.h1 className="hero-name" ref={nameRef} variants={item}>
          {profile.name}
        </motion.h1>
        <motion.p className="hero-intro" variants={item}>
          {profile.intro}
        </motion.p>
        <motion.div className="hero-actions" variants={item}>
          <Pressable className="btn btn-primary" href={profile.cv} download>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" />
            </svg>
            Download CV
          </Pressable>
          <Pressable className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </Pressable>
          <Pressable className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </Pressable>
          <Pressable className="btn btn-ghost" href={`mailto:${profile.email}`}>
            Email
          </Pressable>
        </motion.div>
      </motion.div>
    </header>
  );
}
