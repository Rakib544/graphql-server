import jwtDecode from "jwt-decode";
import { createContext, useReducer } from "react";

const initialState = { user: null };

if (localStorage.getItem("jwtToken")) {
  const token = jwtDecode(localStorage.getItem("jwtToken"));

  if (token.exp * 1000 < new Date().getTime()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = token;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userInfo) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userInfo) => {
    localStorage.setItem("jwtToken", userInfo.token);
    dispatch({
      type: "LOGIN",
      payload: userInfo,
    });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
