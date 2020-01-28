
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
    //frameRate(100);
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
    // splitIntoGridsBroad();
    // checkIntersections();
    splitIntoGridsBroad();
    checkIntersections();

    //Render molecules
    if(guiVars.render)renderGrid();

    /**
     * FrameRate display
     */
    textSize(32);
    fill("#FFF");
    text(int(getFrameRate()), 30, 30);
}