import { searchCita } from './odm.js';
import { getDatetimestamp } from './utils.js';

export async function disableBookedHoursbyDay(selecteddate){
    try {
        const hmarray=[{'h': '08','m': '00'},{'h': '08','m': '30'},{'h': '09','m': '00'},{'h': '09','m': '30'},{'h': '10','m': '00'},{'h': '10','m': '30'},
        {'h': '11','m': '00'},{'h': '11','m': '30'},{'h': '12','m': '00'},{'h': '12','m': '30'}];
        let date = selecteddate|| new Date();
        let bookedHours=[];
        for(let i=0; i<hmarray.length;i++){
            const id = getDatetimestamp( date.getDate() , date.getMonth()+1, date.getFullYear(), hmarray[i].h, hmarray[i].m);
            let bookedcita = await searchCita(id);
            if(bookedcita){
                bookedHours.push(hmarray[i].h+":"+hmarray[i].m);
            }
        };
        
        return bookedHours;
    } catch(error) {
        console.log(error)
        return false;
    }
}
