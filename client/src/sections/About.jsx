import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReveal } from '../hooks/index.js';
import styles from './About.module.css';

const PROFILE_STR = `{
  "name": "Pranay Bhalsod",
  "role": "Software Developer",
  "location": "Calgary, AB 🇨🇦",
  "email": "bhalsodph@gmail.com",
  "github": "generalpranay",
  "stack": [
    "Angular", "Flutter",
    "Java", "Node.js", "React"
  ],
  "cloud": [
    "Azure", "Firebase", "Docker"
  ],
  "education": "SAIT — Nov 2025",
  "status": "open_to_work",
  "specialties": [
    "System Design",
    "REST API Architecture",
    "Enterprise Integration"
  ]
}`;

function TerminalBody({ inView }) {
  const [typed, setTyped] = useState('');
  const idxRef = useRef(0);

  useEffect(() => {
    if (!inView) return;
    idxRef.current = 0;
    setTyped('');
    const id = setInterval(() => {
      if (idxRef.current < PROFILE_STR.length) {
        setTyped(PROFILE_STR.slice(0, idxRef.current + 1));
        idxRef.current++;
      } else {
        clearInterval(id);
      }
    }, 16);
    return () => clearInterval(id);
  }, [inView]);

  // Syntax-highlight the typed string
  const highlighted = typed
    .replace(/("[\w\s@🇨🇦./:-]+")\s*:/g, '<span class="sk">$1</span>:')
    .replace(/:\s*("(?:[^"\\]|\\.)*")/g, ': <span class="ss">$1</span>')
    .replace(/:\s*(true|false|null)/g, ': <span class="sb">$1</span>')
    .replace(/([{}\[\]])/g, '<span class="sbr">$1</span>');

  return (
    <div className={styles.terminalBody}>
      <span
        dangerouslySetInnerHTML={{
          __html: highlighted
            .replace(/class="sk"/g, `class="${styles.syntaxKey}"`)
            .replace(/class="ss"/g, `class="${styles.syntaxStr}"`)
            .replace(/class="sb"/g, `class="${styles.syntaxBool}"`)
            .replace(/class="sbr"/g, `class="${styles.syntaxBracket}"`),
        }}
      />
      {typed.length < PROFILE_STR.length && <span className={styles.cursor} />}
    </div>
  );
}

export default function About() {
  const { ref, inView } = useReveal(0.2);

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          ref={ref}
          className={styles.grid}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left: text */}
          <div className={styles.text}>
            <p className="sectionLabel">About</p>
            <h2 className={styles.heading}>
              Building systems<br />
              with <em>intent</em>
            </h2>
            <p className={styles.body}>
              I'm a highly analytical Software Developer with deep experience in{' '}
              <strong>System Design</strong>, <strong>Full-Stack Web Applications</strong>,
              and <strong>Cross-Platform Mobile Development</strong>.
            </p>
            <p className={styles.body}>
              I've built and deployed enterprise-grade solutions for{' '}
              <strong>Century 21</strong> and specialized government-adjacent sectors
              like <strong>First Nations Housing Services</strong>. I oversee the
              complete SDLC — from stakeholder data collection and architectural
              planning through to scalable cloud deployments.
            </p>
            <p className={styles.body}>
              Currently advancing my expertise in{' '}
              <strong style={{ color: 'var(--accent)' }}>MuleSoft</strong> and complex
              enterprise integration patterns. Graduating from SAIT's Software
              Development diploma in November 2025.
            </p>

            <div className={styles.stats}>
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
            </div>
          </div>

          {/* Right: terminal */}
          <div className={styles.terminal}>
            <div className={styles.terminalBar}>
              <span className={`${styles.dot} ${styles.dotRed}`} />
              <span className={`${styles.dot} ${styles.dotYellow}`} />
              <span className={`${styles.dot} ${styles.dotGreen}`} />
              <span className={styles.terminalTitle}>profile.json</span>
            </div>
            <TerminalBody inView={inView} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
