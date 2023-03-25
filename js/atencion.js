
import { openCita } from './odm.js';
import { CanvasMapHighlight } from './maphighlight.js';

const maphighlight = new CanvasMapHighlight({'canvasMap' : 'regionsMapCanvas'});
const mapAreas = document.querySelectorAll(".area");

// maphighlight.buildHighlightArea([300,0,200,200]); //craneo
// maphighlight.buildHighlightArea([80,150,250,70]); //lumbar
// maphighlight.buildHighlightArea([10,180,80,155]); // cola
// maphighlight.buildHighlightArea([10,320,160,160]); // extremidades posteriores
// maphighlight.buildHighlightArea([200,320,160,190]); // extremidades delanteras
// maphighlight.buildHighlightArea([80,210,250,70]); // abdominal


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
        
    });
});