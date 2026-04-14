import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Hero.module.css';

const TAGLINES = [
  "I don't just write code.",
  'I architect intent.',
  'Systems that scale.',
  'Logic that breathes.',
  'Infrastructure others build on.',
];

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  );
}

const nameVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.1 },
  },
};

const letterVariants = {
  hidden: { y: 64, opacity: 0, skewX: 10 },
  visible: {
    y: 0, opacity: 1, skewX: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const [tagIndex, setTagIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTagIndex(i => (i + 1) % TAGLINES.length), 2800);
    return () => clearInterval(id);
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const firstName = 'Pranay'.split('');
  const lastName = 'Bhalsod'.split('');

  return (
    <section className={styles.section}>
      <div className={styles.gridBg} aria-hidden="true" />

      <div className={styles.content}>
        {/* Available badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Open to Work — Calgary, AB
        </div>

        {/* Eyebrow */}
        <p className={styles.eyebrow}>
          Software Developer
        </p>

        {/* Name */}
        <div className={styles.nameWrap}>
          <motion.span
            className={styles.name}
            variants={nameVariants}
            initial="hidden"
            animate="visible"
            aria-label="Pranay"
          >
            {firstName.map((ch, i) => (
              <motion.span key={i} variants={letterVariants} style={{ display: 'inline-block' }}>
                {ch}
              </motion.span>
            ))}
          </motion.span>
        </div>
        <div className={styles.nameWrap}>
          <motion.span
            className={styles.name}
            variants={nameVariants}
            initial="hidden"
            animate="visible"
            aria-label="Bhalsod"
          >
            {lastName.map((ch, i) => (
              <motion.span key={i} variants={letterVariants} style={{ display: 'inline-block' }}>
                {ch}
              </motion.span>
            ))}
          </motion.span>
        </div>

        {/* Cycling tagline */}
        <div className={styles.taglineBox}>
          <AnimatePresence mode="wait">
            <motion.span
              key={tagIndex}
              className={styles.tagline}
              initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(10px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {TAGLINES[tagIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* CTA buttons */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <button className={styles.ctaFilled} onClick={() => scrollTo('projects')}>
            View my work
          </button>
          <button className={styles.ctaGhost} onClick={() => scrollTo('contact')}>
            Get in touch
          </button>
          <a
            href="https://github.com/generalpranay"
            target="_blank"
            rel="noreferrer"
            className={styles.ctaIcon}
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {[
            { num: '4+', label: 'Projects shipped' },
            { num: '3+', label: 'Industries served' },
            { num: '100%', label: 'Data consistency' },
          ].map(({ num, label }) => (
            <div key={label} className={styles.stat}>
              <span className={styles.statNum}>{num}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating code snippets */}
      <div className={`${styles.codeSnippet} ${styles.snippet1}`}>
        <span>const</span> developer = {`{`}{'\n'}
        {'  '}name: <span>"Pranay"</span>,{'\n'}
        {'  '}stack: [<span>"Angular"</span>, <span>"Flutter"</span>],{'\n'}
        {'  '}status: <span>"open_to_work"</span>{'\n'}
        {`}`}
      </div>
      <div className={`${styles.codeSnippet} ${styles.snippet2}`}>
        <span>@Injectable</span>({`{`} providedIn: <span>'root'</span> {`}`}){'\n'}
        <span>class</span> SolutionService {`{`}{'\n'}
        {'  '}architect(problem) {`{`}{'\n'}
        {'    '}<span>return</span> clean_solution;{'\n'}
        {'  '}{`}`}{'\n'}
        {`}`}
      </div>
      <div className={`${styles.codeSnippet} ${styles.snippet3}`}>
        docker run -d \{'\n'}
        {'  '}-p 8080:8080 \{'\n'}
        {'  '}<span>pranay/api:latest</span>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>scroll</span>
      </div>
    </section>
  );
}
