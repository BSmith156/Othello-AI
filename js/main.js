import { Board } from "./board.js";
import { Game } from "./game.js";
import { onResize } from "./resize.js";

let game = new Game();

window.onload = () => {
    onResize();
    game.board.resize();
    setInterval(step, 1000 / 30); 
};

window.onresize = () => {
    onResize();
    game.board.resize();
};

function step() {
    game.draw();
}

canvas.addEventListener("mousemove", function(e) {
    game.onMouseMove(e);
});

canvas.addEventListener("mousedown", function(e) {
    game.onMouseClick(e);
});

document.getElementById("restart").addEventListener("click", () => {
    game = new Game();
    game.board.resize();
});