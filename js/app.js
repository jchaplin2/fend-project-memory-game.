let Card = function(cssClass, x, y) {
	this.cardClass = cssClass;
	this.xPos = x;
	this.yPos = y;
};

let CardGame = function() {
	let self = this;
	
	//all possible card positions, 16 in all.
	let cardPositions = [
		[0,0], [0,1], [0,2], [0,3],
		[1,0], [1,1], [1,2], [1,3],
		[2,0], [2,1], [2,2], [2,3],
		[3,0], [3,1], [3,2], [3,3],
	];
	
	//types of cards to be matched, 8 in all.
	let listOfCardTypes = [
		"fa fa-diamond",
		"fa fa-paper-plane-o",
		"fa fa-anchor",
		"fa fa-bolt",
		"fa fa-cube",
		"fa fa-leaf",
		"fa fa-bicycle",
		"fa fa-bomb"
	];
	
	//first card selected.
	let firstCard = null;
	
	//second card selected.
	let secondCard = null;
	let numOfMoves = -1;
	let starRating = 5;

	/*
	 * Create a list that holds all of your cards
	 */
	
	let arrayOfCards = new Array(new Array(), new Array(), new Array(), new Array());

	/*
	 * Display the cards on the page
	 *   - shuffle the list of cards using the provided "shuffle" method below
	 *   - loop through each card and create its HTML
	 *   - add each card's HTML to the page
	 */

	// Shuffle function from http://stackoverflow.com/a/2450976
	let shuffle = function (array) {
		let currentIndex = array.length, temporaryValue, randomIndex;

		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	};

	let initArrayOfCards = function(cardPositions) {
		for(let i=0, len=listOfCardTypes.length; i<len; i++) {
			let cardType = listOfCardTypes.pop();
			for(let j=0, numOfCards=2; j<numOfCards; j++) {
				let currCardPos = cardPositions.pop();
				let xPos = currCardPos[0];
				let yPos = currCardPos[1];
				let currCard = new Card(cardType, xPos, yPos);
				arrayOfCards[xPos].push(currCard);
			}
		}
	};
	
	let displayCards = function() {
		let cardHTML = "";
		for(let i=0, len=arrayOfCards.length; i < len; i++) {
			let rowOfCards = arrayOfCards[i];
			for(let j=0, len=rowOfCards.length; j < len; j++) {
				let cssClass = rowOfCards[j].cardClass;
				cardHTML += `<li class="card"><i class="${cssClass}"></i></li>`;
			}
		}
		let cardList = window.document.getElementById("cardList");
		cardList.innerHTML = cardHTML;
		
		let cardArray = window.document.getElementsByTagName("li");
		for(let k=0, len=cardArray.length; k<len; k++) {
			let card = cardArray[k];
			card.addEventListener('click', clickCard, false);
		}
	};
	
    let clickCard = function() {
        let cardItem = this;

        /* There are 3 scenarios for clicCard.
         * 1. no cards are clicked. In this case the first card clicked is stored as firstCard. 
         * 2. 1 card is clicked. In this case the second card clicked is stored as secondCard. 
         * 3. 2 cards are clicked. Don't store any cards because we're trying to match 2 cards at a time.
         */

        if(firstCard === null && secondCard === null) {
            firstCard = cardItem;
        } else if(firstCard !== null && secondCard === null) {
            secondCard = cardItem;

            window.setTimeout(function(){
                checkMatch(secondCard, firstCard);            
            }, 500);
            updateMoves();
            //make every pair of clicks a move.
        } else {
            return;
        }

        cardItem.classList.add("show");
         
        updateRating();
    };

	let checkMatch = function(currClickedCard, prevClickedCard) {
		let cardClass = currClickedCard.children[0].className;
		let prevCardClass = prevClickedCard.children[0].className;

		prevClickedCard.classList.remove("show");
		currClickedCard.classList.remove("show");		
		
		if(cardClass === prevCardClass) {
			prevClickedCard.classList.add("match");
			currClickedCard.classList.add("match");
		}

		checkForWin();
		
		firstCard = null;
		secondCard = null;
	};
	
	let checkForWin = function() {
		var numberOfMatchedCards = window.document.getElementsByClassName("match").length;
		if(numberOfMatchedCards === 16)
			displayWinScreen();
	};
	
	let displayWinScreen = function(){
		let victoryScreen = window.document.getElementById("overlay");
		victoryScreen.style.display = "block";
		let victoryTemplate = `<h1 class="winnerHeader"> Congratulations! You Won! </h1> <div class="winnerMessage">With ${numOfMoves} moves and ${starRating} stars Woohoo! </div> <button class="playAgainButton" onClick="cardGm.reset()"> Play again! </button>`;
		victoryScreen.innerHTML = victoryTemplate;	
	};
	
	this.hideWinScreen = function(){
		let victoryScreen = window.document.getElementById("overlay");
		victoryScreen.style.display = "none";	
	};
	
	let updateMoves = function() {
		numOfMoves++;
		let movesDisplay = window.document.getElementById("moves-counter");
		movesDisplay.innerText = numOfMoves;	
	};
	
	let updateRating = function() {
		if(numOfMoves <= 20)
			starRating = 5;
		else if((numOfMoves > 20) && (numOfMoves <= 30))
			starRating = 4;
		else if((numOfMoves > 30) && (numOfMoves <= 40))
			starRating = 3;
		else if((numOfMoves > 40) && (numOfMoves <= 50))
			starRating = 2;			
		else if((numOfMoves > 50) && (numOfMoves <= 60))
			starRating = 1;
		else
			starRating = 0;
			
		let ratingHTML = "";
		for(let i=0; i<starRating; i++) {
			ratingHTML += "<li><i class='fa fa-star'></i></li>";		
		}
		let ratingDisplay = window.document.getElementById("rating-display");
		ratingDisplay.innerHTML = ratingHTML;
	};

	let currentTimeInSeconds = 0;

	let updateClock = function() {
	  currentTimeInSeconds++;

	  let seconds = currentTimeInSeconds % 60;
	  if(seconds < 10)
		seconds = "0" + seconds;

	  let minutes = Math.floor(currentTimeInSeconds / 60);
	  if(minutes < 10)
		minutes = "0" + minutes;
	  else if(minutes >= 60)
		minutes = minutes % 60;

	  let hours = Math.floor(currentTimeInSeconds / 3600 );
	  if(hours < 10)
		hours = "0" + hours;
	  
	  window.document.getElementById("time").innerText = (hours+" : "+minutes+" : "+seconds);
	}

	setInterval(updateClock, 1000);


	this.reset = function(){
		initialize();
		self.hideWinScreen();
	};
	
	let initialize = function(){
		numOfMoves = -1;
		starRating = 5;
		currentTimeInSeconds = 0;
		let shuffledCardPositions = shuffle(cardPositions);
		initArrayOfCards(shuffledCardPositions);
		displayCards();
		updateMoves();
		updateRating();	
	};
	
	initialize();
};

let cardGm = new CardGame();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
