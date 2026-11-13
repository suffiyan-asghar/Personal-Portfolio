import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { experience } from '../data.js';
import { media } from '../media.js';
import { Reveal, SectionHeading, SPRING_SNAPPY } from './motion.jsx';

// Greyscale by default, white on hover. Two stacked copies crossfade so only
// opacity animates. If the logo file doesn't exist, nothing is shown.
function Logo({ path, alt, small = false }) {
  const src = media(path);
  if (!src) return null;
  const size = small ? 28 : 44;
  return (
    <span className={`logo ${small ? 'logo-sm' : ''}`}>
      <img className="logo-base" src={src} alt={alt} width={size} height={size} loading="lazy" decoding="async" />
      <img className="logo-hover" src={src} alt="" aria-hidden="true" width={size} height={size} loading="lazy" decoding="async" />
    </span>
  );
}

export default function Experience() {
  const listRef = useRef(null);
  const reduce = useReducedMotion();
  // The line draws itself as the list scrolls through the middle of the screen.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] });
  const drawn = useSpring(scrollYProgress, { stiffness: 220, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" className="container section" aria-labelledby="experience-title">
      <SectionHeading id="experience-title" index={3} label="Experience">
        Experience
      </SectionHeading>
      <div className="xp-list" ref={listRef}>
        <span className="xp-rail" aria-hidden="true" />
        <motion.span className="xp-line" aria-hidden="true" style={{ scaleY: reduce ? 1 : drawn }} />
        {experience.map((entry) => (
          <Reveal as="article" key={entry.org} className="xp">
            <motion.span
              className="xp-dot"
              aria-hidden="true"
              initial={{ scale: 0.4, opacity: 0.4 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ margin: '0px 0px -45% 0px' }}
              transition={SPRING_SNAPPY}
            />
            <div className="xp-head">
              <div className="xp-title">
                <Logo path={entry.logo} alt={entry.logoAlt} />
                <h3 className="xp-org">{entry.org}</h3>
              </div>
              <p className="xp-meta">
                {entry.role}
                <br />
                {entry.period}
              </p>
            </div>
            <div className="xp-body">
              <p className="xp-description">{entry.description}</p>
              {/* Affiliations show only once their logo file has been added. */}
              {entry.affiliations?.some((item) => media(item.logo)) && (
                <ul className="xp-affiliations">
                  {entry.affiliations
                    .filter((item) => media(item.logo))
                    .map((item) => (
                      <li key={item.name}>
                        <Logo path={item.logo} alt={item.logoAlt} small />
                        <span>{item.name}</span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
