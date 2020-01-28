let moleculeNumTesting=[1,5,10,100,1000,5000,10000], radiusTesting=[10,20,50,100];
let fpsOverTime=[], collisionoverTime=[], timeTakenOverTime=[];
let testTime=3*60,timeLapsed=0,algoNum=0,testIteration;
let drawn=false;
guiVars = {
    numOfMolecules: 50,
    numRows: 4,
    numCols: 8,
    radiusBaseline: 5,
    showGrid: true,
    render: true,
    showTrails: false
};

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(127)
    //Generate the Initial Moleules
    generateMolecules();
}



moleculeNumTesting.forEach(moleculeNum => {
    radiusTesting.forEach(radius => {
        drawn=false;
        guiVars = {
            numOfMolecules: 50,
            numRows: 4,
            numCols: 8,
            radiusBaseline: 5,
            showGrid: false,
            render: true,
            showTrails: false
        };console.log("Hellllllppppppppp")
        draw = function () {
            //Regenerate cell calculations
            colWidth = width / guiVars.numCols;
            rowHeight = height / guiVars.numRows;
            //Run the algorithm tester
            if (timeLapsed > testTime) {
                testTime = 0;




                if (algoNum < 3) {
                    algoNum++
                    if (algoNum = 2) {
                        //Complete
                    }
                }
            }


            //Show trail behind balls
            guiVars.showTrails ? background(0, 0, 0, 125) : background(0);
            //Draw the grid in the background
            if (guiVars.showGrid) drawGrid();

            algorithimRunner(0, molecules);
            //algorithimRunner(1,molecules);

            //Render molecules
            if (guiVars.render) renderGrid();

            /**
             * FrameRate display
             */
            textSize(32);
            fill("#FFF");
            text(int(getFrameRate()), 30, 30);

            text("Algorithm: " + algoNum);

            fpsOverTime.push(getFrameRate());
            timeLapsed++;
            drawn=true;
        }
        while(!drawn){
            //do nothing
        }
    })
    while (!drawn) { }
}) 
