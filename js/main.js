import { validarCedula, getDatetimestamp } from './utils.js';
import { addAtencion } from './odm.js';

const formClient = document.querySelector("#user-form");
const sectionMascota = document.getElementById("section_mascota");
const sectionUsuario = document.getElementById("section_usuario");
const sectionFechahora = document.getElementById("section_fechahora");

formClient.addEventListener('submit', async function(ev){
    ev.preventDefault();
    console.log("submitting..");
    let cedula=document.querySelector("#usuario").value;
    let nombre=document.querySelector("#nombre").value;
    let mascota=document.querySelector("#mascota").value;
    if (validarCedula(cedula)){

        sectionUsuario.setAttribute("style","display:none")
        sectionMascota.removeAttribute("style");
        
        const data = await getDogsBreed();
        buildRBDogsBreed(data['dogsbred']);

        localStorage.setItem("cedula", cedula);
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("mascota", mascota);
        document.getElementById("datosgenerales-check").removeAttribute("style");
        
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


const formDogsBreed = document.querySelector("#mascota-form");
formDogsBreed.addEventListener('submit', function(ev){
    ev.preventDefault();
    console.log("submitting..");
    let dogsbreed=document.querySelector("input[name='dogbreed']:checked");
    if(dogsbreed) {
        let dogsbreedVal=dogsbreed.value;
        console.log(dogsbreedVal);
        sectionMascota.setAttribute("style","display:none")
        sectionFechahora.removeAttribute("style");
        localStorage.setItem("raza", dogsbreedVal);
        document.getElementById("datosmascota-check").removeAttribute("style");
    } else {
        alert('No ha seleccionado ninguna raza');
    }
});

let btnPrev2 = document.getElementById("prev-2");
btnPrev2.addEventListener('click', function(ev){
   
    console.log("prev..");
    sectionMascota.setAttribute("style","display:none")
    sectionUsuario.removeAttribute("style");
    
});

// let btnNext2 = document.getElementById("next-2");
// btnNext2.addEventListener('click', async function(ev){
   
//     console.log("next..");
//     sectionMascota.setAttribute("style","display:none")
//     sectionFechahora.removeAttribute("style");
    
// });


let btnPrev3 = document.getElementById("prev-3");
btnPrev3.addEventListener('click', function(ev){
   
    console.log("prev..");
    sectionFechahora.setAttribute("style","display:none")
    sectionMascota.removeAttribute("style");
    
});

let btnNext3 = document.getElementById("next-3");
btnNext3.addEventListener('click', async function(ev){
    console.log("finishing..");

    const mesSelected=document.querySelector(".calendar_lblmonth").innerHTML;
    const daySelectedItem=document.querySelector(".calendar_number_selected");
    const horaSelectedItem=document.querySelector(".btn_horario_selected");
    if(horaSelectedItem && daySelectedItem){
        const horaSelected = horaSelectedItem.textContent.trim();
        const h = horaSelected.split(':')[0];
        const m = horaSelected.split(':')[1];
        const daySelected = parseInt(daySelectedItem.innerHTML);      
        const citatimestamp=getDatetimestamp(daySelected, meses.findIndex((m)=>m===mesSelected)+1, 2023, h,m );
        localStorage.setItem("datetime", citatimestamp);
        console.log("timestampId => "+citatimestamp);
    }
    else{
        alert("No ha seleccionado una hora");
    }
    try{
        await addAtencion(localStorage.getItem("datetime"),{ 
            fecha: localStorage.getItem("datetime"), 
            cedula: localStorage.getItem("cedula"), 
            raza: localStorage.getItem("raza"),
            nombre: localStorage.getItem("nombre"),
            mascota: localStorage.getItem("mascota"),
        });   
        document.getElementById("datosmascota-check").removeAttribute("style");
        localStorage.clear()
    }
    catch(error){
        alert("Su registro no pudo ser guardado");
    }
});



// Manejo de calendario

const daysnumber = document.querySelectorAll(".calendar_number");

const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const dias = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sábado'];


daysnumber.forEach((element, key)=>{
    element.addEventListener('click', function(ev){
        daysnumber.forEach((element, key)=>{element.classList.remove("calendar_number_selected");});
        console.log("seting a day..");
        console.log(element);
        //document.querySelector(".num_date").innerHTML=element.innerHTML;
    });
});

const daysHour = document.querySelectorAll(".btn_horario");
daysHour.forEach((element, key)=>{
    element.addEventListener('click', function(ev){
        daysHour.forEach((element, key)=>{element.classList.remove("btn_horario_selected");});
        console.log("setting hour..");
        console.log(element.textContent);
        element.classList.add("btn_horario_selected");
    });
});

const fecha = new Date();
console.log("dia del mes: " + fecha.getDate());
console.log("dia actual: " + dias[fecha.getDay()]);
console.log("mes: " + meses[fecha.getMonth()]);

// añadir estilo a fecha actual
const diasCalendario= document.querySelectorAll(".calendar_number");
diasCalendario.forEach((element, key)=>{
    if(element.innerHTML==fecha.getDate()){
        element.classList.add('calendar_number_selected');
    }
});

const diaActual= document.querySelectorAll(".calendar_lblday");
diaActual.forEach((element, key)=>{
    element.innerHTML=fecha.getDate();
});
const diaSemanaActual= document.querySelectorAll(".calendar_lbldayofweek");
diaSemanaActual.forEach((element, key)=>{
    element.innerHTML=dias[fecha.getDay()];
});
const mesActual= document.querySelectorAll(".calendar_lblmonth");
mesActual.forEach((element, key)=>{
    element.innerHTML=meses[fecha.getMonth()];
});

function refreshSelectedDate(dia, mes, anio=2023){
    const fecha = new Date(anio, mes, dia);
    const diaActual= document.querySelectorAll(".calendar_lblday");
    diaActual.forEach((element, key)=>{
        element.innerHTML=dia;
    });
    const diaSemanaActual= document.querySelectorAll(".calendar_lbldayofweek");
    let index = dias[fecha.getDay()+1] ? fecha.getDay()+1 : 0;
    diaSemanaActual.forEach((element, key)=>{
        element.innerHTML=dias[index];
    });
    const mesActual= document.querySelectorAll(".calendar_lblmonth");
    mesActual.forEach((element, key)=>{
        element.innerHTML=meses[mes];
    });

}


