import { 
    signInWithPopup, 
    signInWithEmailAndPassword,
    signOut, 
    createUserWithEmailAndPassword,
    getAdditionalUserInfo} 
    from "firebase/auth";
import { googleProvider, auth } from "../config";
import { crearUsuario } from "../../firebase/db/users-service";


export const signInWithGoogle = async () => {
    try{
       const resultado = await signInWithPopup(auth, googleProvider);
       
       const  {usuarioNuevo} = getAdditionalUserInfo(resultado);
       
       if(usuarioNuevo){
        await crearUsuario(resultado.user.uid, {
            name: resultado.user.displayName,
            email: resultado.user.email,
            age: 0,
            peliculas_favoritas: '' 
        })
       }
    } catch (error){
        console.error(error)
    }
};

export const signWithEmailAndPassword = async (
    email, 
    password, 
    extraData
    ) => {
    try{
       const resultado= await createUserWithEmailAndPassword(auth, email, password);
       console.log("Registrar email y contraseña", resultado)
       await crearUsuario(resultado.user.uid, {
        email,
        ...extraData
       });
    }catch(error){
        console.log(error)
    }
}

export const logout = async () => {
    try{
        await signOut(auth);

    }catch(error) {
        console.log(error);
    }
};

export const registerWithEmailAndPassword = async (
    email, 
    password, 
    extraData
    ) => {
    try{
       const resultado= await createUserWithEmailAndPassword(auth, email, password);
       console.log("Registrar email y contraseña", resultado)
       await crearUsuario(resultado.user.uid, {
        email,
        ...extraData
       });
    }catch(error){
        console.log(error)
    }
};

export const loginWithEmailAndPassword = async(email, password) => {
    try{
        const resultado =  await signInWithEmailAndPassword(auth, email, password);
        console.log("LOGIN", resultado);

    }catch(error){
        console.log(error)
    }
}

