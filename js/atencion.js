
import { openAtencion } from './odm.js';
import { CanvasMapHighlight } from './maphighlight.js';

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
        const data = localStorage.getItem(element.title);
        if(data.length > 0){
            document.getElementById("examenfisico").value=data;
        } 

    });
});

const formExamen = document.querySelector('#examen-form');

formExamen.addEventListener('submit', function(event){
    event.preventDefault();
    const descripcion=document.getElementById("examenfisico").value;
    if(descripcion.length > 0){
        localStorage.setItem(element.title, descripcion);
    }
    else{
        alert("La información es requerida");
    }
});