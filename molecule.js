class Molecule {
    constructor(_arrayPosition){
        this.radius = random(minRadius,maxRadius);
        this.position = createVector(random(this.radius, width - this.radius * 2), random(this.radius, height - this.radius * 2));
        this.velocity = createVector(random(minVelocity, maxVelocity), random(minVelocity, maxVelocity));
        this.arrayPosition=_arrayPosition;
        this.isFilled=false;
    }
    
    render() {
        stroke(0,0,200);
        strokeWeight(1)
        this.isFilled?fill(255,0,0):noFill();
        push()
            translate(this.position.x,this.position.y)
            ellipse(0,0,this.radius*2,this.radius*2);
        pop();
        this.isFilled=false;
    }
    
    step() {
        this.position.add(this.velocity);
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