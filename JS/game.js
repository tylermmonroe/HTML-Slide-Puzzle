//Image slices
var images = [
    '1_1', '1_2', '1_3', '1_4',
    '2_1', '2_2', '2_3', '2_4',
    '3_1', '3_2', '3_3', '3_4',
    '4_1', '4_2', '4_3', '4_4'
];
var isStarted = false;
var imagesShuffled = [];
//Div that holds the images
var container = document.getElementById('piece-container');

//Start game button
var startGameButton = document.getElementById('btn-start');

drawPuzzle(images);

startGameButton.addEventListener('click', function(event) {
    console.log('Start Game');
    StartGame();
});

function clearGame() {
    container.innerHTML = '';
    
}

function StartGame() {
    isStarted = true;
    for (i = 0; i < images.length; i++) {
        imagesShuffled[i] = images[i];
    }
    shuffle(imagesShuffled);
    imagesShuffled[0] = 'blank';
    shuffle(imagesShuffled);
    drawPuzzle(imagesShuffled);
}

function drawPuzzle(imageSet) {
    clearGame();
    //Create images and place into HTML
    var row = 1;
    var column = 0;
    for (i = 0; i < images.length; i++) {
        column++;
        if(column == 5) {
            row++;
            column = 1;
        }
        container.innerHTML += '<div class="col-3" style="max-width:187px"> <img id="'+row+'_'+column+'" data-row="'+ row +'" data-col="'+ column +'" class="" src="./img/' + imageSet[i] + '.png"/> </div>'
    }
}

container.addEventListener('click', function(event){
    if(!isStarted || event.target.getAttribute('data-row' == null)) {
        return;
    }
    var row = parseInt(event.target.getAttribute('data-row'));
    var column = parseInt(event.target.getAttribute('data-col'));
    
    console.log(event.target);
    //Logs row and col of image
    console.log('Row: ' + row + ' ' + 'Col: ' + column);

    checkAbove(row - 1, column);
    checkBelow(row + 1, column);
    checkLeft(row, column - 1);            
    checkRight(row, column + 1);
    if(checkVictory() == true) {
        alert('Yaaaay')
        isStarted = false;
    }
});

function checkAbove(row, column) {
    if(row == 0 || isNaN(row)) {
        return;
    }
    console.log('Above: ' + document.getElementById(row+'_'+column).src);
    if(document.getElementById(row+'_'+column).src.includes('blank.png')) {
        var temp = document.getElementById((row + 1)+'_'+column).src;
        document.getElementById((row + 1)+'_'+column).src = document.getElementById(row+'_'+column).src;
        document.getElementById(row+'_'+column).src = temp;
    }
}
function checkBelow(row, column) {
    if(row == 5 || isNaN(row)) {
        return;
    }
    console.log('Below: ' + document.getElementById(row+'_'+column).src);
    if(document.getElementById(row+'_'+column).src.includes('blank.png')) {
        var temp = document.getElementById((row - 1)+'_'+column).src;
        document.getElementById((row - 1)+'_'+column).src = document.getElementById(row+'_'+column).src;
        document.getElementById(row+'_'+column).src = temp;
    }
}
function checkLeft(row, column) {
    if(column == 0 || isNaN(column)) {
        return;
    }
    console.log('Left: ' + document.getElementById(row+'_'+column).src);
    if(document.getElementById(row+'_'+column).src.includes('blank.png')) {
        var temp = document.getElementById(row+'_'+(column + 1)).src;
        document.getElementById(row+'_'+(column + 1)).src = document.getElementById(row+'_'+column).src;
        document.getElementById(row+'_'+column).src = temp;
    }
}
function checkRight(row, column) {
    if(column == 5 || isNaN(column)) {
        return;
    }
    console.log('Right: ' + document.getElementById(row+'_'+column).src);
    if(document.getElementById(row+'_'+column).src.includes('blank.png')) {
        var temp = document.getElementById(row+'_'+(column - 1)).src;
        document.getElementById(row+'_'+(column - 1)).src = document.getElementById(row+'_'+column).src;
        document.getElementById(row+'_'+column).src = temp;
    }
}
function checkVictory() {
    var row = 1;
    var column = 0;
    for (i = 0; i < images.length; i++) {
        column++;
        if(column == 5) {
            row++;
            column = 1;
        }
        if(!document.getElementById(row+'_'+column).src.includes(images[i]) && !document.getElementById(row+'_'+column).src.includes('blank.png')) {
            return false;
        }   
    }
    return true;
}