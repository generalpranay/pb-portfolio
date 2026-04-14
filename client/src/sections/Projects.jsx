import { useState } from 'react';
import { motion } from 'framer-motion';
import { useReveal, useProjects } from '../hooks/index.js';
import styles from './Projects.module.css';

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skLine} style={{ width: '40%' }} />
      <div className={styles.skLine} style={{ width: '70%', height: 28 }} />
      <div className={styles.skLine} style={{ width: '30%' }} />
      <div className={styles.skLine} style={{ flex: 1 }} />
      <div className={styles.skLine} style={{ width: '55%' }} />
      <div className={styles.skLine} style={{ width: '80%' }} />
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`${styles.card} ${hovered ? styles.cardHovered : ''}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.cardGlow} />
      <span className={styles.cardNumber}>{project.number}</span>

      <div className={styles.cardTop}>
        <div className={styles.cardMeta}>
          <span className={styles.metaType}>{project.type}</span>
          <span className={styles.metaPeriod}>{project.period}</span>
        </div>
        <span className={styles.cardArrow}><ArrowIcon /></span>
      </div>

      <div className={styles.cardTags}>
        {project.tags.map(tag => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>

      <h3 className={styles.cardTitle}>{project.title}</h3>
      <p className={styles.cardOrg}>{project.org}</p>
      <p className={styles.cardDesc}>{project.description}</p>

      <ul className={styles.cardImpact}>
        {project.impact.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Projects() {
  const { ref, inView } = useReveal();
  const { data: projects, loading, error } = useProjects();

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.header} ref={ref}>
          <motion.p
            className="sectionLabel"
            initial={{ opacity: 0, y: -8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Work
          </motion.p>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            Featured Projects
          </motion.h2>
        </div>

        {loading && (
          <div className={styles.skeletonGrid}>
            {[0, 1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        )}

        {error && (
          <p className={styles.error}>Failed to load projects.</p>
        )}

        {projects && (
          <div className={styles.grid}>
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
