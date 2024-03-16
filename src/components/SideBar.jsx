import Logo from "./Logo";
import AppNav from "./AppNav";

import styles from "./SideBar.module.css";
import { Outlet } from "react-router-dom";

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav></AppNav>

      <Outlet />

      {/* <p>List of cities</p> */}

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; copyright {new Date().getFullYear()} by worldwise inc.
        </p>
      </footer>
    </div>
  );
}
