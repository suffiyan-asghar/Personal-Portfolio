import { projects } from '../data.js';
import { Chevron, Reveal, Tile } from './motion.jsx';

export default function Projects() {
  return (
    <section id="work" className="container section" aria-labelledby="work-title">
      <Reveal as="h2" id="work-title" className="section-title">
        Projects
      </Reveal>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <Tile as="article" key={project.title} className="project" delay={index * 0.08}>
            <p className="project-category">{project.category}</p>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-foot">
              <ul className="stack" aria-label="Built with">
                {project.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <div className="project-links">
                {project.repo && (
                  <a className="text-link" href={project.repo} target="_blank" rel="noreferrer">
                    View code
                    <Chevron />
                  </a>
                )}
                {project.live && (
                  <a className="text-link" href={project.live} target="_blank" rel="noreferrer">
                    Live demo
                    <Chevron />
                  </a>
                )}
              </div>
            </div>
          </Tile>
        ))}
      </div>
    </section>
  );
}
