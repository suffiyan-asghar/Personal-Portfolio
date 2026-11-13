import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

// House springs. Critically damped (no overshoot) by default; a little bounce
// is reserved for things the visitor presses.
export const SPRING = { type: 'spring', bounce: 0, duration: 0.8 };
export const SPRING_SNAPPY = { type: 'spring', bounce: 0, duration: 0.4 };
export const SPRING_PRESS = { type: 'spring', bounce: 0.2, duration: 0.4 };
// For motion values that follow the pointer (critically damped: damping = 2√stiffness).
export const SPRING_FOLLOW = { stiffness: 260, damping: 32.25, mass: 1 };

const viewport = { once: true, margin: '0px 0px -12% 0px' };

// Fades and lifts its children into place the first time they scroll into view.
export function Reveal({ as = 'div', delay = 0, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={viewport}
      transition={{ ...SPRING, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// "01 — About" label, the title, and a short yellow rule that draws in.
export function SectionHeading({ id, index, label, children, titleClassName = 'section-title' }) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow">
        {String(index).padStart(2, '0')} — {label}
      </p>
      <h2 id={id} className={titleClassName}>
        {children}
      </h2>
      <motion.span
        className="section-rule"
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewport}
        transition={{ ...SPRING, delay: 0.15 }}
      />
    </Reveal>
  );
}

// A link or button that responds the instant it is pressed. With `magnetic`,
// it leans a few pixels toward a mouse pointer and springs back on leave.
export function Pressable({ as = 'a', magnetic = false, children, style, onPointerMove, onPointerLeave, ...rest }) {
  const Tag = motion[as];
  const reduce = useReducedMotion();
  const pullX = useMotionValue(0);
  const pullY = useMotionValue(0);
  const x = useSpring(pullX, SPRING_FOLLOW);
  const y = useSpring(pullY, SPRING_FOLLOW);
  const active = magnetic && !reduce;

  const handleMove = (event) => {
    onPointerMove?.(event);
    if (!active || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const limit = 6;
    pullX.set(Math.max(-limit, Math.min(limit, dx * 0.2)));
    pullY.set(Math.max(-limit, Math.min(limit, dy * 0.3)));
  };

  const handleLeave = (event) => {
    onPointerLeave?.(event);
    pullX.set(0);
    pullY.set(0);
  };

  return (
    <Tag
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={SPRING_PRESS}
      style={active ? { ...style, x, y } : style}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// A card with a soft glow that follows the cursor.
export function Tile({ as = 'div', className = '', delay = 0, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={`tile ${className}`}
      onPointerMove={trackPointer}
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.012 }}
      whileTap={{ scale: 0.99 }}
      viewport={viewport}
      transition={{ ...SPRING, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function trackPointer(event) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  el.style.setProperty('--my', `${event.clientY - rect.top}px`);
}

// Shown where an image or logo file has not been added yet. In development it
// also prints the expected path so you know where to drop the file.
export function Placeholder({ path, label, className = '' }) {
  return (
    <div className={`placeholder ${className}`} role="img" aria-label={label}>
      <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <circle cx="9" cy="10" r="1.8" />
        <path d="m21 16-5-5-9 9" />
      </svg>
      {import.meta.env.DEV && path && <code>src/assets/{path}</code>}
    </div>
  );
}

export function Chevron({ direction = 'right' }) {
  const d = { right: 'm9 6 6 6-6 6', left: 'm15 6-6 6 6 6' }[direction];
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
