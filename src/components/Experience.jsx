import { experience } from '../data.js';
import { Reveal } from './motion.jsx';

export default function Experience() {
  return (
    <section id="experience" className="container section" aria-labelledby="experience-title">
      <Reveal as="h2" id="experience-title" className="section-title">
        Experience
      </Reveal>
      <div className="xp-list">
        {experience.map((entry) => (
          <Reveal as="article" key={entry.org} className="xp">
            <div>
              <h3 className="xp-org">{entry.org}</h3>
              <p className="xp-meta">
                {entry.role}
                <br />
                {entry.period}
              </p>
            </div>
            <p className="xp-description">{entry.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
