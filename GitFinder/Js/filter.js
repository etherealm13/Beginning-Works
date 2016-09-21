function applyFilter(value){
	//var isData;
	contentBody = "";
	filterStr = "";

	if(pageNumber > 1){
		var perPageLimit = 10 * (pageNumber - 1);
	}
	else{
		var perPageLimit = 10;
	}
	var tag = value; //gets the label from the input boz
	//pageNumber = 1; //set to default value
	

	/* 

	xhttp.open("GET", url + "/repos/" + username + "/" + repo + "/issues?per_page="+perPageLimit + "&page=" + pageNumber, true);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var resp = JSON.parse(this.responseText);
	*/
			if(issuesArray.length == 0){
				document.getElementById("content-head").innerHTML ="";
				document.getElementById("content-body").innerHTML = "<tr><td class= 'text-center'> No issues to display. Enter a different tag</td></tr>";
				document.getElementById("filter-container").style.display = "none";
				document.getElementById("moreButton").style.display = "none";
			}
			else{
				document.getElementById("filter-container").style.display = "block";
				document.getElementById("content-body").innerHTML = "";
				document.getElementById("content-head").innerHTML = 
				"<th>#</th><th>Open Issues</th>";

				for(var j = 0; j < issuesArray.length; j++){
					if(issuesArray[j].labels.length){
						for(var i = 0; i < issuesArray[j].labels.length; i++){
							if(issuesArray[j].labels[i].name == tag){
								contentBody += "<tr><td>"+(j+1)+"</td><td>"+ issuesArray[j].title + "</td></tr>";
								if(issuesArray[j].labels.length > 1){
									for(var i = 0; i < issuesArray[j].labels.length; i++){
										filterStr +=  issuesArray[j].labels[i].name + ",";
									}
								}
							}
						}
					}
				}

				var array = filterStr.split(",");
				unique = array.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
				unique = allTags.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
				document.getElementById("filter-selected").innerHTML  = "<span> Selected Filters: </span>";
				document.getElementById("filter-box").innerHTML  = "<span> Apply Filters: </span>";
				for(var i = 0; i<unique.length;i++){
					if(unique[i] != ""){	
						document.getElementById("filter-box").innerHTML  += 
						" <button type='button' id='btn-"+unique[i]+"' onclick='applyFilter(this.innerText)'>"+unique[i]+"</button>";
					}
				}

				document.getElementById("content-body").innerHTML = contentBody;
				document.getElementById("filter-selected").style.display = "block";  
				document.getElementById("filter-selected").innerHTML += 
				"<button type='button'>"+value+"</button> </span>";
				document.getElementById("btn-"+value).style.display = "none";
				document.getElementById("moreButton").style.display = "none";
			}
}