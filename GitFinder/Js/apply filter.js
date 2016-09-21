	// This function applies a label and filters the issues
	// Can apply only one label at a time
	
	/* Directions to use --> Search for username - "Isaacs" - Go to his repository 23 - char-spinner.
	   Apply Filter "greenkeeper". Works like a charm.*/

function applyFilter(value){
	var isData;
	if(pageNumber > 1){
		var perPageLimit = 10 * (pageNumber - 1);
	}
	else{
		var perPageLimit = 10;
	}
	var tag = value; //gets the label from the input boz
	pageNumber = 1; //set to default value
	xhttp.open("GET", url + "/repos/" + username + "/" + repo + "/issues?per_page="+perPageLimit + "&page=" + pageNumber, true);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var resp = JSON.parse(this.responseText);
			if(resp.length == 0){
				document.getElementById("content-head").innerHTML ="";
				document.getElementById("content-body").innerHTML = "<tr><td class= 'text-center'> No issues to display. Enter a different tag</td></tr>";
				document.getElementById("filter-container").style.display = "none";
				document.getElementById("moreButton").style.display = "none";
			}
			else{
				document.getElementById("filter-container").style.display = "block";
				if(newUnique > 0){
					document.getElementById("filter-box").innerHTML  = " <span>Apply Filters: </span> <button type='button' onclick='applyFilter(this.innerText)'>"+unique+"</button>" +
					"<button type='button' onclick='applyFilter(this.innerText)'>"+newUnique+"</button>";	
				}
				document.getElementById("content-body").innerHTML = "";
				document.getElementById("content-head").innerHTML = 
				"<th>#</th><th>Open Issues</th>";

				for(var j = 0; j < resp.length; j++){
					if(resp[j].labels.length){
						for(var i = 0; i < resp[j].labels.length; i++){
							if(resp[j].labels[i].name == tag){
								document.getElementById("content-body").innerHTML += "<tr><td>"+(j+1)+"</td><td>"+ resp[j].title + "</td></tr>";
								isData = true;
							}
						}
					}
					if(!isData){
						document.getElementById("moreButton").style.display = "none";
					}
				}
			}
		}
	}
}
