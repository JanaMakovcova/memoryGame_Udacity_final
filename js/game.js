let iconCardClass1 = '';
let iconCardElement1;
let iconCardClass2 = '';
let iconCardElement2;
let gameOver;
let numberOfMoves = 0;
let timerInterval = null;

//array of cards for game, each icon is included twice
const cards = [
    {iconName: 'icon-spring', found: false, turnUp: false, number: "card0"},
    {iconName: 'icon-tomcat', found: false, turnUp: false, number: "card1"},
    {iconName: 'icon-jquery', found: false, turnUp: false, number: "card2"},
    {iconName: 'icon-reactjs', found: false, turnUp: false, number: "card3"},
    {iconName: 'icon-javascript', found: false, turnUp: false, number: "card4"},
    {iconName: 'icon-html5', found: false, turnUp: false, number: "card5"},
    {iconName: 'icon-css3', found: false, turnUp: false, number: "card6"},
    {iconName: 'icon-java', found: false, turnUp: false, number: "card7"},
    {iconName: 'icon-spring', found: false, turnUp: false, number: "card8"},
    {iconName: 'icon-tomcat', found: false, turnUp: false, number: "card9"},
    {iconName: 'icon-jquery', found: false, turnUp: false, number: "card10"},
    {iconName: 'icon-reactjs', found: false, turnUp: false, number: "card11"},
    {iconName: 'icon-javascript', found: false, turnUp: false, number: "card12"},
    {iconName: 'icon-html5', found: false, turnUp: false, number: "card13"},
    {iconName: 'icon-css3', found: false, turnUp: false, number: "card14"},
    {iconName: 'icon-java', found: false, turnUp: false, number: "card15"}
];
// function for random shuffle of array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// function for star rating
// when game begin, add 3 stars
function starsBegin (){
    const newElement1 = document.createElement('i');
    newElement1.classList.add('fas','fa-star');
    const newElement2 = document.createElement('i');
    newElement2.classList.add('fas','fa-star');
    const newElement3 = document.createElement('i');
    newElement3.classList.add('fas','fa-star');
    document.getElementById('stars').appendChild(newElement1);
    document.getElementById('stars').appendChild(newElement2);
    document.getElementById('stars').appendChild(newElement3);
}

//function for star rating
// remove 1 star
function removeStar(){
    const stars = document.getElementById('stars');
    if (stars.lastElementChild) {
        stars.lastElementChild.parentNode.removeChild(stars.lastElementChild);
    }
}

//function for star rating
//remove all stars after last game (if any)
function removeAllStars(){
    const stars = document.getElementById('stars');
    for (let i = 0; i < 3; i++){
        if (stars.lastElementChild) {
            stars.lastElementChild.parentNode.removeChild(stars.lastElementChild);
        }
    }

}


function makeGameBoard(){
    //add button with number of moves
    const buttonMoves = document.getElementById('moves');
    buttonMoves.textContent = numberOfMoves;

    //clean game-board (remove cards)
    const allContent = document.getElementById('game-board');
    allContent.innerHTML = '';

    //remove button-over if there is any
    const headButtonOver = document.getElementById('button-over');
    if (headButtonOver){
        headButtonOver.parentNode.removeChild(headButtonOver);
    }
}
// for each card from cards array this loop create new icon
// and appends it to new created <li>
// maked element with right class names is appended to game-board flexbox
function putCards(cards){
        cards.forEach(function (card) {
            const newElement = document.createElement('i');
            newElement.classList.add(card.iconName, 'number_center', card.number);
            const newLiElement = document.createElement('li');
            newLiElement.classList.add('flex-item', 'color-turndown');
            newLiElement.appendChild(newElement);
            document.getElementById("game-board").appendChild(newLiElement);
        });
}
// function for calculate time from value(all seconds)
// returns string minutes:seconds
function getTimeString(value){
    let minutes = 0;
    let seconds = value;
    if (value >= 60) {
        minutes = (seconds - seconds % 60)/60;
        seconds = seconds % 60;
    }
    if (seconds < 10) {
        let stringOfTime = minutes + " : 0" + seconds;
        return stringOfTime;
    }
    else {
        let stringOfTime = minutes + " : " + seconds;
        return stringOfTime;

    }
}

//timer for game
function changeValue() {
    ++value;
    //show timer
    document.getElementById("timer").innerHTML = getTimeString(value);
}

function start() {
    stop(); // stoping the previous counting (if any)
    value = 0;
    timerInterval = setInterval(changeValue, 1000);
}

function stop() {
    clearInterval(timerInterval);
}

function afterGameOver() {
    const buttonStart = document.getElementById('start');
    const buttonOver = document.createElement('button');
    const divOver = document.createElement('div');
    const head = document.getElementById('head');
    const allContent = document.getElementById('game-board');
    const spanGameOver1 = document.createElement('p');
    const spanGameOver2 = document.createElement('p');
    const spanGameOver3 = document.createElement('p');
    const buttonOk = document.createElement('button');

    //adding stars to popup button
    const newDivStar = document.createElement('div');
    const newElement1 = document.createElement('i');
    const newElement2 = document.createElement('i');
    const newElement3 = document.createElement('i');
    if (numberOfMoves > 20) {
        newElement1.classList.add('fas','fa-star');
        newDivStar.appendChild(newElement1);
    } else if ((numberOfMoves > 12)&&(numberOfMoves <= 20)) {
        newElement1.classList.add('fas','fa-star');
        newDivStar.appendChild(newElement1);
        newElement2.classList.add('fas','fa-star');
        newDivStar.appendChild(newElement2);
    } else {
        newElement1.classList.add('fas','fa-star');
        newDivStar.appendChild(newElement1);
        newElement2.classList.add('fas','fa-star');
        newDivStar.appendChild(newElement2);
        newElement3.classList.add('fas','fa-star');
        newDivStar.appendChild(newElement3);
    }
    newDivStar.setAttribute('class', 'stars');
    
    divOver.setAttribute('id', 'modal-inner');
    buttonOver.appendChild(divOver);
    spanGameOver1.textContent = 'GAME OVER';
    spanGameOver2.textContent = "Number of moves: " + numberOfMoves;
    buttonOk.textContent = 'OK';
     //count minutes and seconds from value
    spanGameOver3.textContent = "Time: " + getTimeString(value);
    divOver.appendChild(spanGameOver1);
    divOver.appendChild(spanGameOver2);
    divOver.appendChild(spanGameOver3);
    divOver.appendChild(buttonOk);
    divOver.appendChild(newDivStar);
    buttonOver.setAttribute('id', 'button-over');
    allContent.appendChild(buttonOver);

    buttonOver.style.display = "block";
    //stop timer
    stop();

    //click anywhere outside of popup, close it
    //on click on button Ok, close popup
    function closePop(event){
        if (event.target == buttonOk) {
            buttonOver.style.display = "none";
        }
    }
    buttonOk.addEventListener('click',closePop);
    window.addEventListener('click',closePop);






}
//this function compares two cards,
//first is already saved in iconCardClass1 and iconCardElement1 variables
//second comes as parameters
function ifSame(clickedIcon, clickedIconElement){
    const buttonMoves = document.getElementById('moves');
    let indexOfCard1 = 0;
    let indexOfCard2 = 0;

    if (iconCardClass1 === '') {
        iconCardClass1 = clickedIcon;
        iconCardElement1 = clickedIconElement;
    } else if (iconCardClass2 === '') {
        iconCardClass2 = clickedIcon;
        iconCardElement2 = clickedIconElement;

        //this will be done only if iconCardClass1 or iconCardClass2 is ''
        if (iconCardClass1 === iconCardClass2) {

            //same cards
            numberOfMoves = numberOfMoves + 1;
            buttonMoves.textContent = numberOfMoves;
            if (numberOfMoves === 12) {
                removeStar();
            }
            if (numberOfMoves === 20) {
                removeStar();
            }

            iconCardElement2.parentNode.classList.toggle('color-found');
            iconCardElement1.parentNode.classList.toggle('color-found');

            //find index of both cards
                cards.forEach(function (card){
                    if (card.number === iconCardElement1.classList[2]) {
                        indexOfCard1 = cards.indexOf(card);
                    }
                });

                cards.forEach(function (card){
                    if (card.number === iconCardElement2.classList[2]) {
                        indexOfCard2 = cards.indexOf(card);
                    }
                });
            //set .found to true
            cards[indexOfCard1].found = true;
            cards[indexOfCard2].found = true;

            //set gameOver to false if there is any not found card
            gameOver = true;
            cards.forEach(function (card){
                if (card.found === false) {
                    gameOver = false;
                }
            });

            if (gameOver) {
             afterGameOver();
            }
            iconCardClass1 = '';
            iconCardClass2 = '';

        } else {
            // not same cards
            numberOfMoves = numberOfMoves + 1;
            buttonMoves.textContent = numberOfMoves;
            if (numberOfMoves === 12) {
                removeStar();
            }
            if (numberOfMoves === 20) {
                removeStar();
            }

            cards.forEach(function (card){
                if (card.number === iconCardElement1.classList[2]) {
                    indexOfCard1 = cards.indexOf(card);
                }
            });
            cards.forEach(function (card){
                if (card.number === iconCardElement2.classList[2]) {
                    indexOfCard2 = cards.indexOf(card);
                }
            });
            cards[indexOfCard1].turnUp = true;
            cards[indexOfCard2].turnUp = true;

            //not same card turn back after some delay
            setTimeout(turnBack, 1000);
            function turnBack(){
                iconCardElement2.parentNode.classList.toggle('color-turndown');
                iconCardElement1.parentNode.classList.toggle('color-turndown');
                cards[indexOfCard1].turnUp = false;
                cards[indexOfCard2].turnUp = false;
                iconCardClass1 = '';
                iconCardClass2 = '';
            }
        }
    }
}

function onClickCard(e){
    let clickedIcon;
    let clickedIconElement;
    let indexOfCard = 0;

    // e.target refers to the clicked <li> element  or <i>
    if(e.target && (e.target.nodeName == "LI" || e.target.nodeName == "I")) {
        //change color of LI not I element
        if(e.target.nodeName == "LI") {
            clickedIcon = e.target.firstChild.classList[0];
            clickedIconElement = e.target.firstChild;
            //find index of card from array, that was clicked on
            cards.forEach(function (card){
                if (card.number === clickedIconElement.classList[2]) {
                  indexOfCard = cards.indexOf(card);
            }
            });
            //if card is not already turnUp or clicked card is not third,
            // let card be compared inside ifSame function
            if ((!cards[indexOfCard].turnUp) && ((iconCardClass1 === '')||(iconCardClass2 === ''))){
                clickedIconElement.parentNode.classList.toggle('color-turndown');
                cards[indexOfCard].turnUp = true;
                ifSame(clickedIcon, clickedIconElement);
            }
        }
        else {
            //if icon is clicked
            clickedIcon = e.target.classList[0];
            clickedIconElement = e.target;

            //find index of card from array, that was clicked on
            cards.forEach(function (card){
                if (card.number === clickedIconElement.classList[2]) {
                    indexOfCard = cards.indexOf(card);
                }
            });

            //if card is not already turnUp or clicked card is not third, let card be compared
            if ((!cards[indexOfCard].turnUp) && ((iconCardClass1 === '')||(iconCardClass2 === ''))){
                clickedIconElement.parentNode.classList.toggle('color-turndown');
                cards[indexOfCard].turnUp = true;
                ifSame(clickedIcon, clickedIconElement);
            }
        }
    }
}

function startGame() {
    //initialize variables
    iconCardClass1 = '';
    iconCardClass2 = '';
    gameOver = false;
    numberOfMoves = 0;
    cards.forEach(function (card){
        card.found = false;
        card.turnUp = false;
    });

    //star rating initialize
    removeAllStars();
    starsBegin();
    start();
    makeGameBoard();
    shuffleArray(cards);
    
    //put cards on game-board
    putCards(cards);

    //add listener on <ul> element with cards
    document.getElementById("game-board").addEventListener('click', onClickCard, false);
}

document.getElementById('start').addEventListener('click',startGame);




