import styles from "./Login.module.css";
import PageNav from "../components/PageNav";

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authProvider";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const Navigate = useNavigate();

  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) Navigate("/app", { replace: true });
  }, [Navigate, isAuthenticated]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button
            type={"primary"}
            onClick={(e) => {
              e.preventDefault();
              if (email && password) login(email, password);
            }}
          >
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
