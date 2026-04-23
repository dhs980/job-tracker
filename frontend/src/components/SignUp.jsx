import { useContext, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

import { AuthContext } from "../context/AuthContext";

import styles from "../css/SignUp.module.css";
//react icons
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUp() {
  const { setToken, error, setError, loading, setLoading } =
    useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  let nameRef = useRef(null);
  let emailRef = useRef(null);
  let passwordRef = useRef(null);
  let passwordConfirmRef = useRef(null);
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const signupData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      passwordConfirm: passwordConfirmRef.current.value,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/signup",
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
    <div className={styles.SignUp_Container1}>
      <div className={styles.SignUp_Container2}>
        <form onSubmit={handleSubmit} className={styles.SignUp_Container3}>
          <p className={styles.eyebrow}>Start with a cleaner workflow</p>
          <div className={styles.formHeader}>
            <h2>Create Account</h2>
            <p>Set up your profile and start tracking opportunities.</p>
          </div>
          {error && <p className={styles.errorText}>{error}</p>}
          <label className={styles.field}>
            <span className={styles.label}>Name</span>
            <input
              className={styles.input}
              ref={nameRef}
              type="text"
              name="name"
              placeholder="Enter your name"
              autoComplete="name"
            />
          </label>

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
                placeholder="Create a password"
                autoComplete="new-password"
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
          <div className={styles.passwordField}>
            <label className={styles.field}>
              <span className={styles.label}>Confirm password</span>
              <input
                className={`${styles.input_pass} ${styles.input}`}
                ref={passwordConfirmRef}
                type={visible ? "text" : "password"}
                name="passwordConfirm"
                placeholder="Confirm password"
                autoComplete="new-password"
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
            {loading ? "Creating..." : "Sign up"}
          </button>
          <p className={styles.switchText}>
            Already have an account?{" "}
            <Link to="/login" className={styles.switchLink}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
