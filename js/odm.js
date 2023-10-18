import { app, db, doc, setDoc, getDoc } from './dbConfig.js';

export async function addCita(id, dataObj){
    const docRef = await searchCita(id); 
    if (docRef){
        throw  new Error("Horario no disponible");
    }
    else{
        await setDoc(doc(db, "citas", id.toString()), dataObj);
        return "Cita agendada exitosamente";
    }

}

export async function searchCita(id){
    try {       
        const docSnap = await getDoc(doc(db, "citas", id.toString()));     
        return docSnap.exists() ? docSnap: false;
    } catch(error) {
        console.log("Error => "+error);
        return false;
    }
}