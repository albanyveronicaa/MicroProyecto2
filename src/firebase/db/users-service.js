import{ 
    where,
    doc,
    addDoc,
    getDoc,
    setDoc,
    getDocs, 
    updateDoc, 
    collection, 
    query } from 'firebase/firestore'
import { db } from '../config'

export const users_collection = "usuarios";

export async function crearUsuario(data) {
  const { uid, ...restData } = data;

  if (uid) {
    return setDoc(doc(db, users_collection, uid), restData);
  }
  return addDoc(collection(db, users_collection), restData);
}

export async function getUsuarioId(userId) {
    const userRef = doc(db, users_collection, userId);
    return getDoc(userRef);
  }

export async function actualizarUsuario(userId, data) {
  const userRef = doc(db, users_collection, userId);
  return updateDoc(userRef, data);
}

export async function getPerfilUsuario(email) {
  const userQuery = query(
    collection(db, users_collection),
    where("email", "==", email)
  );

  const resultados = await getDocs(userQuery);

  if (resultados.size > 0) {
    const [user] = resultados.docs.map((item) => ({
      ...item.data(),
      id: item.id,
    }));
    return user;
  }

  return null;
}