$("html").keydown((e) => {
    const actions = {
        "ArrowLeft": "move('left')",
        "ArrowRight": "move('right')",
        "ArrowDown": "move('down')",
        "z": "rotate('left')",
        "x": "rotate('right')",
    };
    eval(actions[e.key]);

});

function rotate(direction) {
    if (!direction) {
        throw "direction not specified for rotation...";
    }
    if (currentBlock.id === 4) { // disable rotation for shape 4
        return;
    }
    if (currentBlock.id === 7) { // special case for shape 7
        clearCurrent();
        if (currentBlock.shape === "line") {
            currentBlock.shape = "lineROTATED";
        } else {
            currentBlock.shape = "line";
        }
        updateGrid(newCoordinates(currentBlock.shape, currentBlock.pos));
        render();
        return;
    }
    clearCurrent(); // clear current shape before updating its position
    let shape = currentBlock.shape;
    let result = [];
    const left = { // reference for counter-clockwise rotation (left)
        1: 7, 2: 4, 3: 1,
        4: 8, 5: 5, 6: 2,
        7: 9, 8: 6, 9: 3,
    };
    const right = { // reference for clockwise rotation (right)
        1: 3, 2: 6, 3: 9,
        4: 2, 5: 5, 6: 8,
        7: 1, 8: 4, 9: 7,
    };
    // assign either 'left' or 'right' object to const based on 'direction'
    const ref = direction === "left" ? left : right;
    for (let i = 0; i < shape.length; i++) {
        result.push(ref[shape[i]]);
    }
    if (!isOutOfBounds(result) && !isColliding(result)) {
        currentBlock.shape = result;
    }
    updateGrid(newCoordinates(result, currentBlock.pos));
    render();
}

function move(direction) {
    if (!direction) {
        throw "direction not specified for move...";
    }
    clearCurrent(); // clear current shape before updating its position
    let collision = false;
    if (direction === "down") {
        // increment y coordinate for current block (down motion)
        currentBlock.pos[1]++;
        // check for collision AFTER move
        if (isColliding(currentBlock.shape)) {
            collision = true;
            currentBlock.pos[1]--; // rectify position on y-axis;
        }
    }
    else {
        // either increment or decrement x coordinate for current block
        // corresponds to left or right motion, respectively
        direction === "left" ? currentBlock.pos[0]-- : currentBlock.pos[0]++;
        if (isOutOfBounds(currentBlock.shape) || isColliding(currentBlock.shape)) {
            direction === "left" ? currentBlock.pos[0]++ : currentBlock.pos[0]--;
        }
    }
    updateGrid(newCoordinates(currentBlock.shape, currentBlock.pos), currentBlock.color);
    // if there is collision we invoke 'spawn' which will render
    // otherwise, we need to invoke render()
    collision ? checkForLines() : render();
}