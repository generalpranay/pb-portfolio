import { motion } from 'framer-motion';
import { useReveal } from '../hooks/index.js';
import styles from './Projects.module.css';

/* ─── Arrow icon ─── */
function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

/* ─── Role badge ─── */
const BADGE_STYLES = {
  teal:   { background: '#0a2a20', color: '#00c896', border: '0.5px solid rgba(0,200,150,0.35)' },
  purple: { background: '#131326', color: '#8c85ff', border: '0.5px solid rgba(108,99,255,0.35)' },
};

function RoleBadge({ label, color }) {
  return (
    <span className={styles.roleBadge} style={BADGE_STYLES[color]}>
      {label}
    </span>
  );
}

/* ─── Syntax token spans ─── */
const T = {
  cmt:  (t) => <span style={{ color: '#484848' }}>{t}</span>,
  dec:  (t) => <span style={{ color: '#c87040' }}>{t}</span>,
  kw:   (t) => <span style={{ color: '#8c85ff' }}>{t}</span>,
  typ:  (t) => <span style={{ color: '#00c896' }}>{t}</span>,
  str:  (t) => <span style={{ color: '#b8a000' }}>{t}</span>,
  mth:  (t) => <span style={{ color: '#ccc' }}>{t}</span>,
  pun:  (t) => <span style={{ color: '#555' }}>{t}</span>,
};

/* ─── Code snippet visuals ─── */
function Century21Code() {
  return (
    <pre className={styles.codeBlock}>
      {T.cmt('// Century 21 — property sync')}{'\n'}
      {T.dec('@Injectable')}{T.pun('({ providedIn: ')}{T.str("'root'")}{T.pun(' })')}{'\n'}
      {T.kw('export class')} {T.typ('PropertyService')} {T.pun('{')}{'\n'}
      {'  '}{T.mth('syncListings')}{T.pun('(): ')}{T.typ('Observable')}{T.pun('<')}{T.typ('Property')}{T.pun('[]> {')}{'\n'}
      {'    '}{T.kw('return')} {T.pun('this.')}{T.mth('firestore')}{'\n'}
      {'      '}{T.pun('.')}{T.mth('collection')}{T.pun('(')}{T.str("'listings'")}{T.pun(')')}{'\n'}
      {'      '}{T.pun('.')}{T.mth('valueChanges')}{T.pun('();')}{'\n'}
      {'  '}{T.pun('}')}{'\n'}
      {T.pun('}')}
    </pre>
  );
}

function LifePlannerCode() {
  return (
    <pre className={styles.codeBlock}>
      {T.cmt('// AI Life Planner — task engine')}{'\n'}
      {T.dec('@RestController')}{'\n'}
      {T.kw('public class')} {T.typ('TaskPrioritizer')} {T.pun('{')}{'\n'}
      {'  '}{T.dec('@PostMapping')}{T.pun('(')}{T.str('"/prioritize"')}{T.pun(')')}{'\n'}
      {'  '}{T.typ('List')}{T.pun('<')}{T.typ('Task')}{T.pun('> ')}{T.mth('prioritize')}{T.pun('(')}{'\n'}
      {'    '}{T.dec('@RequestBody')}{T.pun(' ')}{T.typ('TaskList')}{' t) {'}{'\n'}
      {'    '}{T.kw('return')} {T.mth('cascade')}{T.pun('(')}{T.mth('t.getTasks')}{T.pun('());')}{'\n'}
      {'  '}{T.pun('}')}{'\n'}
      {T.pun('}')}
    </pre>
  );
}

/* ─── Metrics tile visual ─── */
const METRIC_COLORS = {
  teal:   '#00c896',
  purple: '#8c85ff',
  amber:  '#b8a000',
  coral:  '#c87040',
};

function MetricsTile({ metrics }) {
  return (
    <div className={styles.metricsGrid}>
      {metrics.map((m, i) => (
        <div key={i} className={styles.metricBox}>
          <span className={styles.metricValue} style={{ color: METRIC_COLORS[m.color] }}>
            {m.value}
          </span>
          <span className={styles.metricLabel}>{m.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Shared card body ─── */
function CardBody({ badge, badgeColor, title, client, clientColor, description, bullets, date }) {
  return (
    <div className={styles.cardBody}>
      <div className={styles.cardBodyTop}>
        <RoleBadge label={badge} color={badgeColor} />
        <span className={styles.arrowIcon}><ArrowIcon /></span>
      </div>

      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardClient} style={{ color: METRIC_COLORS[clientColor] }}>
          {client}
        </p>
        <p className={styles.cardDesc}>{description}</p>
      </div>

      <div className={styles.cardBullets}>
        {bullets.map((b, i) => (
          <div key={i} className={styles.bullet}>
            <span className={styles.bulletArrow}>→</span>
            <span className={styles.bulletText}>{b}</span>
          </div>
        ))}
      </div>

      <p className={styles.cardDate}>{date}</p>
    </div>
  );
}

/* ─── Top row: code snippet cards ─── */
function CodeCard({ visual, bodyProps, delay }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.codeHeader}>
        <div className={styles.codeDots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        {visual}
      </div>
      <CardBody {...bodyProps} />
    </motion.div>
  );
}

/* ─── Bottom row: metrics cards ─── */
function MetricsCard({ metrics, bodyProps, delay }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.metricsHeader}>
        <MetricsTile metrics={metrics} />
      </div>
      <CardBody {...bodyProps} />
    </motion.div>
  );
}

/* ─── Main section ─── */
export default function Projects() {
  const { ref, inView } = useReveal();

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.inner}>

        {/* Header */}
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

        {/* 2×2 grid */}
        <div className={styles.grid}>

          {/* ── Top row: code cards ── */}
          <CodeCard
            delay={0}
            visual={<Century21Code />}
            bodyProps={{
              badge: 'Full Stack Developer',
              badgeColor: 'teal',
              title: 'Enterprise Real Estate Platform',
              client: 'Century 21',
              clientColor: 'teal',
              description: 'High-performance Angular web app and Flutter mobile for a global real estate network. Real-time Firestore sync, secure REST APIs for property data and lead generation.',
              bullets: [
                'Served thousands of agents across North America',
                'Real-time property sync with Firestore listeners',
              ],
              date: 'Jan 2025 – Sep 2025',
            }}
          />

          <CodeCard
            delay={0.08}
            visual={<LifePlannerCode />}
            bodyProps={{
              badge: 'Personal Project',
              badgeColor: 'teal',
              title: 'AI Life Planner',
              client: 'Personal Project',
              clientColor: 'teal',
              description: 'RESTful API in Java with OO cascading logic to automate dynamic task prioritization. Containerized with Docker, documented with Postman and OpenAPI/Swagger.',
              bullets: [
                'Full OpenAPI/Swagger documentation suite',
                'Docker containerization for portable deployment',
              ],
              date: 'Oct 2025 – Present',
            }}
          />

          {/* ── Bottom row: metrics cards ── */}
          <MetricsCard
            delay={0.14}
            metrics={[
              { value: '100%', label: 'Manual records digitized', color: 'purple' },
              { value: 'Weeks', label: 'Planning time saved',     color: 'teal'   },
              { value: 'SQL',   label: 'Schema & modeling',       color: 'amber'  },
              { value: 'Pipeline', label: 'Data to execution',    color: 'purple' },
            ]}
            bodyProps={{
              badge: 'Software Developer',
              badgeColor: 'purple',
              title: 'Housing Management System',
              client: 'First Nations Housing Services',
              clientColor: 'purple',
              description: 'Architected a comprehensive housing management system, digitizing manual community workflows. Built data pipelines feeding into housing execution plans for resource allocation.',
              bullets: [
                'Digitized 100% of previously manual housing records',
                'Data pipelines reducing planning cycles by weeks',
              ],
              date: 'Contract — 4 Months',
            }}
          />

          <MetricsCard
            delay={0.2}
            metrics={[
              { value: 'Azure', label: 'Cognitive Services',    color: 'teal'   },
              { value: 'OpenAI', label: 'API Integration',      color: 'purple' },
              { value: 'Async', label: 'Real-time streaming',   color: 'amber'  },
              { value: 'Agile', label: 'Sprint optimized',      color: 'coral'  },
            ]}
            bodyProps={{
              badge: 'AI Integration Developer',
              badgeColor: 'purple',
              title: 'AI Translation & Assistant Tool',
              client: 'Professional Project',
              clientColor: 'purple',
              description: 'Integrated Azure Cognitive Services and OpenAI APIs for real-time translation and summarization, with async processing for fluid UI updates on large data transformations.',
              bullets: [
                'Real-time translation with Azure AI pipeline',
                'Async data streaming for fluid UI experience',
              ],
              date: 'Mar 2025 – Aug 2025',
            }}
          />

        </div>
      </div>
    </section>
  );
}
