import { motion } from 'framer-motion';
import { useReveal } from '../hooks/index.js';
import styles from './Experience.module.css';

const TIMELINE = [
  {
    date: 'Oct 2025 – Present',
    role: 'Software Developer',
    company: 'AI Life Planner',
    type: 'Personal Project',
    isEdu: false,
    bullets: [
      'RESTful API in Java with OO cascading priority engine for dynamic task scheduling',
      'Containerized full stack with Docker for portable, reproducible deployments',
      'Comprehensive OpenAPI / Swagger documentation and Postman collection',
    ],
  },
  {
    date: 'Mar 2025 – Aug 2025',
    role: 'AI Integration Developer',
    company: 'AI Translation & Assistant Tool',
    type: 'Professional Project',
    isEdu: false,
    bullets: [
      'Integrated Azure Cognitive Services and OpenAI APIs for real-time translation and summarization',
      'Async queue processing for fluid UI on large multi-document batch transformations',
      'Delivered across 6-month Agile sprint cycles with weekly stakeholder reviews',
    ],
  },
  {
    date: 'Jan 2025 – Sep 2025',
    role: 'Full Stack Developer',
    company: 'Century 21',
    type: 'Enterprise',
    isEdu: false,
    bullets: [
      'Engineered high-performance Angular web apps and Flutter mobile apps for a global real estate network',
      'Real-time Firestore property sync serving thousands of agents across North America',
      'Designed secure REST APIs for property data, user auth, and lead generation workflows',
    ],
  },
  {
    date: '4-Month Contract',
    role: 'Software Developer',
    company: 'First Nations Housing Services',
    type: 'Contract',
    isEdu: false,
    bullets: [
      'Architected comprehensive housing management system, digitizing 100% of manual community workflows',
      'Built data pipelines feeding into housing execution plans for resource allocation decisions',
      'Delivered complete system within tight contract timeline and stakeholder sign-off',
    ],
  },
  {
    date: 'Jan 2024 – Nov 2025',
    role: 'Diploma in Software Development',
    company: 'SAIT — Southern Alberta Institute of Technology',
    type: 'Education',
    isEdu: true,
    bullets: [
      'Focus: Database-driven applications, REST APIs, Systems Analysis, .NET, SQL Server',
      'Agile development methodologies and full SDLC project delivery',
    ],
  },
];

export default function Experience() {
  const { ref, inView } = useReveal(0.1);

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="sectionLabel">Timeline</p>
          <h2 className={styles.heading}>Experience</h2>
        </motion.div>

        <div className={styles.timeline}>
          {TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              className={styles.item}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.dateCol}>
                <span className={styles.date}>{item.date}</span>
              </div>

              <div className={styles.connectorCol}>
                <div className={`${styles.dot} ${item.isEdu ? styles.dotEdu : ''}`} />
                <div className={styles.connectorLine} />
              </div>

              <div className={styles.contentCol}>
                <div className={`${styles.contentCard} ${item.isEdu ? styles.isEdu : ''}`}>
                  <span className={styles.dateMobile}>{item.date}</span>
                  <h3 className={styles.role}>{item.role}</h3>
                  <p className={styles.company}>{item.company}</p>
                  <span className={styles.type}>{item.type}</span>
                  <ul className={styles.bullets}>
                    {item.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
