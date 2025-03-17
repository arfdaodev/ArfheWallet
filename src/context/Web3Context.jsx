import { createContext, useState } from "react";
import React from "react";

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [privateKey, setPrivateKey] = useState(null);

  return (
    <Web3Context.Provider value={{ privateKey, setPrivateKey }}>
      {children}
    </Web3Context.Provider>
  );
};
