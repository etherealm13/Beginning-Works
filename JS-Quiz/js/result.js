function loadResults(){
	var contentResults = "";
	isQuiz = false;
	
	document.getElementById('app').innerHTML = "<h2 class='text-center'>"+ userName +", Here's your results: </h2><br>";
	for( var i=0; i < question.length;i++){
		contentResults += "<h4>Question " + question[i].id + ". " + question[i].q +"</h4><br/>";
		contentResults += "<span class='correctAnswer'>Correct Answer: <span>"+ question[i].a + " </span> </span>";
		
		// Change the answer colour to red if it's wrong and green if it's right
		if (question[i].a === userAnswers[i]){
			contentResults += "<span class='correctAnswer'>Your Answer: <span>"+ userAnswers[i] + " </span></span> <br/></br>";			
		}else{
			contentResults += "<span class='userAnswer'>Your Answer: <span>"+ userAnswers[i] + "</span></span> <br/></br>";
		}
	}
	document.getElementById('results-content').innerHTML += contentResults;
	checkResults();
}

function checkResults(){
	var count = 0;
	for(var i = 0; i < question.length; i++){
		if(question[i].a == userAnswers[i]){
			count++;
		}
	}
	
	document.getElementById('results-preview').innerHTML = 
		"<h3><span>Questions Attempted: <b>"+ question.length +"</b></span>" + 
		" <span>Correctly Answered: <b>" + count + "</b></span></h3>";

	//call the google chart to draw the user graph
	drawChart(count,question.length);
}


// To redraw charts on resize for responsiveness
$(window).resize(function(){
	if(i>=question.length){ //to prevent false calls
	  checkResults();	
	}else{
		return;
	}
});
