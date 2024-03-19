import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:3000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("there is no data found");
      } finally {
        setIsLoading(false);
      }
    }
    // console.log(res);
    fetchData();
  }, []);

  function getCity(id) {
    // console.log(typeof id);
    // console.log(typeof cities[0].id);
    // console.log(id);
    const city = cities.find((item) => String(item.id) === String(id));
    console.log(city);
    if (id !== undefined) setCurrentCity(city);
  }
  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        isLoading: isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCitieis() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("cities context was used outside the provider");
  }
  return context;
}

export { useCitieis, CitiesProvider };
