const pages = ['<h2 class="title mb-3">Othello AI</h2><p class="text">A browser-based Othello game with customisable AI players.</p><p class="text">This short help section will first explain the rules of Othello, and then quickly go through the AI options.</p><button id="helpNext" class="btn btn-primary mb-1" style="width: 100%">Next Page</button><button id="helpClose" class="btn btn-danger" style="width: 100%">Close</button>',
               '<h2 class="title mb-3">How to Play</h2><p class="text">In Othello, the objective is to end the game with more of your pieces on the board than your opponent. The game alternates between black and white until there are no more valid moves. If a player can not move but the other can, then their move is skipped.</p><p class="text">Upon placing a piece, if any of the opposing player\'s pieces are caught between that piece and another of your pieces (horizontally, vertically, or diagonally), then those opposing player\'s pieces are replaced by your pieces.</p><p class="text">A move is valid when it would cause one or more of the opposing player\'s pieces to be replaced. Possible moves are shown on the board with an outline of the piece.</p><button id="helpNext" class="btn btn-primary mb-1" style="width: 100%">Next Page</button><button id="helpBack" class="btn btn-primary mb-1" style="width: 100%">Previous Page</button><button id="helpClose" class="btn btn-danger" style="width: 100%">Close</button>',
               '<h2 class="title mb-3">AI Options</h2><p class="text">You can choose which player(s) the AI controls using the corresponding player\'s \'AI Controlled\' checkbox.</p><p class="text">You can also control the search depth of the AI, if both players are AI controlled then this value can be different for both. The search depth controls how many moves ahead the AI will look when deciding where to place their piece, the AI should beat most human players at around search depth 7+.</p><p class="text">Be aware that the higher the search depth the longer it will take for the AI to move. Your browser may think the site has crashed at high search depths, but the AI is just thinking!</p><button id="helpNext" class="btn btn-primary mb-1" style="width: 100%">Next Page</button><button id="helpBack" class="btn btn-primary mb-1" style="width: 100%">Previous Page</button><button id="helpClose" class="btn btn-danger" style="width: 100%">Close</button>',
               '<h2 class="title mb-3">Enjoy!</h2><p class="text">If you want to look at the source code, or just have some suggestions, then check out the <a href="https://github.com/BSmith156/Othello-AI" target="_blank">GitHub page</a>.</p><button id="helpBack" class="btn btn-primary mb-1" style="width: 100%">Previous Page</button><button id="helpClose" class="btn btn-danger" style="width: 100%">Close</button>'];
let current = -1;

// Display next help page
export function helpNext() {
    if(current < pages.length - 1){
        current++;
    }
    document.getElementById("help").innerHTML = pages[current];
    resetListeners();
}

// Display previous help page
function helpBack() {
    if(current > 0){
        current--;
    }
    document.getElementById("help").innerHTML = pages[current];
    resetListeners();
}

// Close help
function helpClose() {
    document.getElementById("help").hidden = true;
    document.getElementById("main").hidden = false;
}

// Reset button listeners
function resetListeners(){
    if(document.getElementById("helpNext")) {
        document.getElementById("helpNext").addEventListener("click", helpNext);
    }
    if(document.getElementById("helpBack")) {
        document.getElementById("helpBack").addEventListener("click", helpBack);
    }
    if(document.getElementById("helpClose")) {
        document.getElementById("helpClose").addEventListener("click", helpClose);
    }
}