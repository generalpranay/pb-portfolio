import { useState } from 'react';
import { motion } from 'framer-motion';
import { useProjects, useReveal } from '../hooks/index.js';
import styles from './Projects.module.css';

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skLine} style={{ width: '40%', height: '9px' }} />
      <div className={styles.skLine} style={{ width: '70%', height: '20px', marginTop: 6 }} />
      <div className={styles.skLine} style={{ width: '45%', height: '11px' }} />
      <div className={styles.skLine} style={{ width: '95%' }} />
      <div className={styles.skLine} style={{ width: '85%' }} />
      <div className={styles.skLine} style={{ width: '75%' }} />
      <div className={styles.skLine} style={{ width: '60%', marginTop: 8 }} />
      <div className={styles.skLine} style={{ width: '80%' }} />
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`${styles.card} ${hovered ? styles.cardHovered : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Decorative project number */}
      <span className={styles.cardNumber} aria-hidden="true">{project.number}</span>

      <div className={styles.cardGlow} />

      <div className={styles.cardTop}>
        <div className={styles.cardMeta}>
          <span className={styles.metaType}>{project.type}</span>
          <span className={styles.metaPeriod}>{project.period}</span>
        </div>
        <span className={styles.cardArrow}>
          <ArrowIcon />
        </span>
      </div>

      <div className={styles.cardTags}>
        {project.tags.slice(0, 4).map(tag => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>

      <h3 className={styles.cardTitle}>{project.title}</h3>
      <p className={styles.cardOrg}>{project.org}</p>
      <p className={styles.cardDesc}>{project.description}</p>

      <ul className={styles.cardImpact}>
        {project.impact.slice(0, 2).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Projects() {
  const { data: projects, loading, error } = useProjects();
  const { ref, inView } = useReveal();

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
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {error && <div className={styles.error}>Failed to load projects</div>}

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
