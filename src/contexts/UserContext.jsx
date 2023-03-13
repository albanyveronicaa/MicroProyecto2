import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";

export const UserContext = React.createContext({});

export function UserContextProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      console.log(firebaseUser);

      if (firebaseUser) {
        setUsuario({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
        });
      } else {
        setUsuario(null);
      }
      setIsLoadingUser(false);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoadingUser,
        setIsLoadingUser,
        usuario,
        setUsuario,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
