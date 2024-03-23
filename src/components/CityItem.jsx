import { Link, useLinkClickHandler } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCitieis } from "../contexts/CitiesContext";

export default function CityItem({ city }) {
  const { deleteCity } = useCitieis();

  const { cityName, emoji, date, id, position } = city;

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

  function hadndleClick(e) {
    e.preventDefault();
    deleteCity(city.id);
  }

  return (
    <li>
      <Link
        className={styles.cityItem}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button onClick={hadndleClick} className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  );
}
