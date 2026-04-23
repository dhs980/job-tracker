import { Link } from "react-router";
import styles from "../css/Home.module.css";

function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.contentBlock}>
          <p className={styles.badge}>Built for job hunting</p>
          <h1 className={styles.heading}>Keep the search sharp, not chaotic.</h1>
          <p className={styles.subtext}>
            HuntLog keeps every role, follow-up, and interview in one place so
            your job search feels more like a plan and less like cleanup.
          </p>
          <div className={styles.actions}>
            <Link to="/signup" className={styles.primaryAction}>
              Start for free
            </Link>
            <Link to="/login" className={styles.secondaryAction}>
              Login
            </Link>
          </div>
          <div className={styles.details}>
            <div className={styles.quickStats}>
              <article className={styles.statCard}>
                <span>Applications this week</span>
                <strong>12</strong>
              </article>
              <article className={styles.statCard}>
                <span>Response rate</span>
                <strong>41%</strong>
              </article>
              <article className={styles.statCard}>
                <span>Follow-ups due</span>
                <strong>3</strong>
              </article>
            </div>
            <div className={styles.noteBlock}>
              <p className={styles.noteLabel}>Why it works</p>
              <ul className={styles.noteList}>
                <li>Track every role without juggling tabs and spreadsheets.</li>
                <li>Keep follow-ups visible so opportunities do not go cold.</li>
                <li>See progress quickly with a layout that stays easy to use.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
