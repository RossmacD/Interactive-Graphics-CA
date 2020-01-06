let molecules, moleculeKey = [];

//const numOfMolecules = 9;
let collisonNo;
let checks = 0;
//var numRows = 6, numCols = 6, colWidth, rowHeight;
// let minRadius = 20, maxRadius = 25, minVelocity = -4, maxVelocity = 4;

//Create an object to hold Variables for gui. - GUI cannot get handle on scope otherwise, unless var is used (Undesirable as it is outdated)
let guiVars = {
    numOfMolecules: 1000,
    numRows: 6,
    numCols: 6,
    minRadius: 10,
    maxRadius :10,
    minVelocity :-3,
    maxVelocity: 3,
    noisyCollisions:true
};

let colWidth,rowHeight;

function setup() {
    //createCanvas(windowWidth, windowHeight);
    createCanvas(600, 600);
    background(127);
    //frameRate(5)
    //noLoop();
    //Gui Set up
    let gui = new dat.GUI();
    //Slider for number of molecules - Regenerates the molecules when changed
    gui.add(guiVars, 'numOfMolecules', 0, 1000).onChange(()=>generateMolecules()).step(1);
    gui.add(guiVars, 'numRows', 1, 30).step(1);
    gui.add(guiVars, 'numCols', 1, 30).step(1);

    gui.add(guiVars, 'noisyCollisions');

    //Generate the Initial Moleules
    generateMolecules(); 
}

function draw() {
    background(127);
    stroke(0);
    noFill();
    colWidth = width / guiVars.numCols;
    rowHeight = height / guiVars.numRows;

    drawGrid();

    splitIntoGridsNarrow();
    checkIntersections();
    //algorithimRunner(1,molecules);
    
    //algorithimRunner(1, molecules);
    renderGrid();

    // console.log('Number of collisions : ' + collisonNo);
    textSize(32);
    fill("#FFF");
    text(int(getFrameRate()), 30, 30);
}

function generateMolecules(){
    molecules = [];
    for (let i = 0; i < guiVars.numOfMolecules; i++) {
            molecules.push(new Molecule(i));
        }
}


function drawGrid() {
    strokeWeight(1)
    //Draw Grid
    for (x = 0; x < width; x += colWidth) {
        for (y = 0; y < height; y += rowHeight) {
            line(x, 0, x, height);
            line(0, y, width, y);
        }
    }
}

function renderGrid() {
    molecules.forEach((molecule) => {
        molecule.render();
        molecule.checkEdges();
        molecule.step();
    });
}


//Broadphase
function splitIntoGrids() {
    //Empty Array
    moleculeKey = [];
    //Create an array for each box in the grid
    for (i = 0; i < guiVars.numCols * guiVars.numRows; i++) {
        moleculeKey.push([])
    }
    molecules.forEach(molecule => {
        //Gets the x value by mapping the position of x to the amount of coloumns then flooring it
        //Gets Y value by mapping + flooring to amont of rows then multiplying by the number of coloums
        //Push the index to the box the molecule is in
    

        const currentCell = Math.floor(molecule.position.x / colWidth) + (Math.floor((molecule.position.y / rowHeight)) * guiVars.numCols);
        //Overlap Tests:
        //Check which half f the cell it is in
        closestXCell=false;
        closestYCell = false;
        closestCornerCell=false;
        
        
        if (molecule.position.x < (colWidth * currentCell)+(colWidth/2) && molecule.position.x < (colWidth *currentCell)+molecule.radius){
            closestXCell =currentCell-1;

        } else if (molecule.position.x > (colWidth * (currentCell+1)) - molecule.radius){
            
            closestXCell = currentCell +1;
        }
        closestYCellCheck(currentCell,molecule);

        moleculeKey[currentCell].push(molecule.arrayPosition);

      
        if (closestXCell !== false && closestXCell >= 0 && closestXCell < moleculeKey.length){
        moleculeKey[closestXCell].push(molecule.arrayPosition);
    }
        if (closestYCell !== false && closestYCell >= 0 && closestYCell < moleculeKey.length){
        moleculeKey[closestYCell].push(molecule.arrayPosition);}
        
    })

    
}
function closestYCellCheck(currentCell, molecule) {
    if (molecule.position.y < (rowHeight * (Math.floor((molecule.position.y / rowHeight)))) + (rowHeight / 2) && molecule.position.y < (rowHeight * (Math.floor((molecule.position.y / rowHeight)))) + molecule.radius) {
       
        closestYCell = currentCell -  guiVars.numCols;

    } else if (molecule.position.y > (rowHeight * ((Math.floor((molecule.position.y / rowHeight))) + 1)) - molecule.radius) {
        
        closestYCell = currentCell +  guiVars.numCols;
    } 
}


//Narrowphase split into grids
function splitIntoGridsNarrow() {
    //Empty Array
    moleculeKey = [];
    //Create an array for each box in the grid
    for (i = 0; i < guiVars.numCols * guiVars.numRows; i++) {
        moleculeKey.push([])
    }
    molecules.forEach(molecule => {
        //Gets the x value by mapping the position of x to the amount of coloumns then flooring it
        //Gets Y value by mapping + flooring to amont of rows then multiplying by the number of coloums
        //Push the index to the box the molecule is in
        const currentCell = Math.floor(molecule.position.x / colWidth) + (Math.floor((molecule.position.y / rowHeight)) * guiVars.numCols);
        //console.log(molecule.arrayPosition);
        moleculeKey[currentCell].push(molecule.arrayPosition);
    })
}


function checkIntersections() {
    moleculeKey.forEach(key => {
        if (key.length > 1) {
            //Check collisions in the same cell
            for (i = 0; i < key.length; i++) {
                for (j = i + 1; j < key.length; j++) {
                    if (p5.Vector.sub(molecules[key[i]].position, molecules[key[j]].position).mag() < molecules[key[i]].radius + molecules[key[j]].radius) {
                        molecules[key[i]].isFilled = true;
                        molecules[key[j]].isFilled = true;
                    }
                }
            }
        }
    })
}

function algorithimRunner(algorithimNum, moleculeArray) {
    let checkTime, checkNum = 0;
    collisonNo = 0;
    console.time(checkTime)

    switch (algorithimNum) {
        //Algorithim 0 - Nested for loops - very shit Brute force
        case 0:
            for (i = 0; i < moleculeArray.length; i++) {
                for (j = 0; j < moleculeArray.length; j++) {
                    checkNum += 2;
                    if (p5.Vector.sub(moleculeArray[i].position, moleculeArray[j].position).mag() < moleculeArray[i].radius * 2 && i != j) {
                        collisonNo += 0.5;
                    }
                }
            }
            break
        //Algorithim 1 - BruteForce
        case 1:
            for (i = 0; i < moleculeArray.length; i++) {
                for (j = i + 1; j < moleculeArray.length; j++) {
                    checkNum++;
                    if (p5.Vector.sub(moleculeArray[i].position, moleculeArray[j].position).mag() < moleculeArray[i].radius * 2) {
                        collisonNo++;
                    }
                }
            }
            break

        //Algorithim 3 - grid system
        case 2:
        break

    }

    console.timeEnd(checkTime)
    console.log('Number of checks' + checkNum)
}