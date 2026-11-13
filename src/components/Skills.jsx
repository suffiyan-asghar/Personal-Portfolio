import { certifications, skills } from '../data.js';
import { hasIcon, TechIcon } from '../icons.jsx';
import { Reveal, SectionHeading, Tile } from './motion.jsx';

// Each row holds three copies of its list so the loop never shows a gap.
// Only the first copy is announced to screen readers.
function Lane({ label, items, reverse }) {
  return (
    <div className="lane-group">
      <h3 className="lane-label">{label}</h3>
      <div className="lane">
        <ul className={`track ${reverse ? 'reverse' : ''}`}>
          {[0, 1, 2].map((copy) =>
            items.map((item) => (
              <li key={`${copy}-${item.name}`} aria-hidden={copy > 0 ? 'true' : undefined}>
                <TechIcon name={item.icon} />
                {item.name}
              </li>
            )),
          )}
        </ul>
      </div>
    </div>
  );
}

function Award() {
  return (
    <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="6" />
      <path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" />
    </svg>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="container section" aria-labelledby="skills-title">
      <SectionHeading id="skills-title" index={3} label="Skills">
        Skills
      </SectionHeading>

      <Reveal className="lanes">
        {skills.map((group, index) => (
          <Lane key={group.label} label={group.label} items={group.items} reverse={index % 2 === 1} />
        ))}
      </Reveal>

      <div className="certs">
        <Reveal className="certs-head">
          <h3>Certifications</h3>
          <p>Issued by {certifications.issuer}</p>
        </Reveal>
        <ul className="certs-grid">
          {certifications.items.map((item, index) => (
            <li key={item.name} className="cert-item">
              <Tile as="a" className="cert" delay={index * 0.06} href={item.url} target="_blank" rel="noreferrer">
                <span className="cert-marks">
                  {hasIcon(item.icon) ? <TechIcon name={item.icon} size={28} /> : <Award />}
                  <span className="cert-issuer" title={`Issued by ${certifications.issuer}`}>
                    <TechIcon name="datacamp" size={18} />
                  </span>
                </span>
                <span className="cert-name">
                  {item.name}
                  <span className="visually-hidden"> certificate (opens in a new tab)</span>
                </span>
              </Tile>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
