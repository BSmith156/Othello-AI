const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export function Board() {
    this.board = [];
    for(let y = 0; y < 8; y++) {
        this.board.push([]);
        for(let x = 0; x < 8; x++) {
            this.board[y].push(0);
        };
    };
    this.board[3][3] = 1;
    this.board[4][4] = 1;
    this.board[3][4] = -1;
    this.board[4][3] = -1;
    this.currentPlayer = -1;
};

Board.prototype.resize = function() {
    let width = canvas.width * 0.9;
    let height = canvas.height * 0.9;
    let offset = Math.abs(width - height) / 2;
    if(width > height) {
        this.size = height;
        ctx.setTransform(1, 0, 0, 1, offset + canvas.width * 0.05, canvas.height * 0.05);
    } else {
        this.size = width;
        ctx.setTransform(1, 0, 0, 1, canvas.width * 0.05, offset + canvas.height * 0.05);
    };
    this.squareSize = this.size / 8;
    this.pieceOffset = this.squareSize / 2;
    this.pieceRadius = this.squareSize * 0.4;
};

Board.prototype.draw = function() {
    ctx.beginPath();
    ctx.rect(0, 0, this.size, this.size);
    ctx.fillStyle = "#228B22";
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    for(let y = 0; y < 8; y++) {
        for(let x = 0; x < 8; x++) {
            ctx.rect(this.squareSize * x, this.squareSize * y, this.squareSize, this.squareSize);
            if(this.board[y][x] != 0) {
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(this.squareSize * x + this.pieceOffset, this.squareSize * y + this.pieceOffset, this.pieceRadius, 0, 2 * Math.PI);
                if(this.board[y][x] == 1) {
                    ctx.fillStyle = "#FFFFFF";
                } else {
                    ctx.fillStyle = "#000000";
                };
                ctx.fill();
                ctx.beginPath();
            };
        };
    };
    ctx.stroke();
};

Board.prototype.move = function(x, y) {
    for(let xDir = -1; xDir < 2; xDir++) {
        for(let yDir = -1; yDir < 2; yDir++) {
            let currentX = x + xDir;
            let currentY = y + yDir;
            let flipped = [];
            while(currentX > -1 && currentY > -1 && currentX < 8 && currentY < 8) {
                if(this.board[currentY][currentX] == 0) {
                    break;
                } else if(this.board[currentY][currentX] == this.currentPlayer) {
                    for(let i = 0; i < flipped.length; i++) {
                        this.board[flipped[i][1]][flipped[i][0]] *= -1;
                    };
                    break;
                };
                flipped.push([currentX, currentY]);
                currentX += xDir;
                currentY += yDir;
            };
        };
    };
    this.board[y][x] = this.currentPlayer;
    this.currentPlayer *= -1;
};

Board.prototype.isLegalMove = function(x, y) {
    if(this.board[y][x] != 0) {
        return false;
    };
    for(let xDir = -1; xDir < 2; xDir++) {
        for(let yDir = -1; yDir < 2; yDir++) {
            let currentX = x + xDir;
            let currentY = y + yDir;
            let otherFound = false;
            while(currentX > -1 && currentY > -1 && currentX < 8 && currentY < 8) {
                if(this.board[currentY][currentX] == 0) {
                    break;
                } else if(this.board[currentY][currentX] == -this.currentPlayer) {
                    otherFound = true;
                } else if(this.board[currentY][currentX] == this.currentPlayer) {
                    if(otherFound) {
                        return true;
                    };
                    break;
                };
                currentX += xDir;
                currentY += yDir;
            };
        };
    };
    return false;
};

Board.prototype.getLegalMoves = function() {
    let moves = []
    for(let y = 0; y < 8; y++) {
        for(let x = 0; x < 8; x++) {
            if(this.isLegalMove(x, y)) {
                moves.push([x, y]);
            };
        };
    };
    return moves;
};