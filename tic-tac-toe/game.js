var player;
var noOfMoves;
var move;
var result = false;
var gameOver = false;
var gameStart = false;

function startGame(){
var radioValues = document.getElementsByName('playerchoice');
for (var i=0;i< radioValues.length;i++){
	if(radioValues[i].checked){
		gameStart = true;
		document.getElementById('noOfGames').innerText++;
		document.getElementById('message').innerHTML = radioValues[i].value + " to start";
		player = radioValues[i].value;
		noOfMoves = 9;
		document.getElementById('startBtn').disabled = true;
		break;
	}
  }
}

function xnos(id){
	if(gameStart){
		var tile = document.getElementById(id);
		var imgSrc = tile.childNodes[1].src.slice(28,33);
		if(!gameOver){
			if(imgSrc !='X.png' && imgSrc !='O.png'){
				if(player == 'X'){
					tile.childNodes[1].src = 'X.png' ;
					checkWin(player);
					if(result){
						document.getElementById('message').innerHTML = player + " won";
						document.getElementById("player"+player).innerText++;
					}else{
						player = 'O';
						document.getElementById('message').innerHTML = player + "'s turn";		
					}
				}else{
					tile.childNodes[1].src = 'O.png' ;
					checkWin(player);
					if(result){
						document.getElementById('message').innerHTML = player + " won";
						document.getElementById("player"+player).innerText++;

					}else{
						player = 'X';
						document.getElementById('message').innerHTML = player + "'s turn";
								
					}
					
				}

				noOfMoves--;
			//	alert("no of moves left "+ noOfMoves);
				if(noOfMoves < 1 && !result){
					gameOver = true;
					document.getElementById('message').innerHTML = "Game Over. It's a draw";
					document.getElementById("drawCount").innerText++;
				}		
			}
		}
	}
	else{
		document.getElementById('message').innerHTML = "Please make a selection and Click on Start Button!";
	}
}

function checkWin(move){
	if (
		checkRows(1,2,3,move) ||
		checkRows(4,5,6,move) ||
		checkRows(7,8,9,move) ||
		checkRows(1,4,7,move) ||
		checkRows(2,5,8,move) ||
		checkRows(3,6,9,move) ||
		checkRows(1,5,9,move) ||
		checkRows(3,5,7,move)
	)

		{
		gameOver = true;
		result = true;
		}
		return result;
}

function checkRows(a,b,c,move){

	if( 
		(getSquare(a)==move) &&
		(getSquare(b)==move) &&
		(getSquare(c)==move) 
	  )
	{
		result = true;
	}
	return result;
}

function getSquare(number){
	return document.getElementById('b' + number).childNodes[1].src.slice(28,29);
}

function restart(){
	document.getElementById('startBtn').disabled = false;
	var tileBox = document.getElementsByClassName('tile');
	for(var i =0; i < tileBox.length;i++){
		tileBox[i].childNodes[1].src = "";
	};

	var radioValues = document.getElementsByName('playerchoice');
	for (var i=0;i< radioValues.length;i++){
	radioValues[i].checked = false;
	}
	document.getElementById("message").innerHTML = "Let's Play Again!";
	noOfMoves = 9;
	result = false;
	gameOver = false;
	gameStart = false;
}