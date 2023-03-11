import{ 
    where,
    doc,
    addDoc,
    getDocs, 
    updateDoc, 
    collection, 
    query } from 'firebase/firestore';

import { db } from "../firebase/config";

export async function crearListaFavoritos(data){

    return addDoc(collection(db, "favoritos", data))
}


export async function actualizarListaFavoritos(listaFavoritosId, data){

    const listRef = doc(db, "favoritos", listaFavoritosId);
    return updateDoc(listRef, data);
}

export async function fetchFavoritesByUserId(userId){
    const favoriteQuery = query(
        collection(db, 'favoritos'),
        where ("userId", "==", userId)
    )

    const results = await getDocs(favoriteQuery);

    if(results.size > 0){
        const [listaFavoritos] = results.docs.map((item)=> ({
            ...item.data(),
            id: item.id
        }));

        const [user] = listaFavoritos;
        return user;
        
    }else{
        return null;
    }
}

