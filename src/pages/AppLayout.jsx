import SideBar from "../components/SideBar";
import Map from "../components/Map";
import styles from "./Applayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
}
