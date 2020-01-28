class Human {
    constructor(_arrayPosition){
        this.originalRadius = random(minRadius,maxRadius);
        this.radius=this.originalRadius+guiVars.radiusBaseline;
        this.position = createVector(random(this.radius, width - this.radius * 2), random(this.radius, height - this.radius * 2));
        this.velocity = createVector(random(minVelocity, maxVelocity), random(minVelocity, maxVelocity));
        this.arrayPosition=_arrayPosition;
        this.isColliding=false;
        this.pulseRadius=0;
        this.pulseRadiusMax=15;
        //this.noiseIndex=random(1,100000000);
        //this.noiseIndex=1;
        this.fill = color(255, 255, 255);
        this.stroke = color(255, 255, 255);
        this.molType=0;
    }
    
    render() {
        stroke(this.stroke);
        strokeWeight(1);
        this.isColliding ? fill(this.fill) : noFill();

        push()
            translate(this.position.x,this.position.y);
            ellipse(0, 0, (this.radius) * 2, (this.radius ) * 2 );
        pop();
        this.isColliding=false;
    }
    
    step() {
        this.position.add(this.velocity);
        this.radius = this.originalRadius + guiVars.radiusBaseline;
    }

    pulseHuman(){
        if (this.pulseRadius < this.pulseRadiusMax) {
            this.pulseRadius+=0.9;
        } else {
            this.pulseRadius=0;
        }
        push()
            noFill()
            stroke(this.stroke)
            translate(this.position.x, this.position.y);
            ellipse(0, 0, (this.radius + this.pulseRadius) * 2, (this.radius + this.pulseRadius) * 2);
        pop();
    }
    
    checkEdges(){
        if(this.position.x < this.radius || this.position.x > width-this.radius){
            this.velocity.x = this.velocity.x * -1;
        }
        
        if(this.position.y < this.radius || this.position.y > height-this.radius){
            this.velocity.y = this.velocity.y * -1;
        }
    }    
    
}