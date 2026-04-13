import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCalgaryTime, useReveal } from '../hooks/index.js';
import styles from './Contact.module.css';

const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10"/>
    </svg>
  );
}

const CONTACT_LINKS = [
  { icon: '✉', label: 'Email', value: 'bhalsodph@gmail.com', href: 'mailto:bhalsodph@gmail.com' },
  { icon: 'in', label: 'LinkedIn', value: 'pranay-bhalsod', href: 'https://www.linkedin.com/in/pranay-bhalsod-a908452a4' },
  { icon: 'gh', label: 'GitHub', value: 'generalpranay', href: 'https://github.com/generalpranay' },
  { icon: '☎', label: 'Phone', value: '(825) 523-8377', href: 'tel:8255238377' },
];

function StatusMessage({ status, isWork }) {
  if (status === 'green') return 'Available now — work hours (9am–6pm MT)';
  if (status === 'amber') return 'Evening hours — may respond tomorrow';
  return 'Off hours — will respond next business day';
}

export default function Contact() {
  const { time, status, isWork } = useCalgaryTime();
  const { ref, inView } = useReveal();

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setFeedback({ type: 'error', msg: 'All fields are required.' });
      return;
    }
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ type: 'success', msg: data.message || 'Message sent!' });
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setFeedback({ type: 'error', msg: data.error || 'Something went wrong.' });
      }
    } catch {
      setFeedback({ type: 'error', msg: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="sectionLabel">Contact</p>
        </motion.div>

        <div className={styles.grid}>
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <h2 className={styles.heading}>
              Got a system<br />
              that needs{' '}
              <span className={styles.headingAccent}>building?</span>
            </h2>
            <p className={styles.subtext}>
              Open to new opportunities, collaborations, or just a conversation
              about elegant engineering. Let's make something worth deploying.
            </p>

            <div className={styles.contactLinks}>
              {CONTACT_LINKS.map(({ icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className={styles.contactLink}
                >
                  <div className={styles.linkIcon}>{icon}</div>
                  <div className={styles.linkText}>
                    <p className={styles.linkLabel}>{label}</p>
                    <span className={styles.linkValue}>{value}</span>
                  </div>
                  <div className={styles.linkArrow}><ArrowIcon /></div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            className={styles.right}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            {/* Live clock */}
            <div className={styles.clockBlock}>
              <p className={styles.clockLabel}>Current time — Calgary, AB</p>
              <div className={styles.clockTime}>{time || '-- : -- : -- -- MT'}</div>
              <div className={styles.availability}>
                <span className={`${styles.statusDot} ${styles[status]}`} />
                <span className={styles.statusText}>
                  <StatusMessage status={status} isWork={isWork} />
                </span>
              </div>
            </div>

            {/* Contact form */}
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    className={styles.input}
                    value={form.name}
                    onChange={onChange}
                    placeholder="Jane Smith"
                    autoComplete="name"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={styles.input}
                    value={form.email}
                    onChange={onChange}
                    placeholder="jane@company.com"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  className={styles.input}
                  value={form.subject}
                  onChange={onChange}
                  placeholder="Let's build something"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className={styles.textarea}
                  value={form.message}
                  onChange={onChange}
                  placeholder="Tell me about the project..."
                />
              </div>

              {feedback && (
                <div className={`${styles.feedback} ${feedback.type === 'success' ? styles.feedbackSuccess : styles.feedbackError}`}>
                  {feedback.msg}
                </div>
              )}

              <button className={styles.submitBtn} type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send message →'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
