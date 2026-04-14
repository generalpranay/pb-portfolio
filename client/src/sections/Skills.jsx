import { motion } from 'framer-motion';
import { useReveal } from '../hooks/index.js';
import styles from './Skills.module.css';

/* ── Badge level styles ── */
const BADGE = {
  Expert:    { background: '#0a2a20', color: '#00c896', border: '0.5px solid #00c896' },
  Advanced:  { background: '#131326', color: '#8c85ff', border: '0.5px solid #6c63ff' },
  Solid:     { background: '#0d1a1a', color: '#00b8b8', border: '0.5px solid #008888' },
  Practiced: { background: '#1a1a0d', color: '#b8a000', border: '0.5px solid #886e00' },
  Learning:  { background: '#1a100a', color: '#c87040', border: '0.5px solid #884020' },
};

function Badge({ level }) {
  return <span className={styles.badge} style={BADGE[level]}>{level}</span>;
}

function Chip({ label }) {
  return <span className={styles.chip}>{label}</span>;
}

/* ── SVG Icons ── */
function AngularIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <path d="M12 2L2 6.5l1.64 14.22L12 24l8.36-3.28L22 6.5 12 2z" fill="rgba(0,200,150,0.12)" stroke="#00c896" strokeWidth="1.2"/>
      <path d="M12 6L8.5 17h1.7l.75-2.1h3.1L14.8 17h1.7L12 6zm0 3.2l1.1 3.3h-2.2L12 9.2z" fill="#00c896"/>
    </svg>
  );
}

function ApiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <circle cx="5" cy="12" r="2.2" fill="rgba(108,99,255,0.15)" stroke="#6c63ff" strokeWidth="1.2"/>
      <circle cx="19" cy="6"  r="2.2" fill="rgba(108,99,255,0.15)" stroke="#6c63ff" strokeWidth="1.2"/>
      <circle cx="19" cy="18" r="2.2" fill="rgba(108,99,255,0.15)" stroke="#6c63ff" strokeWidth="1.2"/>
      <path d="M7 12h4l5-5.5M11 12l5 5.5" stroke="#6c63ff" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

function ReactIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <circle cx="12" cy="12" r="2" fill="#8c85ff"/>
      <ellipse cx="12" cy="12" rx="9.5" ry="3.5" stroke="#8c85ff" strokeWidth="1.2" fill="none"/>
      <ellipse cx="12" cy="12" rx="9.5" ry="3.5" stroke="#8c85ff" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="9.5" ry="3.5" stroke="#8c85ff" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
    </svg>
  );
}

function DbIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <ellipse cx="12" cy="6" rx="8" ry="2.8" fill="rgba(0,200,150,0.1)" stroke="#00c896" strokeWidth="1.2"/>
      <path d="M4 6v5c0 1.55 3.58 2.8 8 2.8s8-1.25 8-2.8V6" stroke="#00c896" strokeWidth="1.2"/>
      <path d="M4 11v5c0 1.55 3.58 2.8 8 2.8s8-1.25 8-2.8v-5" stroke="#00c896" strokeWidth="1.2"/>
    </svg>
  );
}

function DockerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <rect x="2.5" y="10.5" width="2.8" height="2.8" rx="0.5" fill="#8c85ff"/>
      <rect x="6.3"  y="10.5" width="2.8" height="2.8" rx="0.5" fill="#8c85ff"/>
      <rect x="10.1" y="10.5" width="2.8" height="2.8" rx="0.5" fill="#8c85ff"/>
      <rect x="6.3"  y="6.8"  width="2.8" height="2.8" rx="0.5" fill="#8c85ff"/>
      <rect x="10.1" y="6.8"  width="2.8" height="2.8" rx="0.5" fill="#8c85ff"/>
      <path d="M20.5 11.5c-.6-1.2-2.2-1.8-3.5-1.2-.4-1.5-1.8-2.3-3-2.3" stroke="#8c85ff" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M2 14.5s.8 3 5.5 3h8c2.5 0 4.5-1.5 4.5-3" stroke="#8c85ff" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function JavaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <path d="M9.5 16.5s-1 .5 2.5.5c4 0 4-1.2 4-1.2s.5-1.5-4.5-1c0 0-2.5-.1-2-2.5 0 0 .5-3.5 5.5-3.5 0 0 4 .1 3.5 2.5" stroke="#c87040" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M9 20s-1.5.7 3 .7c5 0 5-1.5 5-1.5" stroke="#c87040" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M10.5 6C10.5 6 13.5 4 10.5 2c0 0 2.5 1.2 0 3.5" fill="#c87040" opacity="0.7"/>
    </svg>
  );
}

function NodeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" fill="rgba(0,184,184,0.08)" stroke="#00b8b8" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M9 10.5v5M12 9v7M15 10.5v5M9 13h6" stroke="#00b8b8" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

function FlutterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <path d="M13.5 3.5L5.5 11.5l3 3L21 3.5h-7.5z" fill="rgba(140,133,255,0.15)" stroke="#8c85ff" strokeWidth="1.1" strokeLinejoin="round"/>
      <path d="M8.5 14.5l5.5 5.5 4-2.5-5.5-5.5-4 2.5z" fill="#8c85ff"/>
    </svg>
  );
}

function AzureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <path d="M13.5 3L7 13.5h5L9 21.5l9.5-10.5h-5.5L17 3h-3.5z" fill="rgba(108,99,255,0.12)" stroke="#6c63ff" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  );
}

function CicdIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <path d="M20 12a8 8 0 1 1-2.34-5.66" stroke="#8c85ff" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M17 3l1 4-4-1" stroke="#8c85ff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="2.2" fill="#8c85ff"/>
    </svg>
  );
}

function CsharpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <path d="M9.5 5.5C6 7 4 9.5 4 12s2 5 5.5 6.5" stroke="#8c85ff" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M14.5 5.5C18 7 20 9.5 20 12s-2 5-5.5 6.5" stroke="#8c85ff" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M10.5 9.5v5M13.5 9.5v5M8.5 11h7M8.5 13h7" stroke="#8c85ff" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function AgileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <path d="M5 12a7 7 0 0 0 12.5 4.4" stroke="#b8a000" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M19 12a7 7 0 0 0-12.5-4.4" stroke="#b8a000" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M19 7.5l-1.5 4h3L19 7.5z" fill="#b8a000"/>
      <path d="M5 16.5l1.5-4h-3L5 16.5z" fill="#b8a000"/>
      <circle cx="12" cy="12" r="2" fill="rgba(184,160,0,0.2)" stroke="#b8a000" strokeWidth="1"/>
    </svg>
  );
}

function MulesoftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <circle cx="12" cy="12" r="2.8" fill="rgba(200,112,64,0.1)" stroke="#c87040" strokeWidth="1.2"/>
      <circle cx="4.5"  cy="7"  r="1.8" stroke="#c87040" strokeWidth="1" fill="rgba(200,112,64,0.05)"/>
      <circle cx="19.5" cy="7"  r="1.8" stroke="#c87040" strokeWidth="1" fill="rgba(200,112,64,0.05)"/>
      <circle cx="4.5"  cy="17" r="1.8" stroke="#c87040" strokeWidth="1" fill="rgba(200,112,64,0.05)"/>
      <circle cx="19.5" cy="17" r="1.8" stroke="#c87040" strokeWidth="1" fill="rgba(200,112,64,0.05)"/>
      <path d="M9.3 10.5L6.3 8.4M14.7 10.5l3-2.1M9.3 13.5l-3 2.1M14.7 13.5l3 2.1" stroke="#c87040" strokeWidth="0.9" strokeLinecap="round" opacity="0.7"/>
    </svg>
  );
}

/* ── Card animation wrapper ── */
function Card({ className, delay = 0, children }) {
  return (
    <motion.div
      className={`${styles.card} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Card header row ── */
function CardHeader({ icon, iconColor, title, level }) {
  return (
    <div className={styles.cardHeader}>
      <div className={styles.iconBox} style={{ background: iconColor }}>
        {icon}
      </div>
      <div className={styles.cardMeta}>
        <span className={styles.cardName}>{title}</span>
        <Badge level={level} />
      </div>
    </div>
  );
}

export default function Skills() {
  const { ref, inView } = useReveal(0.1);

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.inner}>

        {/* Header */}
        <motion.div
          ref={ref}
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="sectionLabel">Stack</p>
          <h2 className={styles.heading}>Skills & Technologies</h2>
        </motion.div>

        {/* Bento grid */}
        <div className={styles.grid}>

          {/* ── HERO: Angular & TypeScript ── */}
          <Card className={styles.heroCard} delay={0}>
            <div className={styles.heroBg} />
            <CardHeader
              icon={<AngularIcon />}
              iconColor="rgba(0,200,150,0.1)"
              title="Angular & TypeScript"
              level="Expert"
            />
            <p className={styles.cardDesc}>
              Production-grade enterprise SPAs with Angular 15+. Reactive forms, RxJS streams, lazy-loaded module federation, strict TypeScript. Delivered global-scale apps for real estate and government sectors.
            </p>
            <div className={styles.chips}>
              {['React', 'HTML5', 'CSS3', 'Atomic Design', 'Monorepo'].map(c => (
                <Chip key={c} label={c} />
              ))}
            </div>
          </Card>

          {/* ── RESTful API Design ── */}
          <Card className={styles.restApiCard} delay={0.06}>
            <CardHeader
              icon={<ApiIcon />}
              iconColor="rgba(108,99,255,0.1)"
              title="RESTful API Design"
              level="Expert"
            />
            <p className={styles.cardDesc}>
              Resource-oriented architecture, versioning, auth, rate limiting, and full OpenAPI/Swagger documentation suites.
            </p>
            <div className={styles.chips}>
              {['Postman', 'OpenAPI / Swagger'].map(c => <Chip key={c} label={c} />)}
            </div>
          </Card>

          {/* ── React ── */}
          <Card className={styles.reactCard} delay={0.1}>
            <CardHeader
              icon={<ReactIcon />}
              iconColor="rgba(140,133,255,0.1)"
              title="React Framework"
              level="Advanced"
            />
            <p className={styles.cardDesc}>
              High-performance UI with hooks, context, Suspense & accessibility-first patterns.
            </p>
          </Card>

          {/* ── SQL & NoSQL ── */}
          <Card className={styles.sqlCard} delay={0.08}>
            <div className={styles.sqlLayout}>
              <div className={styles.sqlMain}>
                <CardHeader
                  icon={<DbIcon />}
                  iconColor="rgba(0,200,150,0.1)"
                  title="SQL & NoSQL Databases"
                  level="Expert"
                />
                <p className={styles.cardDesc}>
                  Relational modeling, real-time sync, enterprise query optimization, and multi-tenant data architecture.
                </p>
              </div>
              <div className={styles.sqlSides}>
                {[
                  { name: 'PostgreSQL',   sub: 'Relational modeling' },
                  { name: 'Firestore',    sub: 'Real-time sync' },
                  { name: 'MS SQL Server', sub: 'Enterprise queries' },
                ].map(item => (
                  <div key={item.name} className={styles.sideItem}>
                    <span className={styles.sideItemName}>{item.name}</span>
                    <span className={styles.sideItemSub}>{item.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* ── Docker ── */}
          <Card className={styles.dockerCard} delay={0.12}>
            <CardHeader
              icon={<DockerIcon />}
              iconColor="rgba(140,133,255,0.1)"
              title="Docker"
              level="Advanced"
            />
            <p className={styles.cardDesc}>
              Containerized full-stack apps for portable, reproducible deployments.
            </p>
          </Card>

          {/* ── Java OOP ── */}
          <Card className={styles.javaCard} delay={0.14}>
            <CardHeader
              icon={<JavaIcon />}
              iconColor="rgba(200,112,64,0.1)"
              title="Java OOP"
              level="Advanced"
            />
            <p className={styles.cardDesc}>
              Cascading OO logic, JUnit test suites, REST API backends with clean layered architecture.
            </p>
          </Card>

          {/* ── Flutter / Expo ── */}
          <Card className={styles.flutterCard} delay={0.1}>
            <CardHeader
              icon={<FlutterIcon />}
              iconColor="rgba(140,133,255,0.1)"
              title="Flutter / Expo"
              level="Advanced"
            />
            <p className={styles.cardDesc}>
              Cross-platform mobile apps for iOS & Android with shared codebase.
            </p>
          </Card>

          {/* ── Azure Cloud ── */}
          <Card className={styles.azureCard} delay={0.13}>
            <CardHeader
              icon={<AzureIcon />}
              iconColor="rgba(108,99,255,0.1)"
              title="Azure Cloud"
              level="Advanced"
            />
            <p className={styles.cardDesc}>
              App Services, Azure AI Services — cognitive translation, summarization, and async queue processing at scale.
            </p>
            <div className={styles.azureSides}>
              <div className={styles.azureTag}><CicdIcon /> CI/CD Pipelines / GitOps</div>
              <div className={styles.azureTag}><span className={styles.gitDot} /> Git / GitHub</div>
            </div>
          </Card>

          {/* ── Node.js ── */}
          <Card className={styles.nodeCard} delay={0.16}>
            <CardHeader
              icon={<NodeIcon />}
              iconColor="rgba(0,184,184,0.1)"
              title="Node.js"
              level="Solid"
            />
            <p className={styles.cardDesc}>Backend V8 — Express APIs, middleware, serverless functions.</p>
          </Card>

          {/* ── C# & Python ── */}
          <Card className={styles.csharpCard} delay={0.17}>
            <CardHeader
              icon={<CsharpIcon />}
              iconColor="rgba(140,133,255,0.1)"
              title="C# & Python"
              level="Advanced"
            />
            <p className={styles.cardDesc}>.NET OOP and scripting for automation & data pipelines.</p>
          </Card>

          {/* ── CI/CD Pipelines ── */}
          <Card className={styles.cicdCard} delay={0.15}>
            <CardHeader
              icon={<CicdIcon />}
              iconColor="rgba(140,133,255,0.1)"
              title="CI/CD Pipelines"
              level="Advanced"
            />
            <p className={styles.cardDesc}>
              GitOps workflows, automated build/test/deploy pipelines, zero-downtime releases.
            </p>
          </Card>

          {/* ── Agile / SDLC ── */}
          <Card className={styles.agileCard} delay={0.17}>
            <CardHeader
              icon={<AgileIcon />}
              iconColor="rgba(184,160,0,0.1)"
              title="Agile / SDLC"
              level="Practiced"
            />
            <p className={styles.cardDesc}>
              Scrum, sprint planning, stakeholder data mapping, and full technical documentation delivery.
            </p>
          </Card>

          {/* ── MuleSoft ── */}
          <Card className={styles.mulesoftCard} delay={0.19}>
            <CardHeader
              icon={<MulesoftIcon />}
              iconColor="rgba(200,112,64,0.1)"
              title="MuleSoft"
              level="Learning"
            />
            <p className={styles.cardDesc}>
              Actively studying enterprise integration patterns, API-led connectivity, and Anypoint Platform.
            </p>
          </Card>

        </div>
      </div>
    </section>
  );
}
