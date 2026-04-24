import { useContext, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

import { AuthContext } from "../context/AuthContext";
import { buildApiUrl } from "../api/apiUrl";

import styles from "../css/Login.module.css";
//react icons
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleLogin from "./GoogleLogin";

function Login() {
  const [visible, setVisible] = useState(false);
  const { setToken, error, setError, loading, setLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  let emailRef = useRef(null);
  let passwordRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const signupData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const response = await axios.post(
        buildApiUrl("auth/login"),
        signupData,
        { withCredentials: true },
      );
      setToken(response.data.token);
      navigate("/app");
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }
  function handleVisible() {
    setVisible((prev) => !prev);
  }
  return (
    <div className={styles.Login_Container1}>
      <div className={styles.Login_Container2}>
        <form
          onSubmit={handleSubmit}
          className={styles.Login_Container3}
          autoComplete="on"
        >
          <p className={styles.eyebrow}>Pick up where you left off</p>
          <div className={styles.formHeader}>
            <h2>Welcome Back</h2>
            <p>Sign in to continue tracking your applications.</p>
          </div>
          {error && <p className={styles.errorText}>{error}</p>}
          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input
              className={styles.input}
              ref={emailRef}
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
            />
          </label>
          <div className={styles.passwordField}>
            <label className={styles.field}>
              <span className={styles.label}>Password</span>
              <input
                className={`${styles.input_pass} ${styles.input}`}
                ref={passwordRef}
                type={visible ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </label>
            <button
              type="button"
              className={styles.toggleButton}
              onClick={handleVisible}
              aria-label={visible ? "Hide password" : "Show password"}
            >
              {visible ? (
                <FaEye className={styles.toggleIcon} />
              ) : (
                <FaEyeSlash className={styles.toggleIcon} />
              )}
            </button>
          </div>
          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className={styles.switchText}>
            New here?
            <Link to="/signup" className={styles.switchLink}>
              Create an account
            </Link>
            <GoogleLogin />
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
