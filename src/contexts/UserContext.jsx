import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { getPerfilUsuario } from "../firebase/db/users-service";

export const UserContext = React.createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  //para saber si el usuario está cargando
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  //para saber que usuario está iniciado
  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoadingUser(true);

      if (firebaseUser && !user) {
        const perfilUsuario = await getPerfilUsuario(firebaseUser.email);

        setUser(perfilUsuario);
      } else {
        setUser(null);
      }

      setIsLoadingUser(false);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoadingUser,
        setIsLoadingUser,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}