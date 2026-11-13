import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { projects } from '../data.js';
import { media } from '../media.js';
import { Chevron, Placeholder, Reveal, SectionHeading, SPRING, SPRING_SNAPPY } from './motion.jsx';
import ProjectDetail from './ProjectDetail.jsx';

// The screenshot sits slightly dimmed and brightens while the card is hovered
// or focused. A project video, if there is one, plays muted while hovered
// (never with reduced motion).
function ProjectMedia({ project, mediaRef, videoRef, hovered, focused, playing, setPlaying, reduce }) {
  const image = project.images?.[0];
  const src = media(image?.src);
  const videoSrc = reduce ? null : media(project.video);

  return (
    <div className="project-media" ref={mediaRef}>
      {src ? (
        <img src={src} alt={image.alt} width="1600" height="1000" loading="lazy" decoding="async" />
      ) : (
        <Placeholder path={image?.src} label={image?.alt ?? `${project.title} screenshot`} />
      )}
      {videoSrc && (
        <motion.video
          ref={videoRef}
          className="project-video"
          src={videoSrc}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          initial={false}
          animate={{ opacity: playing ? 1 : 0 }}
          transition={SPRING_SNAPPY}
        />
      )}
      <motion.span className="media-shade" aria-hidden="true" initial={false} animate={{ opacity: hovered || focused ? 0 : 1 }} transition={SPRING_SNAPPY} />
    </div>
  );
}

function ProjectCard({ project, index, onOpen, triggerRef }) {
  const mediaRef = useRef(null);
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();

  const onPointerEnter = (event) => {
    if (event.pointerType !== 'mouse') return;
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const onPointerLeave = () => {
    setHovered(false);
    setPlaying(false);
    videoRef.current?.pause();
  };

  return (
    <Reveal delay={index * 0.08} className="project-cell">
      <motion.article
        layoutId={`project-${project.slug}`}
        className="tile project"
        style={{ borderRadius: 28 }}
        transition={SPRING}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onFocus={() => setFocused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
        }}
      >
        <ProjectMedia
          project={project}
          mediaRef={mediaRef}
          videoRef={videoRef}
          hovered={hovered}
          focused={focused}
          playing={playing}
          setPlaying={setPlaying}
          reduce={reduce}
        />
        <div className="project-body">
          <p className="project-category">{project.category}</p>
          <h3 className="project-title">
            {/* The button stretches over the whole card, so a click anywhere opens it. */}
            <button ref={triggerRef} type="button" className="project-open" onClick={() => onOpen(project.slug)} aria-haspopup="dialog">
              {project.title}
            </button>
          </h3>
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
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Projects() {
  const [openSlug, setOpenSlug] = useState(null);
  const triggers = useRef({});
  const lastOpened = useRef(null);
  const openProject = projects.find((project) => project.slug === openSlug);

  // While the overlay is open: lock page scroll, make the page behind it inert,
  // and on close hand focus back to the card that opened it.
  useEffect(() => {
    const root = document.getElementById('root');
    const { body, documentElement } = document;
    if (!openSlug) return undefined;

    const gap = window.innerWidth - documentElement.clientWidth;
    const previous = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    if (root) root.inert = true;

    return () => {
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
      if (root) root.inert = false;
      triggers.current[lastOpened.current]?.focus({ preventScroll: true });
    };
  }, [openSlug]);

  const open = useCallback((slug) => {
    lastOpened.current = slug;
    setOpenSlug(slug);
  }, []);
  const close = useCallback(() => setOpenSlug(null), []);

  return (
    <section id="work" className="container section" aria-labelledby="work-title">
      <SectionHeading id="work-title" index={1} label="Projects">
        Projects
      </SectionHeading>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            onOpen={open}
            triggerRef={(el) => {
              triggers.current[project.slug] = el;
            }}
          />
        ))}
      </div>
      <AnimatePresence>{openProject && <ProjectDetail key={openProject.slug} project={openProject} onClose={close} />}</AnimatePresence>
    </section>
  );
}
