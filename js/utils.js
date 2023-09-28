export function validarCedula(cedula) {
    const digitosArray = Array.from(cedula);
    const coeficientes= [2,1,2,1,2,1,2,1,2,0];
    let acum=0;
    let multiplicacion_parcial = 0;
    let decena=0;
    let result=0

    digitosArray.forEach((digito, index)=>{
        if(index<9){
            //console.log(digito +" * "+coeficientes[index].toString());
            multiplicacion_parcial=parseInt(digito)*coeficientes[index];
            if(multiplicacion_parcial>9){
                multiplicacion_parcial-=9;
            }
            acum+=multiplicacion_parcial;
        }
    });
  

    decena=((parseInt(acum/10))+1)*10;
    result = decena-acum;  

    return result===parseInt(digitosArray[9]); 
    
  }

export function validaCita(hora,fecha){
    
}

export function getDatetimestamp(dia, mes, anio, hora, minuto){
    //console.log(anio, mes, dia, hora, minuto);
    const fecha = new Date(anio, mes, dia, hora, minuto);
    //console.log(fecha.getTime());
    return fecha.getTime();
}

