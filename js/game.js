import { Board } from "./board.js";
import { getMousePosition } from "./helpers.js";
import { AIMove } from "./ai.js";

const ctx = document.getElementById("canvas").getContext("2d");
const turn = document.getElementById("turn");
const blackAIInput = document.getElementById("blackType");
const whiteAIInput = document.getElementById("whiteType");
const blackDepthInput = document.getElementById("blackDepth");
const whiteDepthInput = document.getElementById("whiteDepth");

export function Game() {
    this.board = new Board();
    this.currentSquare = null;
    this.legalMoves = this.board.getLegalMoves(this.currentPlayer);
    turn.innerHTML = "Black's Turn";
    this.setDepth(true);
    this.setDepth(false);
    this.setAI(true);
    this.setAI(false);
    this.restartBlock = false;
};

Game.prototype.draw = function() {
    this.board.draw();
    if(this.board.currentPlayer == 1) {
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
    if(this.board.isLegalMove(x, y)) {
        this.board.move(x, y);
        this.legalMoves = this.board.getLegalMoves();
        if(this.legalMoves.length == 0) {
            this.board.currentPlayer *= -1;
            this.legalMoves = this.board.getLegalMoves();
        };
        if(this.legalMoves.length == 0) {
            let count = 0;
            for(let y = 0; y < 8; y++) {
                for(let x = 0; x < 8; x++) {
                    count += this.board.board[y][x];
                };
            };
            if(count > 0) {
                turn.innerHTML = "White Wins";
            } else if(count < 0) {
                turn.innerHTML = "Black Wins";
            } else {
                turn.innerHTML = "Draw";
            };
        } else {
            if(this.board.currentPlayer == 1) {
                turn.innerHTML = "White's Turn";
            } else {
                turn.innerHTML = "Black's Turn";
            };
        };
        if(this.board.currentPlayer == 1 && this.whiteAI) {
            this.draw();
            this.restartBlock = true;
            setTimeout(() => {this.restartBlock = false; AIMove(this, this.whiteDepth);}, 100);
        } else if(this.board.currentPlayer == -1 && this.blackAI) {
            this.draw();
            this.restartBlock = true;
            setTimeout(() => {this.restartBlock = false; AIMove(this, this.blackDepth);}, 100);
        }
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
    if(this.board.currentPlayer == 1 && this.whiteAI) {
        return;
    }
    if(this.board.currentPlayer == -1 && this.blackAI) {
        return;
    }
    if(event.button == 0 && this.currentSquare != null) {
        this.makeMove(this.currentSquare[0], this.currentSquare[1]);
    };
};

Game.prototype.setAI = function(black) {
    if(black) {
        this.blackAI = blackAIInput.checked;
        if(this.board.currentPlayer == -1 && this.blackAI) {
            AIMove(this, this.blackDepth);
        }
    } else {
        this.whiteAI = whiteAIInput.checked;
        if(this.board.currentPlayer == 1 && this.whiteAI) {
            AIMove(this, this.blackDepth);
        }
    };
}

Game.prototype.setDepth = function(black) {
    let value;
    if(black) {
        value = blackDepthInput.value;
    } else {
        value = whiteDepthInput.value;
    }
    if(!isNaN(value) && value != "") {
        value = Number.parseInt(value);
        if(value < 1) {
            value = 1;
        } else if (value > 9) {
            value = 9;
        };
        if(black) {
            this.blackDepth = value;
        } else {
            this.whiteDepth = value;
        };
    };
};