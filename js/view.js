const tileSize = 35;
const gridWidth = 10;
const gridHeight = 20;

const canvas = document.querySelector(".main-view");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "./img/square.png";

function render() {
    ctx.clearRect(0, 0, gridWidth*tileSize, gridHeight*tileSize);
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x]) {
                //ctx.fillStyle = grid[y][x][1];
                //ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                ctx.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
    }
}