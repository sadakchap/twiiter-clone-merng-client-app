import { createContext, useReducer } from "react";

export const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  const login = (userData) => {
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
