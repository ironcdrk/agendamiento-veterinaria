const daysofWeek = ['L','M','M','J','V','S','D'];
const mapdaysofMonth= [];
export class Calendar{
     constructor(options){
        console.log(options);
        this.date=options.date || new Date();
         this.container=options.container;
         this.buildCalendar();
         this.updateCalendar();

     }

    buildCalendar(){
         const containerHtml=document.querySelector(this.container);
        //  daysofWeek.forEach((item,i)=>{
        //      let dayName = document.createElement('div');
        //      dayName.classList.add('calendar_number');
        //      dayName.innerHTML=item;
        //      containerHtml.appendChild(dayName);
        //  });
     }

    calculateDates(){
        this.monthStart = new Date(this.date.getFullYear(), this.date.getMonth(),1);
        this.monthEnd = new Date(this.date.getFullYear(), this.date.getMonth()+1,1);
        this.monthLength = Math.floor((this.monthEnd - this.monthStart)/(1000*60*60*24));
    }

    updateCalendar(){
        this.calculateDates();

        let firstDayInWeek = this.monthStart.getDay();
        console.log("firstDayInWeek: "+firstDayInWeek);
        const containerHtml=document.querySelector(this.container);
        let currentDay=1;
        for(let row=1; row<42; row++){
            let dayName = document.createElement('div');
            dayName.innerHTML="";
            if(row>=firstDayInWeek){
                dayName.classList.add('calendar_number');
                dayName.innerHTML=currentDay;
                currentDay++;
            }
            containerHtml.appendChild(dayName);
            if(currentDay>this.monthLength){
                break;
            }
        }
        //console.log(daysofWeek[firstDayInWeek]);

    }

}