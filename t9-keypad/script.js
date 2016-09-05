
var count = 0;
var seconds;
var countDown;
var timer2 = 3;
var timer = 3;
var prevValue;
var countId;
var intervalId;
var arrayKeys = [	
					['.',',','\'',1],
					['a','b','c',2],
					['d','e','f',3],
					['g','h','i',4],
					['j','k','l',5],
					['m','n','o',6],
					['p','q','r',7],
					['s','t','u',8],
					['v','x','y',9],
					['*','#','*','#'],
					['z',' ',';',0]

				];

function btnReleased(id){
	if(timer > 1){
		var someValue = id - prevValue;
		if ( countDown >1 && someValue == 0 ){			
			cycleValues(id);
		}
		else{
			newKey(id);
		}
	}
	else{
		if(id < 10){
			document.getElementById('display').innerText += id;	
		}
		else{
			if(id==10){
				document.getElementById('display').innerText += '*';
			}else{
				document.getElementById('display').innerText += '0';
			}
		}
	}
	stopTimer();
	startCount();
	if(countDown <= 1){
		stopCount();
	}
}

function btnClicked(id){
	resetTimer();
	startTimer();
	resetCount();
	stopCount();	
}
	
function cycleValues(id){
	prevValue = id;
	count++;
	if(count >4){
		count = 1;
	}
	var res = arrayKeys[id-1][count-1]; 
	var curr = document.getElementById('display').innerText;
	var word = (curr.slice(0,curr.length-1) + res);
	document.getElementById('display').innerText = word;
}

function newKey(id){
	prevValue = id;
	count = 0;
	count++;
	if(count >4){
		count = 1;
	}
	var res = arrayKeys[id-1][count-1]; 
	document.getElementById('display').innerHTML += res;
}
function deleteEntry(){
	var curr = document.getElementById('display').innerText;
	var word = (curr.slice(0,curr.length-1));
	document.getElementById('display').innerText = word;	
	stopTimer();
	stopCount();
	resetCount();
	resetTimer();
	startCount();
	startTimer();
}

function startTimer(){
	seconds = timer;
	if( seconds <= 0){
		stopTimer();
	}
	else{
		timer = timer -1;
		intervalId = setTimeout(function(){startTimer()}, 1000);
	}
}

function stopTimer(){
	clearTimeout(intervalId);
}

function resetTimer(){
	timer = 3;
}

function startCount(){
	countDown = timer2;
	if( countDown == 0){
		stopCount();
	}
	else{
		timer2 = timer2 -1;
		countId = setTimeout(function(){startCount()}, 1000);
	}
}

function stopCount(){
	clearTimeout(countId);
}

function resetCount(){
	timer2 = 3;
}