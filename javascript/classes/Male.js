class Male extends Human {
    constructor(_moleculeId){
        super(_moleculeId);
        this.stroke=color(20,100,255);
        this.fill = color(80, 180, 255);
        this.molType=1;
    }
}

class OldMale extends Male{
    constructor(_moleculeId) {
        super(_moleculeId);
        this.pulseSpeed=0.2;
        this.fill=color(20,80,255,100)
    }
}

class YoungMale extends Male {
    constructor(_moleculeId) {
        super(_moleculeId);
        this.pulseSpeed=1;
        this.pulseRadiusMax=20;
        this.fill = color(80, 180, 255, 240)
    }
}