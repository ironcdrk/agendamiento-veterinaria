
import { openCita } from './odm.js';
import { CanvasMapHighlight } from './maphighlight.js';

const maphighlight = new CanvasMapHighlight({'canvasMap' : 'regionsMapCanvas'});
const mapAreas = document.querySelectorAll(".area");

mapAreas.forEach((element)=>{
    element.addEventListener('mouseover', function(ev){
        const coordsArray=element.coords.split(",").map((item)=>parseInt(item));
        console.log(coordsArray);
        maphighlight.buildHighlightArea(coordsArray);
    });
});