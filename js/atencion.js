
import { CanvasMapHighlight } from './maphighlight.js';

import { getCita, addAtencion, getAtencion } from './odm.js';

import { onAuthStateChanged,getAuth,signOut } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

const auth = getAuth();

onAuthStateChanged(auth, function(user){
    if(!user){
        window.location="/";
    }
});

async function closeSession(){
    try{        
        return await signOut(auth);
    }
    catch(error){
        console.log(error);
    }
}

const dataCita = await getCita(localStorage.getItem("atencionId"));
console.log("dataCita => "+ dataCita.citaObj.nombre);
if(!dataCita){
    window.location="dashboard.html";
}
else{
    document.querySelector("#nombre").innerHTML=dataCita.citaObj.nombre;
    document.querySelector("#mascota").innerHTML=dataCita.citaObj.mascota;
}


const dataAtencion = await getAtencion(localStorage.getItem("atencionId"));
console.log("dataAtencion => "+ dataAtencion.atencionObj);
if(dataAtencion){
    document.querySelector("#temperatura").value=dataAtencion.atencionObj.temperatura;
    document.querySelector("#peso").value=dataAtencion.atencionObj.peso;
    dataAtencion.atencionObj.craneo ? localStorage.setItem("Cráneo",dataAtencion.atencionObj.craneo) : null ;
    dataAtencion.atencionObj.lumbar ? localStorage.setItem("Lumbar",dataAtencion.atencionObj.lumbar) : null ;
    dataAtencion.atencionObj.exdelanteras ? localStorage.setItem("Extremidades delanteras",dataAtencion.atencionObj.exdelanteras) : null ;
    dataAtencion.atencionObj.exposteriores ? localStorage.setItem("Extremidades posteriores",dataAtencion.atencionObj.exposteriores) : null ;
    dataAtencion.atencionObj.abdomen ? localStorage.setItem("Abdomen",dataAtencion.atencionObj.abdominal) : null ;
    dataAtencion.atencionObj.cola ? localStorage.setItem("Cola",dataAtencion.atencionObj.cola) : null ;
    document.querySelector("#examenfisico").value=localStorage.getItem("Cráneo");
}

const loginButton = document.querySelector('#btncloseSession');

loginButton.addEventListener('click', function(ev){
    closeSession();
});

const maphighlight = new CanvasMapHighlight({'canvasMap' : 'regionsMapCanvas'});
const mapAreas = document.querySelectorAll(".area");

mapAreas.forEach((element)=>{
    element.addEventListener('mouseover', function(event){
        const coordsArray=element.dataset.coords.split(",").map((item)=>parseInt(item));
        // console.log(coordsArray);
        maphighlight.build(coordsArray);
    });
    element.addEventListener('mouseout', function(event){
        // console.log(coordsArray);
        maphighlight.destroy();
    });
    element.addEventListener('click', function(event){
        console.log(element.title);
        document.getElementById("examenfisico-title").innerHTML=element.title;
        document.getElementById("examenfisico").value="";
        const title=document.getElementById("examenfisico-title").innerHTML;
        const data = localStorage.getItem(title);
        if(data){
            document.getElementById("examenfisico").value=data;
        } 

    });
});

const formExamen = document.querySelector('#examen-form');

formExamen.addEventListener('submit', function(event){
    event.preventDefault();
    console.log("submitting ...");
    const title=document.getElementById("examenfisico-title").innerHTML;
    const descripcion=document.getElementById("examenfisico").value;
    localStorage.setItem(title, descripcion);
    const modal = document.getElementById("modalBox");
    modal.style.display = "block";
    setTimeout(() => {
        modal.style.display = "none";
        }, 3000);
});

const formSignos = document.querySelector('#signosvitales-form');

formSignos.addEventListener('submit', function(event){
    event.preventDefault();
    console.log("submitting ...");
    const temp=document.getElementById("temperatura").value;
    const peso=document.getElementById("peso").value;
    localStorage.setItem("temperatura", temp);
    localStorage.setItem("peso", peso);
    const modal = document.getElementById("modalBox");
    modal.style.display = "block";
    setTimeout(() => {
        modal.style.display = "none";
        }, 3000);
});

const finAtencion = document.querySelector('#btn-finatencion');

finAtencion.addEventListener('click', async function(ev){
    console.log("finalizando atención ...");
    try{
        await addAtencion(localStorage.getItem("atencionId"),{ 
            temperatura: localStorage.getItem("temperatura"), 
            peso: localStorage.getItem("peso"), 
            craneo: localStorage.getItem("Cráneo"),
            lumbar: localStorage.getItem("Lumbar"),
            abdomen: localStorage.getItem("Abdomen"),
            cola: localStorage.getItem("Cola"),
            exdelanteras: localStorage.getItem("Extremidades delanteras"),
            exposteriores: localStorage.getItem("Extremidades posteriores"),
        });   
        localStorage.clear();
        const modal = document.getElementById("modalBox");
        modal.style.display = "block";
        setTimeout(() => {
            modal.style.display = "none";
            window.location="dashboard.html";
        }, 3000);
    }
    catch(error){
        alert("Su registro no pudo ser guardado");
        console.log(error);
    }
});