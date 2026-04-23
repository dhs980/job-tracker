import { Link } from "react-router";
import { useContext } from "react";

import styles from "../css/navbar.module.css";
import { AuthContext } from "../context/AuthContext";
import { useLogOut } from "../hooks/LogOut";

function NavBar() {
  const { token } = useContext(AuthContext);
  const LogOut = useLogOut();
  return (
    <div className={styles.navbar_container}>
      <Link to="/" className={styles.brand}>
        <img
          className={styles.logo}
          src="/web-logo-img.png"
          alt="Job App Tracker Logo"
        ></img>
        <div className={styles.brandText}>
          <strong>HuntLog</strong>
          <span>Job search tracker</span>
        </div>
      </Link>
      <section className={styles.navActions}>
        <Link to="/app" className={`${styles.navButton} ${styles.navGhost}`}>
          Tracker
        </Link>
        <Link
          to="/dashboard"
          className={`${styles.navButton} ${styles.navGhost}`}
        >
          DashBoard
        </Link>
        {token ? (
          <button
            className={`${styles.navButton} ${styles.navPrimary}`}
            onClick={LogOut}
          >
            Log Out
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className={`${styles.navButton} ${styles.navGhost}`}
            >
              Login
            </Link>

            <Link
              to="/signup"
              className={`${styles.navButton} ${styles.navPrimary}`}
            >
              Sign Up
            </Link>
          </>
        )}
      </section>
    </div>
  );
}

export default NavBar;
