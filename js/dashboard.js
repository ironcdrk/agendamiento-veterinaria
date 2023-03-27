
import { getDatetimestamp } from './utils.js';
import { searchCita } from './odm.js';

import { onAuthStateChanged,getAuth, signOut  } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

const auth = getAuth();

// onAuthStateChanged(auth, function(user){
//     if(!user){
//         window.location="/";
//     }
// });

async function closeSession(){
    try{        
        return await signOut(auth);
    }
    catch(error){
        console.log(error);
    }
}

const btnCita = document.querySelectorAll(".card_bottom");

btnCita.forEach((element, key)=>{

    element.addEventListener('click', function(ev){
        const horaSelected = element.dataset.hour;
        const h = horaSelected.split(':')[0];
        const m = horaSelected.split(':')[1];
        const fechaActual = new Date();
        const id = getDatetimestamp( fechaActual.getDate() , fechaActual.getMonth()+1, fechaActual.getFullYear(), h, m);
        getCita(id);
    });
});


const loginButton = document.querySelector('#btncloseSession');

loginButton.addEventListener('click', function(ev){
    closeSession();
});

async function getCita(id){
    //console.log(await searchAtencion(id));
    //searchAtencion(id);
    if(await searchCita(id)){
        localStorage.setItem("atencionId",id);
        window.location = "atencion.html";
    }
    else{
        alert("No existen datos para esa atención");
    }
}