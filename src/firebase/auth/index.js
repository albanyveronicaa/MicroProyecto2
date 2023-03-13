import {
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    getAdditionalUserInfo,
  } from "firebase/auth";
  import { auth, googleProvider } from "../config";
  import { crearUsuario } from "../db/users-service";
  
  export const signInWithGoogle = async ({ onSuccess, onFail }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { usuarioNuevo } = getAdditionalUserInfo(result);
  
      if (usuarioNuevo) {
        const { uid, email, displayName } = result.user;
        await crearUsuario({
          uid,
          email,
          name: displayName,
          age: "",
        });
      }
  
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      const errorCode = error?.code;
      const errorMessage = error?.message;
      const email = error?.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
  
      if (onFail) {
        onFail();
      }
  
      console.error("Verificación fallida", {
        errorCode,
        errorMessage,
        email,
        credential,
      });
    }
  };
  
  export const registerWithEmailAndPassword = async ({
    userData,
    onSuccess,
    onFail,
  }) => {
    try {
      const { email, password, ...restData } = userData;
      const firebaseResult = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      await crearUsuario({
        ...restData,
        email,
        uid: firebaseResult.user.uid,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Registro fallido", { error });
      if (onFail) {
        onFail();
      }
    }
  };
  
  export const loginWithEmailAndPassword = async ({
    userData,
    onSuccess,
    onFail,
  }) => {
    try {
      const { email, password } = userData;
      await signInWithEmailAndPassword(auth, email, password);
  
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Inicio fallido", { error });
  
      if (onFail) {
        onFail();
      }
    }
  };

  export const logout = async (callback) => {
    try {
      await signOut(auth);
  
      if (callback) {
        callback();
      }
    } catch (error) {
      console.error("Cerrar sesión fallido", { error });
    }
  };
  