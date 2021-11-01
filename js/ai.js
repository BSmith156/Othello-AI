import { Board } from "./board.js";

const valueMap = [[120, -20, 20, 5, 5, 20, -20, 120],
                  [-20, -40, -5, -5, -5, -5, -40, -20],
                  [20, -5, 15, 3, 3, 15, -5, 20],
                  [5, -5, 3, 3, 3, 3, -5, 5],
                  [5, -5, 3, 3, 3, 3, -5, 5],
                  [20, -5, 15, 3, 3, 15, -5, 20],
                  [-20, -40, -5, -5, -5, -5, -40, -20],
                  [120, -20, 20, 5, 5, 20, -20, 120]];

export function AIMove(gameState, depth) {
    let boardState = gameState.board;
    let alpha = Number.NEGATIVE_INFINITY;
    let beta = Number.POSITIVE_INFINITY;
    let bestMove;
    let legalMoves = boardState.getLegalMoves();
    if(legalMoves.length == 0) {
        return;
    };
    if(boardState.currentPlayer == 1) {
        for(let i = 0; i < legalMoves.length; i++) {
            let nextState = cloneBoard(boardState);
            nextState.move(legalMoves[i][0], legalMoves[i][1]);
            let score = minimax(nextState, depth - 1, alpha, beta);
            if(score > alpha || alpha == Number.NEGATIVE_INFINITY) {
                alpha = score;
                bestMove = legalMoves[i];
                if(alpha >= beta) {
                    break;
                };
            };
        };
    } else {
        for(let i = 0; i < legalMoves.length; i++) {
            let nextState = cloneBoard(boardState);
            nextState.move(legalMoves[i][0], legalMoves[i][1]);
            let score = minimax(nextState, depth - 1, alpha, beta);
            if(score < beta || beta == Number.POSITIVE_INFINITY) {
                beta = score;
                bestMove = legalMoves[i];
                if(beta <= alpha) {
                    break;
                };
            };
        };
    };
    gameState.makeMove(bestMove[0], bestMove[1]);
};

function minimax(boardState, depth, alpha, beta) {
    if(depth == 0) {
        return evaluate(boardState);
    };
    let legalMoves = boardState.getLegalMoves();
    if(legalMoves.length == 0) {
        boardState.currentPlayer *= -1;
        return minimax(boardState, depth - 1, alpha, beta);
    };
    if(boardState.currentPlayer == 1) {
        for(let i = 0; i < legalMoves.length; i++) {
            let nextState = cloneBoard(boardState);
            nextState.move(legalMoves[i][0], legalMoves[i][1]);
            let score = minimax(nextState, depth - 1, alpha, beta);
            if(score > alpha) {
                alpha = score;
                if(alpha >= beta) {
                    break;
                };
            };
        };
        return alpha;
    } else {
        for(let i = 0; i < legalMoves.length; i++) {
            let nextState = cloneBoard(boardState);
            nextState.move(legalMoves[i][0], legalMoves[i][1]);
            let score = minimax(nextState, depth - 1, alpha, beta);
            if(score < beta) {
                beta = score;
                if(beta <= alpha) {
                    break;
                };
            };
        };
        return beta;
    };
};

function evaluate(boardState) {
    if(boardState.getLegalMoves().length == 0) {
        let count = 0;
        for(let y = 0; y < 8; y++) {
            for(let x = 0; x < 8; x++) {
                count += boardState.board[y][x];
            };
        };
        if(count < 0) {
            return Number.NEGATIVE_INFINITY;
        } else if (count > 0) {
            return Number.POSITIVE_INFINITY;
        } else {
            return 0;
        }
    }
    let count = 0;
    for(let y = 0; y < 8; y++) {
        for(let x = 0; x < 8; x++) {
            count += boardState.board[y][x] * valueMap[y][x];
        };
    };
    return count;
};

function cloneBoard(boardState) {
    let clone = new Board();
    for(let y = 0; y < 8; y++) {
        for(let x = 0; x < 8; x++) {
            clone.board[y][x] = boardState.board[y][x];
        };
    };
    clone.currentPlayer = boardState.currentPlayer;
    return clone;
};