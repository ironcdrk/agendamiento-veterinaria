
import { openCita } from './odm.js';
import { getDatetimestamp } from './utils.js';

const btnCita = document.querySelectorAll(".card_bottom");

btnCita.forEach((element, key)=>{

    element.addEventListener('click', function(ev){
        const horaSelected = element.dataset.hour;
        const h = horaSelected.split(':')[0];
        const m = horaSelected.split(':')[1];
        const fechaActual = new Date();
        const id = getDatetimestamp( fechaActual.getDate() , fechaActual.getMonth()+1, fechaActual.getFullYear(), h, m);
        openCita(id);
    });
});