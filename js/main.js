import { Game } from "./game.js";
import { helpNext } from "./help.js";
import { onResize } from "./resize.js";


const blackAIInput = document.getElementById("blackType");
const whiteAIInput = document.getElementById("whiteType");
const blackDepthInput = document.getElementById("blackDepth");
const whiteDepthInput = document.getElementById("whiteDepth");

let game = new Game();

window.onload = () => {
    helpNext();
    onResize();
    game.board.resize();
    setGameListeners();
    setInterval(step, 1000 / 30); 
};

window.onresize = () => {
    onResize();
    game.board.resize();
};

function step() {
    game.draw();
};

document.getElementById("restart").addEventListener("click", () => {
    game.dead = true;
    game = new Game();
    game.board.resize();
    setGameListeners();
});

function setGameListeners() {

    canvas.addEventListener("mousemove", function(e) {
        game.onMouseMove(e);
    });
    
    canvas.addEventListener("mousedown", function(e) {
        game.onMouseClick(e);
    });

    blackAIInput.addEventListener("change", () => game.setAI(true));
    whiteAIInput.addEventListener("change", () => game.setAI(false));
    blackDepthInput.addEventListener("input", () => game.setDepth(true));
    blackDepthInput.addEventListener("focusout", () => {blackDepthInput.value = game.blackDepth});
    whiteDepthInput.addEventListener("input", () => game.setDepth(false));
    whiteDepthInput.addEventListener("focusout", () => {whiteDepthInput.value = game.whiteDepth});
};