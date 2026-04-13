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

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`${styles.card} ${hovered ? styles.cardHovered : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Projects() {
  const { data: projects, loading, error } = useProjects();
  const { ref, inView } = useReveal();

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header} ref={ref}>
          <motion.p
            className="sectionLabel"
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Work
          </motion.p>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Featured Projects
          </motion.h2>
        </div>

        {loading && <div className={styles.loading}>Loading projects...</div>}
        {error && <div className={styles.error}>Failed to load projects</div>}

        {projects && (
          <motion.div
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
