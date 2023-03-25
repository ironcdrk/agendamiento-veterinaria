export class CanvasMapHighlight{
    constructor(options){
        
        this.canvasMap=document.getElementById(options.canvasMap);
        this.bgcolor = options.bgcolor || 'rgba(0,0,0,0.3)';     
    }

    build(coords) {
        try{
            this.ctx = this.canvasMap.getContext("2d");   
        }
        catch(error){
            console.error(e); 
        }
        //this.ctx.clearRect(0, 0, this.canvasMap.width,this.canvasMap.height);
        this.ctx.fillStyle = this.bgcolor;
        this.ctx.fillRect(...coords);
    }

    destroy(coords) {
        try{
            this.ctx = this.canvasMap.getContext("2d");   
        }
        catch(error){
            console.error(e); 
        }
        this.ctx.clearRect(0, 0, this.canvasMap.width,this.canvasMap.height);
    }
        
}