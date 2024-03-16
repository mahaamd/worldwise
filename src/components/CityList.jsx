import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";

import Spinner from "./Spinner";

/* eslint-disable react/prop-types */
export default function CityList({ cities, isLoading }) {
  if (isLoading) {
    <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="adding your first city by clicking on city on map" />
    );
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((item) => {
        return <CityItem key={item.id} city={item} />;
      })}
    </ul>
  );
}
