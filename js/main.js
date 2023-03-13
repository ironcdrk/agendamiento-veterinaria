import { validarCedula } from './utils.js';

const formClient = document.querySelector("#user-form");
let sectionMascota = document.getElementById("section_mascota");
let sectionUsuario = document.getElementById("section_usuario");
formClient.addEventListener('submit',function(ev){
    ev.preventDefault();
    console.log("submitting..");
    let cedula=document.querySelector("#usuario").value;
    if (validarCedula(cedula)){
        sectionUsuario.setAttribute("style","display:none")
        sectionMascota.removeAttribute("style");
        let mascotacontainer=document.querySelector("#dogsbred-container");
        const request = await fetch('https://run.mocky.io/v3/26d3bd34-6a01-47d2-9da3-0329ac8d18a8',{
            method: 'GET',
        });
        const data = await request.then((response)=>response.json())
        console.log(dogsbreedsdata);
        // dogsbreedsdata.forEach(()=>{
        //     const dblabel=document.createElement("label");
        //     dblabel.innerHTML = `
        //         ${data.nombre}
        //     `;
        //     mascotacontainer.appendChild(dblabel);
        // })
    }else{
        alert("cédula no válida")
    }
});