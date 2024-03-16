import { NavLink } from "react-router-dom";
import Logo from "../components/Logo";

import styles from "../components/PageNav.module.css";

export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo></Logo>

      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            LOGIN
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
