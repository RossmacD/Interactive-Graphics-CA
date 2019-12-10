let molecules = [], moleculeKey = [];
const numOfMolecules = 9;
let collisonNo;
let checks = 0;
let numRows = 6, numCols = 6, colWidth, rowHeight;
let minRadius = 20, maxRadius = 25, minVelocity = -4, maxVelocity = 4;

function setup() {
    createCanvas(600, 600);
    background(127);
    frameRate(30);
    //noLoop();
    for (let i = 0; i < numOfMolecules; i++) {
        molecules.push(new Molecule(i));
    }
    colWidth = width / numRows, rowHeight = height / numRows;
}

function draw() {

    background(127);
    stroke(0);
    noFill();


    drawGrid();
    splitIntoGrids();
    checkIntersections();
    //algorithimRunner(1, molecules);
    renderGrid();



    // console.log('Number of collisions : ' + collisonNo);
    textSize(32);
    fill("#FFF");
    text(int(getFrameRate()), 30, 30);

}

function drawGrid() {
    //Draw Grid
    for (x = 0; x < width; x += colWidth) {
        for (y = 0; y < height; y += height / numCols) {
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

function splitIntoGrids() {
    //Empty Array
    moleculeKey = [];
    //Create an array for each box in the grid
    for (i = 0; i < numCols * numRows; i++) {
        moleculeKey.push([])
        //moleculeKey.push(new Set());
    }
    molecules.forEach(molecule => {
        //Gets the x value by mapping the position of x to the amount of coloumns then flooring it
        //Gets Y value by mapping + flooring to amont of rows then multiplying by the number of coloums
        //Push the index to the box the molecule is in
        const currentCell = Math.floor(molecule.position.x / colWidth) + (Math.floor((molecule.position.y / rowHeight)) * numCols);
        moleculeKey[currentCell].push(molecule.arrayPosition);
        //moleculeKey[currentCell].add(molecule.arrayPosition);

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
        //Algorithim 1 - Dosnt Check against previously checked molecules
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

//SHIT
    //    collisonNo = molecules.reduce(
    //         (collisions=0, molecule, index, molecules) => {
    //           //console.log(molecule.position.sub(molecules[index + 1].position).mag());
    //           console.log("collisions");  
    //           console.log(collisions);

    //             //console.log('molecule');
    //             //console.log(molecule);
    //             //console.log('index');
    //             // console.log(index);
    //             // console.log('molecules');
    //             // console.log(molecules);

    //             return molecule.position.copy().sub(molecules[index - 1].position.copy()).mag() < 10
    //               ?  collisions += 1
    //               : collisions;
    //         });
    //console.log(collisonNo);