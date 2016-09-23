/* 
 Created on : Sep 16th, 2016
 Author     : Alankar Anand

 Name of the project: Github Search
 Language Used: Javascript and Bootstrap ( UI )
 Overview: This single page app let's users search Github using username or repository name

 Features: 
 - Search by username or repository name
 - username search - Shows a user's logo and repositories 
 - repository search - Shows all users having the repositories with their logos.
   Clicking on the repository name takes user to the Github page of the repository.
 - View open issues for each user's repositories
 - Use custom labels to filter issues
 - All calls are made to Github api using ajax only 
 - no backtracking as all calls are made using ajax.
 - Responsive UI
 Github imposes a per page limit of 100 results. Here I'm showing only 10 results per page.
 It can be changed by changing the perPageLimit variable to any number between 1-100
 */

var xhttp = new XMLHttpRequest();
var url;
var perPageLimit = 10;
var pageNumber;
var customUrl;
var globalUrl;
var searchString = "";
var repo;
var username;
var reponame;
var userInfo;
var contentHead;
var contentBody;
var issues;
var flag;
var filterBox;
var unique;
var newUnique;
var filterStr;
var notification;
var issuesArray;

//display a down arrow which on clicking will load more results if present
document.getElementById('moreButton').style.display = "none";


var submit = document.getElementById('search-form');
submit.addEventListener("submit", function(event){
	event.preventDefault();
	document.getElementById("searchBtn").innerHTML = "Searching...";
	getController();
	return false;
});


//This function makes a call to github api and loads the initial results as per the  per page limit
function getController() {
	url = "https://api.github.com";
	username = document.getElementById('userName').value; // get the value from username input box
	reponame = document.getElementById('repoName').value; // get the value from repository input box
	pageNumber = 1;
	document.getElementById('content-head').innerHTML = ""; //setting values to empty
	document.getElementById('content-body').innerHTML = ""; //setting values to empty
	document.getElementById("filter-box").innerHTML  = "";
	//document.getElementById("tagName").value = "";
	//document.getElementById("filter-box").innerHTML = "";
	contentHead = ""; //setring values to empty
	contentBody = ""; //seting values to empty	

	//hide the filter input box initially when showing username/repo results
	document.getElementById("filter-container").style.display = "none";
	if(username == "" && reponame== "" || username && reponame){
		//only username or repository search allowed
		alert("please enter either username or repository name");
		document.getElementById("searchBtn").innerHTML = "Search";
		return;
	}
	// Search by Username	
	if(!reponame){
		xhttp.open("GET", url + "/users/" + username + "/repos?per_page=" + perPageLimit + "&page=" + pageNumber, true);
		xhttp.send();
		customUrl = url + "/users/" + username + "/repos?per_page=" + perPageLimit + "&page=" + pageNumber;
		globalUrl = url + "/users/" + username + "/repos?per_page=" + perPageLimit;
		// Sets custom Url and globalUrl - used for loading more results
		flag = true; // flag is true for username search
		issues = false; // issues is only true for issue display
	}
	// Search by Repository name
	else{
		xhttp.open("GET", url + "/search/repositories?q="+reponame+ "&order=desc&per_page=" + perPageLimit + "&page=" + pageNumber, true);
		xhttp.send();
		customUrl = url + "/search/repositories?q="+reponame+ "&order=desc&per_page=" + perPageLimit + "&page=" + pageNumber;
		globalUrl = url + "/search/repositories?q="+reponame+ "&order=desc&per_page=" + perPageLimit;
		flag = false; // flag is false for repository search
		issues = false; // issues is only true for issue display
	}
	// getting the response
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//document.getElementById('content-head').innerHTML = "";
			//document.getElementById('content-body').innerHTML = "";			
			var res = JSON.parse(this.responseText);

    	    // Search by Repository Name
			
			if(!flag){
				userInfo = "";
				contentHead = 
				"<th>#</th><th>Logo</th><th>Name</th>";
				
				for(var i = 0; i < res.items.length; i++){
					contentBody += "<tr> <td>"+(i+1)+"</td>";
					contentBody += "<td> <img src="+ res.items[i].owner.avatar_url + ">";
					contentBody += "</td> <td><a href='" + res.items[i].html_url + "'> " + res.items[i].full_name + "</a></td> </tr>";			
				}
			}
			// Search by Username
			else{
				userInfo = "<img src="+ res[0].owner.avatar_url +"><span>"+res[0].owner.login+"</span>";
				contentHead = 
				"<th>#</th><th>Repository Name</th><th>Open Issues</th>";

				for(var i = 0; i < res.length; i++){
					 contentBody += "<tr><td>"+(i+1)+"</td>";
					 contentBody += "<td id='userRepo" + i + "' onclick='displayDetails(this.id)'> <a>" + res[i].name + "</a></td>";
					 contentBody += "<td>" + res[i].open_issues + "</td></tr>";
				}
			}

			if(res.length < 10){
				// Hide the down arrow button
				document.getElementById('moreButton').style.display = "none";
			}
			else{
				// show the down arrow button which on clicking loads more results
				document.getElementById('moreButton').style.display = "block";
			}
			// Display the results
			document.getElementById("content-head").innerHTML = contentHead;
			document.getElementById("content-body").innerHTML = contentBody;
			document.getElementById("user-info").innerHTML = userInfo;
			pageNumber += 1; //pageNumber is incremented each time to load new results only
			document.getElementById("searchBtn").innerHTML = "Search";
		}
	}
}


// To do: Display Repo name when repo is selected and issues are displayed
