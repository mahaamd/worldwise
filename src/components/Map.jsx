import styles from "./Map.module.css";

import { useNavigate, useSearchParams } from "react-router-dom";

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // console.log(lat, lng);

  return (
    <div onClick={() => navigate("form")} className={styles.mapContainer}>
      Map
    </div>
  );
}
