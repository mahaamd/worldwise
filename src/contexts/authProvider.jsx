import React, { createContext, useContext, useReducer } from "react";

const LoginContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      console.log("here on login part");
      return { ...state, user: action.payload, isAuthenticated: true };

    case "logout":
      return { ...state, user: null, isAuthenticated: false };

    default:
      break;
  }
}

function AuthProvider({ children }) {
  const [{ isAuthenticated, user }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    console.log("here we are in the login");

    if (FAKE_USER.email === email && FAKE_USER.password === password) {
      console.log("is auth or not");
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <LoginContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
}

function useAuth() {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("cities context was used outside the provider");
  }
  return context;
}

export { AuthProvider, useAuth };
