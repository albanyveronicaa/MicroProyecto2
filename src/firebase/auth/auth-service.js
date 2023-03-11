import { 
    signInWithPopup, 
    signInWithEmailAndPassword,
    signOut, 
    createUserWithEmailAndPassword,
    getAdditionalUserInfo} 
    from "firebase/auth";
import { googleProvider } from "../../../Firebase/config";
import { crearUsuario } from "../../firebase/db/users-service";


export const signInWithGoogle = async () => {
    try{
       const resultado = await signInWithPopup(auth, googleProvider);
       
       const  {usuarioNuevo} = getAdditionalUserInfo(resultado);
       
       if(usuarioNuevo){
        await crearPerfilUsuario(resultado.user.uid, {
            nombre: resultado.user.displayName,
            correo: resultado.user.email,
            edad: 0,
            peliculas_favoritas: '' 
        })
       }
    } catch (error){
        console.error(error)
    }
};

//TODO
export const signWithEmailAndPassword = async () => {};

//TODO
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
       console.log("Registrar correo y contraseña", resultado)
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

