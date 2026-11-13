import { motion } from 'motion/react';

// House springs. Critically damped (no overshoot) by default; a little bounce
// is reserved for things the visitor presses.
export const SPRING = { type: 'spring', bounce: 0, duration: 0.8 };
export const SPRING_SNAPPY = { type: 'spring', bounce: 0, duration: 0.4 };
export const SPRING_PRESS = { type: 'spring', bounce: 0.2, duration: 0.4 };

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

// A link or button that responds the instant it is pressed.
export function Pressable({ as = 'a', children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={SPRING_PRESS} {...rest}>
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

function trackPointer(event) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  el.style.setProperty('--my', `${event.clientY - rect.top}px`);
}

export function Chevron() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
