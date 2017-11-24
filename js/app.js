let Card = function(cssClass, x, y) {
	this.cardClass = cssClass;
	this.xPos = x;
	this.yPos = y;
};

let CardGame = function(){
	let cardPositions = [
		[0,0], [0,1], [0,2], [0,3],
		[1,0], [1,1], [1,2], [1,3],
		[2,0], [2,1], [2,2], [2,3],
		[3,0], [3,1], [3,2], [3,3],
	];
	
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
			card.addEventListener('click', function(){
				this.classList.add("match");
			}, false);
		}
	};
	
	let shuffledCardPositions = shuffle(cardPositions);
	initArrayOfCards(shuffledCardPositions);
	displayCards();
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
