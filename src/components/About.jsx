import { about } from '../data.js';
import { Reveal } from './motion.jsx';

export default function About() {
  return (
    <section id="about" className="container about" aria-labelledby="about-title">
      <Reveal as="h2" id="about-title" className="section-title">
        About
      </Reveal>
      <Reveal className="about-body" delay={0.08}>
        {about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Reveal>
    </section>
  );
}
