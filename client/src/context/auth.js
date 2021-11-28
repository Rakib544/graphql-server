import { createContext, useReducer } from "react";

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
  const [state, dispatch] = useReducer(authReducer, { user: null });

  const login = (userInfo) => {
    dispatch({
      type: "LOGIN",
      payload: userInfo,
    });
  };

  const logout = () => {
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
