import { useCitieis } from "../contexts/CitiesContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";

import Spinner from "./Spinner";

/* eslint-disable react/prop-types */
export default function CountryList() {
  const { cities, isLoading } = useCitieis();

  if (isLoading) {
    <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="adding your first city by clicking on city on map" />
    );
  }

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
      //arr.push(value);
    } else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((item) => {
        return <CountryItem key={item.country} country={item} />;
      })}
    </ul>
  );
}
