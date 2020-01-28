class Female extends Human {
    constructor(_moleculeId) {
        super(_moleculeId);
        this.stroke = color(255, 60, 60);
        this.fill = color(255, 100, 100);
        this.molType=2;
    }
   
}

class OldFemale extends Female {
    constructor(_moleculeId) {
        super(_moleculeId);
        this.pulseSpeed = 0.2;
        this.fill = color(255, 40, 40, 100)
    }
}

class YoungFemale extends Female {
    constructor(_moleculeId) {
        super(_moleculeId);
        this.pulseSpeed = 1;
        this.pulseRadiusMax = 20;
        this.fill = color(255, 100, 100, 240)
    }
}