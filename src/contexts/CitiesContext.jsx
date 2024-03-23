import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:3000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isloading: false, cities: action.payload };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    case "cities/created":
      return { ...state, cities: [...state.cities, action.payload] };
    case "cities/deleted":
      return {
        ...state,
        cities: state.cities.filter((item) => item.id !== action.payload),
      };
    case "cities/get":
      return {
        ...state,
        currentCity: action.payload,
      };
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState();
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: "rejected", payload: "there is no data found" });
      }
    }
    // console.log(res);
    fetchData();
  }, []);

  async function getCity(id) {
    // console.log(typeof id);
    // console.log(typeof cities[0].id);
    // console.log(id);
    // dispatch({ type: "cities/get", payload: id });
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities?id=${id}`);
      const data = await res.json();
      console.log(data);
      dispatch({ type: "cities/get", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: "there is no data found" });
    }
    //    dispatch({ type: "cities/get", payload: id });
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });

      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "cities/created", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: "there is no data found" });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });

      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "cities/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "rejected", payload: "there is no data found" });
    }
  }

  //const { cities, isLoading, currentCity } = state;

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
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
