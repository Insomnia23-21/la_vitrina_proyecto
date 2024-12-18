import React, { createContext, useState } from "react";

// Crear el contexto
export const Context = createContext();

// Proveedor del contexto
const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <Context.Provider value={{ user, login, logout }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;