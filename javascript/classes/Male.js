class Male extends Human {
    constructor(_moleculeId){
        super(_moleculeId);
        this.stroke=color(20,100,255);
        this.fill = color(80, 180, 255);
        this.molType=1;
    }
}