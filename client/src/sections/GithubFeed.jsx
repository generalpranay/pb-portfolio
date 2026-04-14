import { motion } from 'framer-motion';
import { useGithubRepos } from '../hooks/index.js';
import { useReveal } from '../hooks/index.js';
import styles from './GithubFeed.module.css';

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={`${styles.skeleton} ${styles.skLine}`} style={{ width: '60%' }} />
      <div className={`${styles.skeleton} ${styles.skLine}`} style={{ width: '90%' }} />
      <div className={`${styles.skeleton} ${styles.skLine}`} style={{ width: '75%' }} />
      <div className={`${styles.skeleton} ${styles.skLine}`} style={{ width: '40%', marginTop: 8 }} />
    </div>
  );
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' });
}

function RepoCard({ repo, index }) {
  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.cardHeader}>
        <span className={styles.repoName}>{repo.name}</span>
        {repo.stars > 0 && (
          <span className={styles.stars}>
            <StarIcon />
            {repo.stars}
          </span>
        )}
      </div>

      {repo.description && (
        <p className={styles.cardDesc}>{repo.description}</p>
      )}

      <div className={styles.cardMeta}>
        {repo.language && (
          <span className={styles.langBadge}>{repo.language}</span>
        )}
        {repo.pushed && (
          <span className={styles.pushedAt}>
            {formatDate(repo.pushed)}
          </span>
        )}
      </div>
    </motion.a>
  );
}

export default function GithubFeed() {
  const { data: repos, loading, error } = useGithubRepos();
  const { ref, inView } = useReveal();

  return (
    <section id="github" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          ref={ref}
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.headingGroup}>
            <p className="sectionLabel">Open Source</p>
            <h2 className={styles.heading}>GitHub Activity</h2>
          </div>
          <a
            href="https://github.com/generalpranay"
            target="_blank"
            rel="noreferrer"
            className={styles.viewAll}
          >
            View all repos →
          </a>
        </motion.div>

        {loading && (
          <div className={styles.grid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {error && (
          <div className={styles.error}>
            <p className={styles.errorText}>Could not load GitHub repos.</p>
            <a
              href="https://github.com/generalpranay"
              target="_blank"
              rel="noreferrer"
              className={styles.errorLink}
            >
              View profile directly →
            </a>
          </div>
        )}

        {repos && repos.length > 0 && (
          <div className={styles.grid}>
            {repos.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
