import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReveal } from '../hooks/index.js';
import styles from './Skills.module.css';

const SKILL_GROUPS = [
  {
    title: 'Frontend & Mobile',
    skills: [
      { name: 'Angular', pct: 90 },
      { name: 'Flutter / Expo', pct: 85 },
      { name: 'React', pct: 75 },
      { name: 'TypeScript', pct: 82 },
    ],
  },
  {
    title: 'Backend & API',
    skills: [
      { name: 'RESTful API Design', pct: 92 },
      { name: 'Java OOP', pct: 88 },
      { name: 'Node.js', pct: 78 },
      { name: 'Python', pct: 74 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'Azure', pct: 85 },
      { name: 'Docker', pct: 82 },
      { name: 'CI / CD', pct: 70 },
      { name: 'MuleSoft (learning)', pct: 45 },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'Firestore / NoSQL', pct: 88 },
      { name: 'PostgreSQL', pct: 85 },
      { name: 'MS SQL Server', pct: 80 },
      { name: 'Firebase', pct: 82 },
    ],
  },
];

const TAGS = [
  'Agile / Scrum', 'SDLC', 'System Architecture', 'JUnit', 'Postman',
  'OpenAPI / Swagger', 'JSON / XML', 'C#', 'Git / GitHub', 'Firebase',
  'Azure AI Services', 'MuleSoft', 'Frontend Design', 'REST Architecture',
];

function SkillGroup({ group, animate }) {
  return (
    <div className={styles.group}>
      <h3 className={styles.groupTitle}>{group.title}</h3>
      {group.skills.map(skill => (
        <div key={skill.name} className={styles.skillRow}>
          <div className={styles.skillMeta}>
            <span className={styles.skillName}>{skill.name}</span>
            <span className={styles.skillPct}>{skill.pct}%</span>
          </div>
          <div className={styles.barTrack}>
            <div
              className={`${styles.bar} ${animate ? styles.animate : ''}`}
              style={{ '--w': `${skill.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  const { ref, inView } = useReveal(0.15);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setAnimate(true), 120);
      return () => clearTimeout(t);
    }
  }, [inView]);

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="sectionLabel">Stack</p>
          <h2 className={styles.heading}>Skills & Technologies</h2>
        </motion.div>

        <div className={styles.grid}>
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <SkillGroup group={group} animate={animate} />
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.tagSection}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <p className={styles.tagLabel}>Also proficient in</p>
          <div className={styles.tagCloud}>
            {TAGS.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
