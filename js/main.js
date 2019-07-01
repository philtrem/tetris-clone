// todo (next):

let moveDownInterval = setInterval(() => { move("down") }, 500);
spawn();


function spawn() {
    blocks[7].shape = "line"; // need to reset to avoid rotated shape
    currentBlock = nextBlock; 
    currentBlock.pos = [5, 0];
    updateGrid(newCoordinates(currentBlock.shape, currentBlock.pos));
    render();
    nextBlock = blocks[Math.floor(Math.random() * 7) + 1];
}


// check for completed lines (game)
function checkForLines() {
    let coordinates = newCoordinates(currentBlock.shape, currentBlock.pos);
    let toClear = [];
    let prevY = -1;
    for (let i = 0; i < coordinates.length; i++) {
        let y = coordinates[i][1];
        if (y === prevY) {
            prevY = y;
            continue;
        }
        for (let x = 0; x < 10; x++) {
            if (grid[y][x] === 0) {
                prevY = y;
                break;
            }
            if (x === 9 && grid[y][x]) {
                prevY = y;
                toClear.push(y);
            }
        }
    }
    if (toClear.length > 0) {
        setTimeout(() => {clearLines(toClear), 250});
    } else {
        spawn();
    }
}

function clearLines(arr) {
    let n = Math.max(...arr);
    let range = arr.length;
    for (let y = n; y-range > 0; y--) {
        for (let x = 0; x < 10; x++) {
            grid[y][x] = grid[y-range][x];
        }
    }
    for (let y = 0; y <= range; y++) {
        for (let x = 0; x < 10; x++) {
            grid[y][x] = 0;
        }
    }
    render();
};
