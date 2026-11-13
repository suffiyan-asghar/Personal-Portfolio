import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { navLinks, profile } from '../data.js';
import { Pressable, SPRING, SPRING_SNAPPY } from './motion.jsx';

// Tracks which section is under the middle of the screen.
function useActiveSection(ids) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((section) => observer.observe(section));

    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.4) setActive('');
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [ids]);

  return active;
}

const sectionIds = [...navLinks.map((link) => link.id), 'contact'];

export default function Nav() {
  const active = useActiveSection(sectionIds);

  return (
    <div className="nav-wrap">
      <motion.nav
        className="nav"
        aria-label="Primary"
        initial={{ opacity: 0, y: -16, scale: 0.96, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ ...SPRING, delay: 0.3 }}
      >
        <a className="nav-brand" href="#top">
          {profile.shortName}
        </a>
        {navLinks.map((link) => (
          <a key={link.id} className="nav-link" href={`#${link.id}`} aria-current={active === link.id ? 'true' : undefined}>
            {active === link.id && <motion.span className="nav-pill" layoutId="nav-pill" transition={SPRING_SNAPPY} />}
            <span>{link.label}</span>
          </a>
        ))}
        <Pressable className="nav-cta" href="#contact">
          Contact
        </Pressable>
      </motion.nav>
    </div>
  );
}
