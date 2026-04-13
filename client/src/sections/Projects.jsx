import { useState } from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '../hooks/index.js';
import { useReveal } from '../hooks/index.js';
import styles from './Projects.module.css';

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10"/>
    </svg>
  );
}

function ProjectRow({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`${styles.item} ${hovered ? styles.hovered : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className={styles.number}>{project.number}</span>

      <div className={styles.tags}>
        {project.tags.slice(0, 4).map(tag => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>

      <div className={styles.content}>
        <span className={styles.meta}>{project.type} · {project.period}</span>
        <h3 className={styles.title}>{project.title}</h3>
        <span className={styles.org}>{project.org}</span>
        <p className={styles.description}>{project.description}</p>
        <ul className={styles.impact}>
          {project.impact.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div className={styles.arrow}>
        <ArrowIcon />
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { data: projects, loading, error } = useProjects();
  const { ref, inView } = useReveal();

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div ref={ref}>
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
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              Featured Projects
            </motion.h2>
          </div>
        </div>

        {loading && <div className={styles.loading}>Loading projects...</div>}
        {error && <div className={styles.error}>Failed to load projects — {error}</div>}

        {projects && (
          <div className={styles.list}>
            {projects.map((project, i) => (
              <ProjectRow key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
