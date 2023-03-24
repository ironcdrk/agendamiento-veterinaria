export class CanvasMapHighlight{
    constructor(options){
        console.log("options "+options);
        console.log("canvasMap "+options.canvasMap);
        this.canvasMap=document.getElementById(options.canvasMap);
        //this.coords= option.coords;
        this.bgcolor = options.bgcolor || 'rgba(0,0,0,0.2)';
        this.ctx = this.canvasMap.getContext("2d");        
        this.ctx.drawImage(document.getElementById("scream"),10,10);
    }

    buildHighlightArea(coords) {
        console.log("ctx "+this.ctx);
        // TODO validar existencia de canvas
        // ctx.font = "30px Arial";
        // ctx.strokeText("Hello World", 10, 50);
        //this.ctx.clearRect(0, 0, this.canvasMap.width,this.canvasMap.height);
        this.ctx.fillStyle = this.bgcolor;
        console.log('coords');
        console.log(...coords);
        this.ctx.fillRect(...coords);
        this.canvasMap.setAttribute('style','opacity: 0');
    }
        
}