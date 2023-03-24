import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js';

import { getFirestore, doc, setDoc, getDoc, collection } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

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

export async function openCita(id){
    try {
        // console.log(db.collection('citas').doc(id).get());
        // const docRef = doc(db, "citas", id);
        const docSnap = await getDoc(doc(db, "citas", id.toString()));
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
    } catch(error) {
        console.log(error)
    }
}