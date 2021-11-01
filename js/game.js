import { Board } from "./board.js";
import { getMousePosition } from "./helpers.js";

const ctx = document.getElementById("canvas").getContext("2d");
const turn = document.getElementById("turn");

export function Game() {
    this.board = new Board();
    this.currentPlayer = -1;
    this.currentSquare = null;
    this.legalMoves = this.board.getLegalMoves(this.currentPlayer);
    turn.innerHTML = "Black's Turn";
};

Game.prototype.draw = function() {
    this.board.draw();
    if(this.currentPlayer == 1) {
        ctx.strokeStyle = "#FFFFFF";
    } else {
        ctx.strokeStyle = "#000000";
    };
    for(let i = 0; i < this.legalMoves.length; i++) {
        ctx.beginPath();
        ctx.arc(this.board.squareSize * this.legalMoves[i][0] + this.board.pieceOffset, this.board.squareSize * this.legalMoves[i][1] + this.board.pieceOffset, this.board.pieceRadius, 0, 2 * Math.PI);
        ctx.stroke();
    };
    if(this.currentSquare != null) {
        ctx.beginPath();
        ctx.rect(this.currentSquare[0] * this.board.squareSize, this.currentSquare[1] * this.board.squareSize, this.board.squareSize, this.board.squareSize);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fill();
    };
};

Game.prototype.makeMove = function(x, y) {
    if(this.board.isLegalMove(x, y, this.currentPlayer)) {
        this.board.move(x, y, this.currentPlayer);
        this.currentPlayer *= -1;
        this.legalMoves = this.board.getLegalMoves(this.currentPlayer);
        if(this.legalMoves.length == 0) {
            this.currentPlayer *= -1;
            this.legalMoves = this.board.getLegalMoves(this.currentPlayer);
        };
        if(this.legalMoves.length == 0) {
            let count = 0;
            for(let y = 0; y < 8; y++) {
                for(let x = 0; x < 8; x++) {
                    count += this.board.board[y][x];
                };
            };
            console.log(count);
            if(count > 0) {
                turn.innerHTML = "White Wins";
            } else if(count < 0) {
                turn.innerHTML = "Black Wins";
            } else {
                turn.innerHTML = "Draw";
            };
        } else {
            if(this.currentPlayer == 1) {
                turn.innerHTML = "White's Turn";
            } else {
                turn.innerHTML = "Black's Turn";
            };
        };
    };
};

Game.prototype.getSquare = function(x, y) {
    return [Math.floor(x / this.board.squareSize), Math.floor(y / this.board.squareSize)];
};

Game.prototype.onMouseMove = function(event) {
    let pos = getMousePosition(event);
    let square = this.getSquare(pos[0], pos[1]);
    if(square[0] < 0 || square[1] < 0 || square[0] > 7 || square[1] > 7) {
        this.currentSquare = null;
    } else {
        this.currentSquare = square;
    };
};

Game.prototype.onMouseClick = function(event) {
    if(event.button == 0 && this.currentSquare != null) {
        this.makeMove(this.currentSquare[0], this.currentSquare[1]);
    };
};