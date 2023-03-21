import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';

import { getFirestore, doc, setDoc, collection } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

import firebaseConfig from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export async function addCita(id, citaObj){
    // addDoc(collection(db,"citas"), {
    //     citaObj
    // });
    await setDoc(doc(db, "citas", id), {
        citaObj
    });
}