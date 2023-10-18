import { validarCedula, getDatetimestamp } from './utils.js';
import { addCita } from './odm.js';
import { Calendar } from './calendar.js';

import { disableBookedHoursbyDay } from './agendaValidations.js'


const formClient = document.querySelector("#user-form");
const sectionMascota = document.getElementById("section_mascota");
const sectionUsuario = document.getElementById("section_usuario");
const sectionFechahora = document.getElementById("section_fechahora");
const closeModalButton = document.querySelector(".close");


// Manejo de calendario

new Calendar({date: null, container: ".calendar_numbers"});

const daysnumber = document.querySelectorAll(".calendar_number");

const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const dias = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sábado'];

const fecha = new Date();
/*console.log("dia del mes: " + fecha.getDate());
console.log("dia actual: " + dias[fecha.getDay()]);
console.log("mes: " + meses[fecha.getMonth()]);*/

daysnumber.forEach((element, key)=>{
    element.addEventListener('click', async function(ev){
        cleanBookedHours();
        daysnumber.forEach((element, key)=>{element.classList.remove("calendar_number_selected");});
        console.log("seting a day..");
        const selectedfecha = new Date(fecha.getFullYear(),fecha.getMonth(),element.innerHTML);
        element.classList.add("calendar_number_selected");
        document.querySelector(".num_date").innerHTML=element.innerHTML;
        document.querySelector(".calendar_lbldayofweek").innerHTML=dias[selectedfecha.getDay()];
        await bookHours(selectedfecha);
    });
});

const daysHour = document.querySelectorAll(".btn_horario");


daysHour.forEach(async (element, key)=>{
    element.addEventListener('click', function(ev){
        daysHour.forEach((element, key)=>{element.classList.remove("btn_horario_selected");});
        console.log("setting hour..");
        console.log(element.textContent);
        element.classList.add("btn_horario_selected");
    });
});



// añadir estilo a fecha actual
const diasCalendario= document.querySelectorAll(".calendar_number");
diasCalendario.forEach((element)=>{
    if(element.innerHTML==fecha.getDate()){
        element.classList.add('calendar_number_selected');
    }
});

const diaActual= document.querySelectorAll(".calendar_lblday");
diaActual.forEach((element)=>{
    element.innerHTML=fecha.getDate();
});
const diaSemanaActual= document.querySelectorAll(".calendar_lbldayofweek");
diaSemanaActual.forEach((element)=>{
    element.innerHTML=dias[fecha.getDay()];
});
const mesActual= document.querySelectorAll(".calendar_lblmonth");
mesActual.forEach((element)=>{
    element.innerHTML=meses[fecha.getMonth()];
});

formClient.addEventListener('submit', async function(ev){
    ev.preventDefault();
    console.log("submitting..");
    let cedula=document.querySelector("#usuario").value;
    let nombre=document.querySelector("#nombre").value;
    let mascota=document.querySelector("#mascota").value;
    let celular=document.querySelector("#celular").value;
    if (validarCedula(cedula)){

        sectionUsuario.setAttribute("style","display:none")
        sectionMascota.removeAttribute("style");
        
        const data = await getDogsBreed();
        buildRBDogsBreed(data['dogsbred']);

        localStorage.setItem("cedula", cedula);
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("mascota", mascota);
        localStorage.setItem("celular", celular);
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
        //console.log("Key:" + key);
        //console.log("Value:" + data[key]['nombre']);
        
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
formDogsBreed.addEventListener('submit',async function(ev){
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
        document.getElementById("datosmascota-check").parentNode.classList.add("active");
        await bookHours(new Date());
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
    const daySelected = parseInt(daySelectedItem.innerHTML);   
    const diatimestamp=getDatetimestamp(daySelected, meses.findIndex((m)=>m===mesSelected)+1, 2023);
    let citatimestamp=null;
    console.log("diatimestamp");
    console.log(diatimestamp);
    if(horaSelectedItem && daySelectedItem){
        const horaSelected = horaSelectedItem.textContent.trim();
        const h = horaSelected.split(':')[0];
        const m = horaSelected.split(':')[1];   
        citatimestamp=getDatetimestamp(daySelected, meses.findIndex((m)=>m===mesSelected)+1, 2023, h,m );
        const dateFormat = daySelected +"-"+ (meses.findIndex((m)=>m===mesSelected)+1) + "-" + "2023";
        const timeFormat = h +":"+m;
        localStorage.setItem("fecha", dateFormat);
        localStorage.setItem("hora", timeFormat);
    }
    else{
        alert("No ha seleccionado una hora");
    }
    try{
        const docData = { 
            fecha: localStorage.getItem("fecha"), 
            hora: localStorage.getItem("hora"), 
            cedula: localStorage.getItem("cedula"), 
            raza: localStorage.getItem("raza"),
            propietario: localStorage.getItem("nombre"),
            celular: localStorage.getItem("celular"),
            mascota: localStorage.getItem("mascota"),
        } ;      
        await addCita(citatimestamp,docData);   
        document.getElementById("datosfecha-check").removeAttribute("style");
        document.getElementById("datosfecha-check").parentNode.classList.add("active");
        localStorage.clear()
        const modal = document.getElementById("modalBox");
        modal.style.display = "block";        
    }
    catch(error){
        alert("Ocurrió un error !! su registro no pudo ser guardado");
        console.log(error);
    }
});

async function bookHours(selectedDate){
    const bookedHours = await disableBookedHoursbyDay(selectedDate);
    daysHour.forEach((element)=>{
        bookedHours.forEach((el) => element.childNodes[1].data.trim() == el ? element.classList.add("booked_item") : '' ); 
    });
}


function cleanBookedHours(){
    daysHour.forEach((element)=>{
        daysHour.forEach((el) => element.classList.remove("booked_item")); 
    });
}

closeModalButton.addEventListener('click', function(){
   
    closeModalButton.closest("dialog").close();
    setTimeout(() => {
        window.location.href="/";
    }, "2000");
    
});