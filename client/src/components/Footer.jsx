import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          © {year} Pranay Bhalsod
        </p>
        <div className={styles.links}>
          <a href="https://github.com/generalpranay" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/pranay-bhalsod-a908452a4" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:bhalsodph@gmail.com">Email</a>
        </div>
        <button
          className={styles.backTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
    </footer>
  );
}
