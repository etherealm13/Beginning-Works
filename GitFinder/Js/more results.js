
//This is called when the down arrow is clicked. It sets in motion the process of loading more results.
function moreResults(){
	searchString = '&page=' + pageNumber;
	customCall(searchString);
}

//This loads more results. SearchString is passed by moreResults function

function customCall(searchString) {
	contentBody = "";
	filterStr = "";
    xhttp.open("GET", globalUrl + searchString, true);
	xhttp.send();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var res = JSON.parse(this.responseText);
			
			if(!issues){ // Checks for issue flag. Issue is true only for issues display
				
				if(!flag){ // Checks for flag value. Flag is true for Username search and False for Repository search

					// Loads more Repositories

					for(var i = 0 ; i < res.items.length; i++){
						contentBody += "<tr><td>"+(i + ((pageNumber-1)*perPageLimit)+1)+"</td>";
						contentBody += "<td> <img src="+ res.items[i].owner.avatar_url + ">";
						contentBody += "</td> <td><a href='" + res.items[i].html_url + "'> " + res.items[i].full_name + "</a></td> </tr>";			
						}
				}
				else{

					// Loads more User Repositories

					for(var i = 0; i < res.length; i++){
						 contentBody += "<tr><td>"+(i + ((pageNumber-1) * perPageLimit)+1)+"</td>";
						 contentBody += "<td id='userRepo" + (i + ((pageNumber-1) * perPageLimit)+1) + "' onclick='displayDetails(this.id)'> <a>" + res[i].name + "</a></td>";
						 contentBody += "<td>" + res[i].open_issues + "</td></tr>";
						}
				}
			}
			else{	

				// Loads more issues for a selected repository
				for(var i = 0; i < res.length; i++){
					issuesArray.push(res[i]);
					contentBody += "<tr><td>"+( i + ( (pageNumber-1) * perPageLimit ) + 1 )+"</td>";
					contentBody += "<td>"+ res[i].title + "</td></tr>";
					if(res[i].labels.length){
						for(var j = 0; j < res[i].labels.length; j++){
							filterStr +=  res[i].labels[j].name + ",";
						}
					}
				}

				
				var array = filterStr.split(",");
				document.getElementById("filter-box").innerHTML += " ";
				newUnique = array.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
				var updatedArray = newUnique.filter(function(obj) { return allTags.indexOf(obj) == -1; });

				for(var i = 0; i<updatedArray.length;i++){
					if(updatedArray[i] != ""){
						document.getElementById("filter-box").innerHTML += "<button type='button' onclick='applyFilter(this.innerText)'>"+updatedArray[i]+"</button> ";
						allTags.push(updatedArray[i]);
						console.log(allTags);
					}	
				}
//				document.getElementById("content-head").innerHTML = contentHead;
			}

			if(flag){
				//	Hides the down arrow button when all users/ issues are loaded
				if (res.length==0 || res.length < 10){
					document.getElementById('moreButton').style.display = "none";
					pageNumber = 0;
				}	
			}
			else{
				//	Hides the down arrow button when all user repositories are loaded
				if(res.items.length ==0 || res.items.length < 10){
					document.getElementById('moreButton').style.display = "none";
					pageNumber = 0;
				}
			}	
				//increments to the pagenumber to load new results only
				pageNumber += 1;
				document.getElementById("content-body").innerHTML += contentBody;
		}
	}
}