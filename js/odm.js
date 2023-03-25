import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';

import { getFirestore, doc, setDoc, getDoc, collection } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

import firebaseConfig from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export async function addAtencion(id, citaObj){
    
    await setDoc(doc(db, "atencion", id), {
        citaObj
    });
}

export async function saveAtencion(id, citaObj){
    
    await setDoc(doc(db, "historia", id), {
        citaObj
    });
}

export async function openAtencion(id){
    try {
        // console.log(db.collection('citas').doc(id).get());
        // const docRef = doc(db, "citas", id);
        const docSnap = await getDoc(doc(db, "atencion", id.toString()));
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            
          } else {
            console.log("No such document!");
          }
    } catch(error) {
        console.log(error)
    }
}