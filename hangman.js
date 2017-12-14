"use strict";

// vocabulary library //
var wordsLibrary=['rock', 'paper', 'scissors', 'hello','hangman', 'good', 'bad', 'game', 'try'];

var tb = document.getElementById("wordTable");

var contentStr = getWord(); // word chosen randomly from function getWord() //
var wordLength = contentStr.length;
console.log("The length of the word is " + wordLength);

// lives //
var lives = 5;

var confirmBox;

function getWord() {
    console.log("Run getWord Function");
    var word = wordsLibrary[Math.floor(Math.random()*wordsLibrary.length)];
    var wordString = word.toString().toUpperCase();
    console.log("The word is "+ wordString+" , the type of it is "+ typeof wordString );
    var wordSplit = wordString.split("");
    console.log("The array of the word is " + wordSplit);
    return wordSplit
}

function createCell(newWord) {
    // create basic table element //
    var row = document.createElement("tr");
    tb.appendChild(row);
    console.log("Run createCell function");
    var w = newWord;
    var i;
    console.log("The array in createCell function is "+ w);
    for (i=0; i<wordLength; i++) {
        var cell = document.createElement("td");
        row.appendChild(cell);
        var content = document.createTextNode(w[i]);
        cell.appendChild(content);
        tb.rows[0].cells[i].classList.add("unmatch");
    }
}

function generate() {
    document.getElementById("inputText").value = "";
    document.getElementById("hangmanpic").src= "hmstages/6.png";
    tb.innerHTML = "";
    contentStr = getWord();
    wordLength = contentStr.length;
    var newTable = createCell(contentStr);
    document.getElementById("livearea").innerHTML = "You have 6 lives left!";
    lives = 5
}

function compare(){
    document.getElementById("alertarea").innerHTML = "";
    var guess = document.getElementById("inputText").value.toUpperCase();
    console.log("The user input is " + guess);
    var c;
    var unMatchCount = document.getElementsByClassName("unmatch").length-1;
    if (unMatchCount === 0){
        confirmBox = confirm("Congratulations, You win! Try another word?");
        if (confirmBox == true){
            generate();
            return;
        }
    }
    console.log("unmatch counter: " + unMatchCount);
    console.log(contentStr.indexOf(guess));
    //clear input area each time//
    document.getElementById("inputText").value = "";
    if (contentStr.indexOf(guess) >= 0) {
        for (c = 0; c < wordLength; c++) {
            var cell = tb.rows[0].cells[c].textContent;
            if (cell === guess) {
                //tb.rows[0].cells[c].style.backgroundColor = "#FF9900";
                tb.rows[0].cells[c].classList.remove("unmatch");
                tb.rows[0].cells[c].classList.add("match");
                document.getElementById("alertarea").innerHTML = "Good Guess!";
            }
        }
    }else
    {
        document.getElementById("alertarea").innerHTML = "Try Again!";
        if(lives > 0){
            lives--;
            var livesDisplay= lives + 1;
            document.getElementById("hangmanpic").src = "hmstages/"+ livesDisplay +".png";
            document.getElementById("livearea").innerHTML = "You have "+ livesDisplay +" lives left!";
        }else if(lives === 0){
            document.getElementById("inputText").value = "Try Again!";
            document.getElementById("livearea").innerHTML = "Sorry, you lose! Try generate another word!";
            document.getElementById("hangmanpic").src = "hmstages/0.png"
        }
        console.log(lives);
    }
}


