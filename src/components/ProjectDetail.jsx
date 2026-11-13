import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { media } from '../media.js';
import { Chevron, Placeholder, SPRING, SPRING_SNAPPY } from './motion.jsx';
import RagDiagram from './RagDiagram.jsx';

const diagrams = { rag: RagDiagram };

const slide = {
  enter: (dir) => ({ x: dir >= 0 ? '8%' : '-8%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir >= 0 ? '-8%' : '8%', opacity: 0 }),
};

// Screenshots with arrows, dots, arrow keys and swipe.
function Gallery({ images, title }) {
  const [[index, dir], setState] = useState([0, 0]);
  const count = images.length;
  if (!count) return null;

  const go = (step) => setState(([i]) => [(i + step + count) % count, step]);
  const show = (target) => setState(([i]) => [target, target >= i ? 1 : -1]);
  const image = images[index];
  const src = media(image.src);

  const onKeyDown = (event) => {
    if (count < 2) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    }
  };

  const onDragEnd = (_, info) => {
    if (info.offset.x < -60 || info.velocity.x < -500) go(1);
    else if (info.offset.x > 60 || info.velocity.x > 500) go(-1);
  };

  return (
    <section className="gallery" aria-roledescription="carousel" aria-label={`${title} screenshots`} onKeyDown={onKeyDown}>
      <div className="gallery-stage">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={index}
            className="gallery-slide"
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={SPRING_SNAPPY}
            drag={count > 1 ? 'x' : false}
            dragSnapToOrigin
            dragElastic={0.25}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
          >
            {src ? (
              <img src={src} alt={image.alt} width="1600" height="1000" draggable={false} decoding="async" />
            ) : (
              <Placeholder path={image.src} label={image.alt} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <div className="gallery-controls">
          <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label="Previous screenshot">
            <Chevron direction="left" />
          </button>
          <div className="gallery-dots">
            {images.map((item, i) => (
              <button
                key={item.src}
                type="button"
                className="gallery-dot"
                aria-label={`Show screenshot ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => show(i)}
              />
            ))}
          </div>
          <button type="button" className="icon-btn" onClick={() => go(1)} aria-label="Next screenshot">
            <Chevron />
          </button>
        </div>
      )}
      <p className="visually-hidden" aria-live="polite">
        Screenshot {index + 1} of {count}: {image.alt}
      </p>
    </section>
  );
}

// Full-screen view of one project. It grows out of its card (shared layoutId),
// closes on Esc, the close button or a click outside, and keeps keyboard focus
// inside while open. Scroll locking and focus return live in Projects.jsx.
export default function ProjectDetail({ project, onClose }) {
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const titleId = `detail-${project.slug}-title`;
  const Diagram = diagrams[project.diagram];

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      // Keep Tab inside the dialog.
      const focusable = panelRef.current.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return createPortal(
    <div className="detail-root">
      <motion.div
        className="detail-backdrop"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={SPRING_SNAPPY}
        onClick={onClose}
      />
      <div
        className="detail-frame"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <motion.div
          ref={panelRef}
          className="detail-panel"
          layoutId={`project-${project.slug}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          transition={SPRING}
          style={{ borderRadius: 28 }}
        >
          <button ref={closeRef} type="button" className="icon-btn detail-close" onClick={onClose} aria-label="Close project details">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
          <motion.div
            className="detail-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { ...SPRING_SNAPPY, delay: 0.15 } }}
            exit={{ opacity: 0, transition: { type: 'spring', bounce: 0, duration: 0.2 } }}
          >
            <header className="detail-head">
              <p className="project-category">{project.category}</p>
              <h2 id={titleId} className="detail-title">
                {project.title}
              </h2>
            </header>

            <Gallery images={project.images ?? []} title={project.title} />

            <div className="detail-grid">
              <div className="detail-copy">
                <p>{project.description}</p>
                {project.details?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <aside className="detail-side">
                <h3 className="detail-label">Tech stack</h3>
                <ul className="stack" aria-label="Built with">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                {(project.repo || project.live) && (
                  <div className="detail-links">
                    {project.repo && (
                      <a className="btn btn-ghost" href={project.repo} target="_blank" rel="noreferrer">
                        View code
                        <Chevron />
                      </a>
                    )}
                    {project.live && (
                      <a className="btn btn-primary" href={project.live} target="_blank" rel="noreferrer">
                        Live demo
                        <Chevron />
                      </a>
                    )}
                  </div>
                )}
              </aside>
            </div>

            {Diagram && <Diagram />}
          </motion.div>
        </motion.div>
      </div>
    </div>,
    document.body,
  );
}
