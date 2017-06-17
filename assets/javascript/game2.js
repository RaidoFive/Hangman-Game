/*  NOTE:  A lot of credit goes to Daniel for a tremendous amount of help in getting the code working.  It's
	should be noted I pseudo-coded this, knowing what I wanted out of the code, especially in my belief that 
	this could be done without having to array the entire alphabet.  I have also learned a good lesson about 
	positioning my notes within the code, and moving forward will be posting them above lines of code.  During
	the writing of my notes, I broke the code accidentally in ways that caused hours of troubleshooting.  
	Some of hose issues I never reconciled, and Daniel came up with the answer.  My notes are an attempt to 
	demonstrate my understanding (or lack thereof) of the code.
*/
	//array to store random work options

	var wordArray = [ "scythe", "reaper", "skull", "lantern", "skeleton", "crow", "hourglass", "time"];

	//declare and define variables

	var placeHolder = [];   //hidden word, reveal as letters are guessed.
	var guesses = 6;        //countdown from 6, lose @ 0.
	var guessed = [];	    //guessed letters, user inputs will be pushed to this empty array.
	var selectedWord = "";  //empty string, to be filled with random word selected from array.
	var placeholder = document.getElementById("placeholder"); // getting id's from HTML, to return changes made in Javascript.
	var guessedId = document.getElementById("guessed");
	var guessesId = document.getElementById("guesses");
	var wins = 0;           // assigning starting win value of 0.
	var winsId = document.getElementById("wins");

	// executing functions

function writeWord() {
		placeHolder = [];               // assigning empty array for placeHolder 
		guessed = [];                   // assigning empty array, filled in onKey function by pushing keyValue to array.
		guessesId.innerHTML = guesses;  //
		guessedId.innerHTML = "";
		placeholder.innerHTML = "";
		winsId.innerHTML = wins;
		selectedWord = wordArray[Math.floor(Math.random() * wordArray.length)]; // selecting random word from array
		for(var i = 0; i < selectedWord.length; i++) {  // for loop... 
			placeHolder[i] = "_"; 							// ...assigning value of "_" to empty array of placeHolder,
			placeholder.innerHTML += placeHolder[i] + " ";  // and writing to HTML with a space between each underscore
		}
	}

	function onKey(keyRegister) {
		var keyValue = keyRegister.keyCode;
		if(keyValue >= 65 && keyValue <= 90){  //<--checking key event against value of Key Codes in if statment
			keyValue = keyRegister.key.toLowerCase(); //<--converting user input @ key event to lowercase so that letter input returns true.
			if(!guessed.includes(keyValue)) {  // if guessed variable ( = []) doesn't have value of variable keyValue within array....										       // ...add the value of keyValue to guessed array.  Array is no longer empty as defined.
    			guessed.push(keyValue);        // ...push function to add value of keyValue to guessed variables empty array.
    			guessedId.innerHTML = "";						// defining space in guessedId displayed in HTML as blank.
    			guessed.forEach(function(value, index, array) {		// calling function for arguments, in this case...
    				guessedId.innerHTML += array[index] + " ";	// returning index of variable guessed + open space.  This will...
    																// create the underscore
    			});

	    		if(selectedWord.includes(keyValue)) {              // if selected word includes value of variable keyValue...
	    			for(var i = 0; i < selectedWord.length; i++) { // for loops sets up...
	    				if(keyValue === selectedWord.charAt(i)) {  // if the Key Value  is a match within the selected word...
	    					placeHolder[i] = keyValue;             // then the underscored spot matching the Key Value...
	    													       // is assigned the letter the player selected.
	    				} 
	    			}
	    			placeholder.innerHTML = "";								//writing blank space in the placeholder variable...
	    			placeHolder.forEach(function(value, index, array) {		// for Each function to run 3 arguments...
	    				placeholder.innerHTML += placeHolder[index] + " ";  // and add a letter plus a space in the array for...
	    			});	
	    		} else {
    				guesses --; 					// guesses are reduced by one (decremented)
    				guessesId.innerHTML = guesses;  // writing the value of guessesId to HTML.
    							// loss condition
    				if(guesses === 0) {				// if number of guesses are reduced to zero, game over!...
   						guesses = 6;				// guesses restore to starting point of 10...
   						writeWord(); 				// new random word selected, game starts over.
   					}
   				}																//... each letter in the randomly given word.
	    		// win condition
    			if(!placeHolder.includes("_")) { // win condition if placeholder does NOT include variable underscore...
    				wins++;						 // user wins! Add one to wins.
    				writeWord();				 // restart!
    			} 
			} 
		
   	}	
}		
	
	writeWord();
	document.addEventListener("keyup", onKey); //function listening for a players input
