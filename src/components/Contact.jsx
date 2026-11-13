import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { profile } from '../data.js';
import { Pressable, Reveal, SectionHeading, SPRING, SPRING_SNAPPY } from './motion.jsx';

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'That email address does not look right.';
  if (!values.message.trim()) errors.message = 'Please write a short message.';
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ state: 'idle', text: '' });

  const errors = validate(values);
  const showError = (field) => (touched[field] ? errors[field] : undefined);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const onBlur = (event) => {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length > 0) {
      setStatus({ state: 'error', text: 'Please fix the highlighted fields.' });
      return;
    }

    // Spam trap: real visitors never see or tick this box.
    if (event.currentTarget.elements.botcheck?.checked) return;

    // Without an access key the form falls back to the visitor's email app.
    if (!ACCESS_KEY) {
      const subject = encodeURIComponent(`Portfolio message from ${values.name.trim()}`);
      const body = encodeURIComponent(`${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus({ state: 'success', text: 'Your email app should now open with the message ready to send.' });
      return;
    }

    setStatus({ state: 'sending', text: 'Sending…' });
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio message from ${values.name.trim()}`,
          from_name: 'Portfolio contact form',
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message || 'Request failed');
      setValues({ name: '', email: '', message: '' });
      setTouched({});
      setStatus({ state: 'success', text: 'Message sent. Thank you, I will reply soon.' });
    } catch {
      setStatus({
        state: 'error',
        text: `The message could not be sent. Please email ${profile.email} instead.`,
      });
    }
  };

  const sending = status.state === 'sending';

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <motion.div
        className="contact-beam"
        aria-hidden="true"
        initial={{ opacity: 0, scaleX: 0.4 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: '0px 0px -25% 0px' }}
        transition={{ ...SPRING, duration: 1.4 }}
      />
      <div className="container contact-inner">
        <Reveal className="contact-copy">
          <SectionHeading id="contact-title" index={4} label="Contact" titleClassName="contact-title">
            Send the signal.
          </SectionHeading>
          <p className="contact-lede">I'm open to software engineering and AI opportunities. Send a message or reach me directly.</p>
          <dl className="contact-list">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </dd>
            </div>
            <div>
              <dt>LinkedIn</dt>
              <dd>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  {profile.linkedinHandle}
                </a>
              </dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  {profile.githubHandle}
                </a>
              </dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{profile.location}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal as="form" className="form" delay={0.08} onSubmit={onSubmit} noValidate>
          <Field label="Name" name="name" type="text" autoComplete="name" placeholder="Your name" value={values.name} error={showError('name')} onChange={onChange} onBlur={onBlur} />
          <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={values.email} error={showError('email')} onChange={onChange} onBlur={onBlur} />
          <Field label="Message" name="message" textarea placeholder="How can I help?" value={values.message} error={showError('message')} onChange={onChange} onBlur={onBlur} />
          <input className="honeypot" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <div className="form-foot">
            <Pressable as="button" type="submit" className="btn btn-accent" disabled={sending} magnetic>
              {sending ? 'Sending…' : 'Send message'}
            </Pressable>
            <div role="status" aria-live="polite">
              <AnimatePresence mode="wait">
                {status.text && status.state !== 'sending' && (
                  <motion.p
                    key={status.text}
                    className={`form-status ${status.state === 'error' ? 'is-error' : ''}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={SPRING_SNAPPY}
                  >
                    {status.text}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, name, textarea, error, ...rest }) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const Control = textarea ? 'textarea' : 'input';
  return (
    <div className="field-group">
      <label htmlFor={id}>{label}</label>
      <Control id={id} name={name} className="field" rows={textarea ? 5 : undefined} aria-invalid={error ? 'true' : undefined} aria-describedby={error ? errorId : undefined} {...rest} />
      {error && (
        <p id={errorId} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
