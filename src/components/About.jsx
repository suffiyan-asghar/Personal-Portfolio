import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { about } from '../data.js';
import { media } from '../media.js';
import { Placeholder, Reveal, SectionHeading } from './motion.jsx';

// A candid photo that drifts slightly against the scroll and takes on a
// yellow duotone on hover. Reduced motion: no drift.
function Photo({ photo, index }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const range = index % 2 === 0 ? 24 : 40;
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [range, -range]);
  const src = media(photo.src);

  return (
    <motion.figure ref={ref} className={`about-photo about-photo-${index}`} style={{ y }}>
      {src ? (
        <>
          <img src={src} alt={photo.alt} width="800" height="1000" loading="lazy" decoding="async" />
          <img className="duotone" src={src} alt="" aria-hidden="true" width="800" height="1000" loading="lazy" decoding="async" />
          <span className="duotone-tint" aria-hidden="true" />
        </>
      ) : (
        <Placeholder path={photo.src} label={photo.alt} />
      )}
    </motion.figure>
  );
}

export default function About() {
  const photos = about.photos.slice(0, 2);
  return (
    <section id="about" className="container about" aria-labelledby="about-title">
      <SectionHeading id="about-title" index={1} label="About">
        About
      </SectionHeading>
      <div className={`about-grid ${photos.length ? '' : 'no-photos'}`}>
        <Reveal className="about-body" delay={0.08}>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
        {photos.length > 0 && (
          <Reveal className={`about-photos count-${photos.length}`} delay={0.14}>
            {photos.map((photo, index) => (
              <Photo key={photo.src} photo={photo} index={index} />
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
