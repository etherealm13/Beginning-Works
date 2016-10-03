/* 
 Created on : 11 A.M, Sep 27th, 2016
 Author     : Alankar Anand
 Name of the project: inQUIZitive

 Type: Single page Application (Javascript and jQuery)
 Language Used: Javascript,jQuery and Bootstrap ( UI )
 Overview: This single page app loads a quiz and displays user's answers using google chart

 To view more of my works, please visit my gitHub repo: https://github.com/etherealm13
*/


// To reload app click on the HOME icon in the navbar

//Declaring global variables to be used throughout the program

var userAnswers = []; //To store user's answers
var i = 0;	// to cycle through the questions array
var userName; // Store the user name entered on home screen
var isQuiz = false;

document.getElementById('name-box').value = ""; //Clear the input box

// get the form and prevent default behaviour i.e. submission of form
var form = document.getElementById("name-form");
if (form.addEventListener){
	form.addEventListener("submit", function(event){
		loadQuestions(i);
		event.preventDefault();
		return false;
	});	
}
else{
// For IE 8 --> Prevent form submission
	form.attachEvent("onsubmit", function(e){
		if(e.returnValue){
			e.returnValue = false;
		}
	});
}
// This function loads the quiz
function loadQuestions(i){
	isQuiz = true;
	if(i >= question.length){
		loadResults();
	}
	else{
		document.getElementById('get-name').innerHTML = "";
		document.getElementById('app').innerHTML = "";
		var contentBody = "";
		contentBody = "<h1 class='text-center'>" + question[i].id + ".  " + question[i].q + "</h1><br/>";
		contentBody +=  
		
		"<div id='app-content' class='col-xs-12 col-xs-offset-0 col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-4 col-lg-4 col-lg-offset-4'>" +
		"<label><input type='radio' name='options' class='opt' value='"+ question[i].options[0] +"' onclick='timeoutInit()' required>"+ question[i].options[0] +"</label><br>" +
		"<label><input type='radio' name='options' class='opt' value='"+ question[i].options[1] +"' onclick='timeoutInit()'>"+ question[i].options[1] +"</label><br>" +
		"<label><input type='radio' name='options' class='opt' value='"+ question[i].options[2] +"' onclick='timeoutInit()'>"+ question[i].options[2] + "</label></div>";
		
		document.getElementById('app').innerHTML = contentBody;
	}

}

// This function is used to get the user name from the homescreen.
//As the form is not being submitted keyup event is used to get the value of the input box

function getName(){
	userName = 	document.getElementById('name-box').value;
}