import React, { useContext, useState } from "react";
import { decodeToken } from "react-jwt";
import { authtoken } from "../constants";

const UserContext = React.createContext(null);

export const useUserContext = () => {
  const state = useContext(UserContext);
  if (!state) throw new Error(`state is undefined`);
  return state;
};

// useCallback hook to prevent unneccesary rerender

export const UserDetails = ({ children }) => {
  console.log(decodeToken(authtoken));
  const [user, setUser] = useState(decodeToken(authtoken));
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
