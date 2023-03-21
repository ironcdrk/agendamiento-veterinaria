// const daysofweek = ['L','M','M','J','V','S','D'];
// class Calendar{
//     constructor(options){
//         this.date=options.date || new Date();
//         this.container=options.container;

//         this.buildCalendar();

//     }

//     buildCalendar(){
//         const containerHtml=document.querySelector(this.container);
//         daysofweek.forEach((item,i)=>{
//             let dayName = document.createElement('div');
//             dayName.classList.add('calendar_day');
//             dayName.innerHTML=item;
//             containerHtml.appendChild(dayName);
//         });
//     }
// }