import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';

import { getFirestore, doc, setDoc, getDoc,  } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

import firebaseConfig from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export async function addCita(id, citaObj){
    
    await setDoc(doc(db, "citas", id), {
        citaObj
    });
}

export async function searchCita(id){
    try {
        // console.log(db.collection('citas').doc(id).get());
        // const docRef = doc(db, "citas", id);
        const docSnap = await getDoc(doc(db, "citas", id.toString()));
        //console.log(await docSnap.exists());
        const querydoc = await docSnap.exists();
        return querydoc ? true: false;
    } catch(error) {
        console.log(error)
        return false;
    }
}


export async function getCita(id){
    try {
        const docSnap = await getDoc(doc(db, "citas", id.toString()));
        if (await docSnap.exists()) {
            console.log("Document data:", await docSnap.data());
            return await docSnap.data();
          } else {
            console.log("No such document!");
            return false;
          }
    } catch(error) {
        console.log(error)
        return false;
    }
}

export async function addAtencion(id, atencionObj){
    
    await setDoc(doc(db, "atenciones", id), {
        atencionObj
    });
}

export async function getAtencion(id){
    try {
        const docSnap = await getDoc(doc(db, "atenciones", id.toString()));
        if (await docSnap.exists()) {
            console.log("Document data:", await docSnap.data());
            return await docSnap.data();
          } else {
            console.log("No such document!");
            return false;
          }
    } catch(error) {
        console.log(error)
        return false;
    }
}