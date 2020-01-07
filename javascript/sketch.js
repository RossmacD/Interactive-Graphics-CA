/**
 * ---------------------------------------------------------
 * Ross MacDonald - Student No. N00171147
 * Interactive graphics | Year 3 | Creative Computing | IADT
 * ---------------------------------------------------------
 * 
 * This is an application to test and display different collision algorthims.
 * Librarys used - P5.js & Dat.GUI.js
 */

//---------------------------
// Global Variables
//---------------------------
let molecules, moleculeKey = [];
let collisonNo,checks = 0;
let minRadius = 10, maxRadius = 20, minVelocity = -3, maxVelocity = 3, colWidth, rowHeight;
//Create an object to hold Variables for gui. - GUI cannot get handle on scope otherwise, unless var is used (Undesirable as it is outdated)
let guiVars = {
    numOfMolecules: 20,
    numRows: 4,
    numCols: 3,
    radiusBaseline:50,
    showGrid:true,
    render:true,
    showTrails:false
};
 
//---------------------------
//P5 Functions
//---------------------------
/**
 * Canvas Set up
 */
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(127);
    //noLoop();

    //Create Gui
    addGui();
    //Generate the Initial Moleules
    generateMolecules(); 
}

/**
 * P5 function
 * Draw each frame
 */
function draw() {
    //Regenerate cell calculations
    colWidth = width / guiVars.numCols;
    rowHeight = height / guiVars.numRows;
    
    //Show trail behind balls
    guiVars.showTrails?background(0,0,0,125):background(0);
    //Draw the grid in the background
    if(guiVars.showGrid) drawGrid();

    //Run checks
    splitIntoGridsBroad();
    checkIntersections();
    //algorithimRunner(1,molecules);

    //Render molecules
    if(guiVars.render)renderGrid();

    /**
     * FrameRate display
     */
    textSize(32);
    fill("#FFF");
    text(int(getFrameRate()), 30, 30);
}

//---------------------------
//Functions
//---------------------------

/**
 * Gui Set up
 */
function addGui(){
    let gui = new dat.GUI();
    gui.domElement.id = 'gui';
    gui.add(guiVars, 'numOfMolecules', 0, 10000).onChange(() => generateMolecules()).step(1);//-Regenerates the molecules when changed
    gui.add(guiVars, 'radiusBaseline', 0, 100).step(1);
    gui.add(guiVars, 'numRows', 1, 30).step(1);
    gui.add(guiVars, 'numCols', 1, 30).step(1);
    gui.add(guiVars, 'showGrid');
    gui.add(guiVars, 'render');
    gui.add(guiVars, 'showTrails');
}

/**
 * Generate the inital array of molecules
 */
function generateMolecules(){
    molecules = [];
    for (let i = 0; i < guiVars.numOfMolecules; i++) {
            molecules.push(new Molecule(i));
        }
}

/**
 * Draw the grid in the background
 */
function drawGrid() {
    stroke(80, 150, 50);
    strokeWeight(1)
    //Draw Grid
    for (x = colWidth; x < width; x += colWidth) {
        for (y = 0; y < height; y += rowHeight) {
            line(x, 0, x, height);
            line(0, y, width, y);
        }
    }
}

/**
 * Render each molecule in the grid
 */
function renderGrid() {
    molecules.forEach((molecule) => {
        molecule.render();
        molecule.checkEdges();
        molecule.step();
    });
}


/**
 * Broadphase - put the molecules into all of the cells that they are in or overlapping
 */
function splitIntoGridsBroad() {
    //Initialise the Array
    moleculeKey = [];
    //Create an array for each box in the grid
    for (i = 0; i < guiVars.numCols * guiVars.numRows; i++) {
        moleculeKey.push([])
    }
    molecules.forEach(molecule => {
        //Gets the x value by mapping the position of x to the amount of coloumns then flooring it
        //Gets Y value by mapping + flooring to amont of rows then multiplying by the number of coloums
        //Push the index to the box the molecule is in

        //Assign the molecule to its cell by mapping it 
        const xMapped = Math.floor(molecule.position.x / colWidth);
        const yMapped = Math.floor(molecule.position.y / rowHeight);
        const currentCell = xMapped + (yMapped * guiVars.numCols);
        
        //Overlap Tests:
        //Check which half of the cell it is in, then check if it is closer to that edge than its radius, if so push to th

        closestXCell=-1;
        closestYCell = -1;
         
        /**
         *Check if within closest cells 
         */
        //X Check
        const currentCellXStart = colWidth * currentCell;
        if (molecule.position.x < currentCellXStart + molecule.radius) {
            closestXCell = currentCell - 1;
        } else if (molecule.position.x > (currentCellXStart + 1) - molecule.radius) {
            closestXCell = currentCell + 1;
        }
        //Y Check
        const currentCellYStart = rowHeight * yMapped;
        if (molecule.position.y < currentCellYStart + molecule.radius) {
            closestYCell = currentCell - guiVars.numCols;
        } else if (molecule.position.y > (currentCellYStart+ 1) - molecule.radius) {
            closestYCell = currentCell + guiVars.numCols;
        } 

        /**
         *Push to all cells
        */
        moleculeKey[currentCell].push(molecule.arrayPosition);
        //Dont push to non existant cells
        if ( closestXCell >= 0 && closestXCell < moleculeKey.length){
            moleculeKey[closestXCell].push(molecule.arrayPosition);
        }
        if (closestYCell >= 0 && closestYCell < moleculeKey.length){
            moleculeKey[closestYCell].push(molecule.arrayPosition);}
        })
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
        //Push to cell
        moleculeKey[currentCell].push(molecule.arrayPosition);
    })
}

function checkIntersections() {
    moleculeKey.forEach(key => {
        /**
         * Check cell for collisions if there are more than 1 in the cell
         */
        if (key.length > 1) {
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


//---------------------------
//Runner helper function
//---------------------------
function algorithimRunner(algorithimNum, moleculeArray) {
    let checkTime, checkNum = 0;
    collisonNo = 0;
    console.time(checkTime)
    switch (algorithimNum) {
        /**
         * Algorithim 1 - BruteForce
         * Simplest Algorithm to code at the expensive of being very resource intensive
         */
        case 0:
            for (i = 0; i < moleculeArray.length; i++) {
                for (j = i + 1; j < moleculeArray.length; j++) {
                    checkNum++;
                    if (p5.Vector.sub(moleculeArray[i].position, moleculeArray[j].position).mag() < moleculeArray[i].radius * 2) {
                        collisonNo++;
                    }
                }
            }
        break
        /**
         * Algorithim 2 - Narrowphase
         * Checks within own cell for collisions
         * -Is innaccurate unless grid is smaller than min radius
         * +Is very fast at estimating collisions
         */
        case 1:
        break
        /**
         * Algorithim 2 - Narrowphase
         * Checks within own cell for collisions
         * -Is innaccurate unless grid is smaller than min radius
         * +Is very fast at estimating collisions
         */
        case 2:
        
        break

    }

    console.timeEnd(checkTime)
    console.log('Number of checks' + checkNum)
}