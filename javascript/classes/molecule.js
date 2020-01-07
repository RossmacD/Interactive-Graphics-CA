class Molecule {
    constructor(_arrayPosition){
        this.originalRadius = random(minRadius,maxRadius);
        this.radius=this.originalRadius+guiVars.radiusBaseline;
        this.position = createVector(random(this.radius, width - this.radius * 2), random(this.radius, height - this.radius * 2));
        this.velocity = createVector(random(minVelocity, maxVelocity), random(minVelocity, maxVelocity));
        this.arrayPosition=_arrayPosition;
        this.isFilled=false;
        this.noiseIndex=random(1,100000000);
        this.col;
    }
    
    render() {
        stroke(255,255,255);
        strokeWeight(1)
        
        this.noiseIndex += 0.001;
        const colNoise = noise((this.noiseIndex * 2) + 3000) * 100;
        this.col = color(  80+colNoise,50,  255 - colNoise);
        this.isFilled ? fill(this.col) : noFill();
        push()
            translate(this.position.x,this.position.y)
            ellipse(0, 0, this.radius * 2 , this.radius * 2 )
            


        pop();
        this.isFilled=false;
    }
    
    step() {
        this.position.add(this.velocity);
        this.radius = this.originalRadius + guiVars.radiusBaseline;
    }
    
    checkEdges(){
        if(this.position.x < this.radius || this.position.x > width-this.radius){
            this.velocity.x = this.velocity.x * -1
        }
        
        if(this.position.y < this.radius || this.position.y > height-this.radius){
            this.velocity.y = this.velocity.y * -1
        }
    }    
    
}