// Shapes are represented within a 3x3 matrix labeled with numbers 1 to 9
// 1 2 3
// 4 5 6
// 7 8 9
const blocks = {
    1: {shape: [4, 5, 6, 8], id: 1},
    2: {shape: [4, 5, 6, 9], id: 2},
    3: {shape: [4, 5, 8, 9], id: 3},
    4: {shape: [4, 5, 7, 8], id: 4},
    5: {shape: [5, 6, 7, 8], id: 5},
    6: {shape: [4, 5, 6, 7], id: 6},
    7: {shape: "line", id: 7},
};

let currentBlock = {shape: null, pos: [], id: 0};
let nextBlock = blocks[Math.floor(Math.random() * 7) + 1];

const grid = generateGrid();

function generateGrid() {
    let out = [];
    for (let i = 0; i < 20; i++) {
        out.push([]);
        for (let j = 0; j < 10; j++) {
            out[i].push(0);
        }
    }
    return out;
}



// generate a set of coordinates for where the shape should be
// *** having to provide parameters is superfluous *CONSIDER REMOVING*
function newCoordinates(shape, pos) {
    shape = toCoordinates(shape);
    let out = [];
    for (let i = 0; i < shape.length; i++) {
        out.push([shape[i][0] + pos[0], shape[i][1] + pos[1]]);
    }
    return out;
}

function updateGrid(coordinates) {
    for (let i = 0; i < coordinates.length; i++) {
        let x = coordinates[i][0];
        let y = coordinates[i][1];
        if (y < 0) {
            continue;
        } else if (y > 19) {
            continue;
        }
        if (grid[y][x]) {
            grid[y][x] = 0;
        }
        else {
            grid[y][x] = 1;
        }
    }
}



// converts from 3x3 matrix labeled 1 to 9 to coordinates
function toCoordinates(shape) {
    if (shape === "line") { // special case
        return [[-2, 0], [-1, 0], [0, 0], [1, 0]];
    }
    if (shape === "lineROTATED") { // special case
        return [[0, -2], [0, -1], [0, 0], [0, 1]];
    }
    const ref = {
        1: [-1, -1], 2: [0, -1], 3: [1, -1],
        4: [-1, 0], 5: [0, 0], 6: [1, 0],
        7: [-1, 1], 8: [0, 1], 9: [1, 1]
    };
    let out = [];
    for (let i = 0; i < shape.length; i++) {
        out.push(ref[shape[i]]);
    }
    return out
}

// converts back to 3x3 matrix labeled 1 to 9 #   NEEDED ? TO DELETE ?
function toNumbers(shape) {
    const ref = {
        "-1,-1": 1, "0,-1": 2, "1,-1": 3,
        "-1,0": 4, "0,0": 5, "1,0": 6,
        "-1,1": 7, "0,1": 8, "1,1": 9
    };
    let out = [];
    for (let i = 0; i < shape.length; i++) {
        out.push(ref[String(shape[i])]);
    }
    return out
}

// clear shape from current position
function clearCurrent() {
    updateGrid(newCoordinates(currentBlock.shape, currentBlock.pos));
}

// check for collisions
function isColliding(shape) {
    let coordinates = newCoordinates(shape, currentBlock.pos);
    for (let i = 0; i < coordinates.length; i++) {
        let x = coordinates[i][0];
        let y = coordinates[i][1];
        // determine if out of bound on y-axis
        if (y === 20) {
            return true;
        }
        // determine if there is overlap
        if (grid[y][x]) {
            return true;
        }
    }
    return false;
}

// enforce boundaries
function isOutOfBounds(shape) {
    let coordinates = newCoordinates(shape, currentBlock.pos);
    for (let i = 0; i < coordinates.length; i++) {
        let x = coordinates[i][0];
        let y = coordinates[i][1];
        if (x < 0 || x > 9) {
            return true;
        } else if (y < 0 || y > 19) {
            return true;
        }
    }
    return false;
}