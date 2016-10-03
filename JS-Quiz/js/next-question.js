var timer; //To clear the setTimeout function

function nextQ(){
	i +=1 ;
	if(i <= question.length){
		var userChoice = document.querySelector('input[name="options"]:checked').value;
		userAnswers.push(userChoice); //user's answers are stored in this array
		$(":radio[name='options']").attr("disabled", false);
		loadQuestions(i);
	}else{
		loadResults();			
	}
	clearTimeout(timer);
}

function timeoutInit(){
	$(":radio[name='options']").attr("disabled", true); // To prevent multiple submissions
	timer = setTimeout(nextQ, 1000); // To display the ripple effect
}