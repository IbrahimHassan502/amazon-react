import React, { useState, useContext } from "react";
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  // IS SUBMENU OPEN STATE
  const [subMenuOpen, setsubMenuOpen] = useState(false);
  return (
    <AppContext.Provider
      value={{
        subMenuOpen,
        setsubMenuOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
