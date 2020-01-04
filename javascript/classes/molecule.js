class Molecule {
    constructor(_arrayPosition){
        this.radius = random(guiVars.minRadius,guiVars.maxRadius);
        this.position = createVector(random(this.radius, width - this.radius * 2), random(this.radius, height - this.radius * 2));
        this.velocity = createVector(random(guiVars.minVelocity, guiVars.maxVelocity), random(guiVars.minVelocity, guiVars.maxVelocity));
        this.arrayPosition=_arrayPosition;
        this.isFilled=false;
        this.t=0;
        this.nval=1;
    }
    
    render() {
        stroke(0,0,200);
        strokeWeight(3)
        this.isFilled?fill(255,0,0):noFill();
        this.isFilled ? this.nVal = map(noise(cos(this.a) * 15 + 1, sin(this.a) * 15 + 1, this.t), 0.0, 1.0, 0.5, 1.0):this.nval=1;
        push()
            translate(this.position.x,this.position.y)
            // if(!guiVars.noisyCollsions){
            //     ellipse(0,0,this.radius*2,this.radius*2)
            // }
            // else{

                beginShape();
                for (this.a = 0; this.a <= TWO_PI; this.a += TWO_PI / 36) {

                   
                   // nVal=1;
                    x = cos(this.a) * this.radius * this.nVal;
                    y = sin(this.a) * this.radius * this.nVal;

                    vertex(x, y);
                }
                endShape(CLOSE);
                this.t += .02;
            //}


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