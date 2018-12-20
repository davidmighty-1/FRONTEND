/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var globalScores, roundScore, activePlayer, gamePlaying;

init();

var lastScore;
//dice = Math.floor((Math.random() * 6) + 1); //random values for the dice between 0 and 6

//MANIPULATION OF THE DOCUMENT OBJECT
//document.querySelector('#current-' + activePlayer).textContent = dice; //Changes the content of the id #current-0 and current-1 for each player in the html
//querySelector is a document object method to select an element just like in css
//textContent is a method to change the content of an element

/*------- Using querySelector to get the content of an element
var x = document.querySelector('#score-0').textContent;
console.log(x);
------*/

//eventHandler
document.querySelector('.btn-roll').addEventListener('click', function () {
    var dice, diceDOM;
    if (gamePlaying) {
    //1. Random Number is generated
        dice = Math.floor((Math.random() * 6) + 1);
    //2. Display of the result with the image
        diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'img/dice-' + dice + '.png';
    //3.switch to other player and erase score if player rolls 6 twice 
    //update the roundScore if the dice rolls NOT 1 and changes to next player and roundScore to zero if 1
        if ((dice === 6) && (lastScore === 6)) {
            globalScores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice !== 1) {
            roundScore += dice; // updates the roundScore by adding dice and reassigning
            document.querySelector('#current-' + activePlayer).textContent = roundScore; //outputs the updated roundScore
        } else {
            nextPlayer(); //used because of the DRY principle
        }
        lastScore = dice;
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
    //1. Add roundScore to globalScore of activePlayer
        globalScores[activePlayer] += roundScore;
    //2.Display the score by changing the globalScore on the UI
        document.querySelector('#score-' + activePlayer).textContent = globalScores[activePlayer];
    //3.Check if active player has won
        if (globalScores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!'; //Changes the UI of the player name to WINNER 
            document.querySelector('.player-panel' + activePlayer).classList.add('winner');
            document.querySelector('.player-panel' + activePlayer).classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            gamePlaying = false;
        } else {
    //4.Next player
            nextPlayer(); //used because of the DRY principle
        }
    }
    
});



function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //tenary operator , if dice rolls one, if activePlayer is zero, it changes to 1 else remains as zero
    roundScore = 0; //resets roundScore to zero
        //visually sets the score to zero
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
        //visually shows which player is active by changing the class and hiding the image
    document.querySelector('.player-panel0').classList.toggle('active'); //toggles the active class on and off from the div player-panel1
    document.querySelector('.player-panel1').classList.toggle('active'); //toggles the active class on and off from the div player-panel2
        
    document.querySelector('.dice').style.display = 'none';
        /*
        document.querySelector('.player-panel0').classList.remove('active'); //removes the active class from the div player-panel1
        document.querySelector('.player-panel1').classList.add('active'); //adds the active class from the div player-panel1 to player-panel2*/
}


document.querySelector('.btn-new').addEventListener('click', init);



function init() {
    globalScores = [0, 0]; //globalscores of each player
    roundScore = 0; //ROUND score for each player per round
    activePlayer = 0; //activeplayer 0, for first player and 1 for second player
    gamePlaying = true; //state variable, initialize function runs when gamePlaying is true
    
    document.querySelector('.dice').style.display = 'none'; //changes the css property of an element(dice)
    document.getElementById('score-0').textContent = '0'; //changes the GLOBAL SCORE for player1 to 0
    document.getElementById('score-1').textContent = '0';//changes the GLOBAL SCORE for player2 to 0
    document.getElementById('current-0').textContent = '0';//changes the ROUND SCORE for player1 to 0
    document.getElementById('current-1').textContent = '0';//changes the ROUND SCORE for player2 to 0
    document.getElementById('name-0').textContent = 'PLAYER 1'; //Changes the UI of the player name to PLAYER 1
    document.getElementById('name-1').textContent = 'PLAYER 2'; //Changes the UI of the player name to PLAYER 2
    document.querySelector('.player-panel0').classList.remove('winner');
    document.querySelector('.player-panel1').classList.remove('winner');
    document.querySelector('.player-panel0').classList.remove('active');
    document.querySelector('.player-panel1').classList.remove('active');
    document.querySelector('.player-panel0').classList.add('active');
}