google.charts.load('current', {packages: ['corechart']});

function drawChart(a,q) {
   var user = Number(a);
   var def = Number(q) - user;
   // Define the chart to be drawn.
var data = google.visualization.arrayToDataTable([
   ['Questions','Correct Answers', 'Wrong Answers'],
   [userName, user, def]
   ]);
   var options = {
      title: 'Quiz Results'     
   }; 

   // Instantiate and draw the chart.
   var chart = new google.visualization.ColumnChart(document.getElementById('content'));
   chart.draw(data, options);
}
