// This function displays open issues of the selected repository
function displayDetails(id){
	document.getElementById('moreButton').style.display = "block";
	document.getElementById("filter-selected").innerHTML = "";
	issues = true; // issue is true for issue display; setting ussues to true
	contentHead = ""; 
	contentBody = "";
	filterBox = "";
	filterStr = "";
	allTags = [];
	issuesArray = [];

	// id is passed on
	var r = document.getElementById(id);
	repo = r.innerText; // gets the repository name
	xhttp.open("GET", url + "/repos/" + username + "/" + repo + "/issues?per_page="+ perPageLimit, true);
	xhttp.send();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var resp = JSON.parse(this.responseText);
			// Filter input box is made active
			document.getElementById("filter-container").style.display = "block";

			contentHead = "<th>#</th><th>Open Issues</th>";
			for(var j = 0; j < resp.length; j++){
				contentBody += "<tr><td>"+(j+1)+"</td><td>"+ resp[j].title + "</td></tr>";
				issuesArray.push(resp[j]);
				console.log(issuesArray);

				if(resp[j].labels.length){
					for(var i = 0; i < resp[j].labels.length; i++){
						filterStr +=  resp[j].labels[i].name + ",";
					}
				}
			}
			
			// If no issues to display
			if(resp.length < 10){
				document.getElementById("moreButton").style.display = "none";	
			}

			if(resp.length == 0){
				issues = false;
				contentHead ="";
				contentBody = "<tr><td class= 'text-center'> No issues to display</td></tr>";
				document.getElementById("moreButton").style.display = "none";
			}

			document.getElementById("content-body").innerHTML = contentBody;
			document.getElementById("content-head").innerHTML = contentHead;
			if(filterStr.length){
				var array = filterStr.split(",");
				unique = array.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
				if(unique.length){
					document.getElementById("filter-box").innerHTML  = "<span> Apply Filters: </span>";  
					for(var i = 0; i<unique.length;i++){
						if(unique[i] != ""){
							document.getElementById("filter-box").innerHTML  += 
							" <button type='button' id='btn-"+unique[i]+"' onclick='applyFilter(this.innerText)'>"+unique[i]+"</button>";
							allTags.push(unique[i]);
							console.log(allTags);
						}	
					}
				}
			}
		}
	}
	// values are set to pass on to be used by customCall function to load more results 
	customUrl =  url + "/repos/" + username + "/" + repo + "/issues?per_page="+ perPageLimit + "&page=" + pageNumber;
	globalUrl = url + "/repos/" + username + "/" + repo + "/issues?per_page="+ perPageLimit;
	pageNumber = 2;
	
}
