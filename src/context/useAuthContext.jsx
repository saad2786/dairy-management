// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(sessionStorage.getItem("dairyId"));

  const data = {
    dairyId: auth,
    setDairyId: setAuth,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
