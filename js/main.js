import { validarCedula } from './utils.js';

const formClient = document.querySelector("#user-form");
const sectionMascota = document.getElementById("section_mascota");
const sectionUsuario = document.getElementById("section_usuario");
const sectionFechahora = document.getElementById("section_fechahora");

formClient.addEventListener('submit', async function(ev){
    ev.preventDefault();
    console.log("submitting..");
    let cedula=document.querySelector("#usuario").value;
    if (validarCedula(cedula)){
        sectionUsuario.setAttribute("style","display:none")
        sectionMascota.removeAttribute("style");
        
        const data = await getDogsBreed();
        buildRBDogsBreed(data['dogsbred']);
        
    }else{
        alert("cédula no válida")
    }
});

async function getDogsBreed(){
    const request = await fetch('https://run.mocky.io/v3/26d3bd34-6a01-47d2-9da3-0329ac8d18a8',{
            method: 'GET',
        })
    return await request.json();
}

function buildRBDogsBreed(data){
    document.querySelector("#dogsbred-container").innerHTML = '';
    for (let key in data) {
        console.log("Key:" + key);
        console.log("Value:" + data[key]['nombre']);
        
        let label = document.createElement('label')
        label.setAttribute("class", "radiolabel");
        //label.htmlFor = 'dogbreed';

        let elemento = document.createElement('input');
        elemento.setAttribute("type", "radio");
        elemento.setAttribute("name", "dogbreed");
        elemento.setAttribute("value", data[key]['nombre']);
        label.appendChild(elemento);

        let span=document.createElement('span');
        span.setAttribute("class", "radiocheck");
        label.appendChild(span);  

        let description = document.createTextNode(data[key]['nombre']);
        label.appendChild(description);      

        document.querySelector("#dogsbred-container").appendChild(label);
    }
}


let btnPrev2 = document.getElementById("prev-2");
btnPrev2.addEventListener('click', async function(ev){
   
    console.log("prev..");
    sectionMascota.setAttribute("style","display:none")
    sectionUsuario.removeAttribute("style");
    
});

let btnNext2 = document.getElementById("next-2");
btnNext2.addEventListener('click', async function(ev){
   
    console.log("next..");
    sectionMascota.setAttribute("style","display:none")
    sectionFechahora.removeAttribute("style");
    
});


let btnPrev3 = document.getElementById("prev-3");
btnPrev3.addEventListener('click', async function(ev){
   
    console.log("prev..");
    sectionFechahora.setAttribute("style","display:none")
    sectionMascota.removeAttribute("style");
    
});

// let btnNext3 = document.getElementById("next-3");
// btnNext3.addEventListener('click', async function(ev){
   
//     console.log("next..");
//     sectionMascota.setAttribute("style","display:none")
//     sectionFechahora.removeAttribute("style");
    
// });
