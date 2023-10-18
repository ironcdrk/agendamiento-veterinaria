import { app, db, doc, setDoc, getDoc, updateDoc } from './dbConfig.js';

export async function addCita(id, dataObj){

    const docRef = doc(db, "citas", id);
    if(docRef){
       await setDoc(docRef, dataObj, { merge: true });
    }
    else{
        await setDoc(doc(db, "citas", id), 
        dataObj
    );
    }

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


export async function getCita(date, id){
    try {
        const docSnap = await getDoc(doc(db, "citas", date.toString()));
        if (await docSnap.exists()) {
            //console.log("Document data:", await docSnap.data());
            return await docSnap.data();
            //let citas = await docSnap.data();

          } else {
            //console.log("No such document!");
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