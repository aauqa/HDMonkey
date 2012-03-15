var httpResp = "";
var http = require('http');
var url = require('url');
var csv = require('csv');
var serverURL = "127.0.0.1";
var serverPort = "1337";

var ticketHolder = new Array();
var responseHolder = new Array();

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
//  res.end(httpResp);
  httpResp = "";
  var ticketCounter = 0;
  responseHolder= new Array();
  var url_parts = url.parse(req.url, true); 
  var query = url_parts.query;
  for (result in query) {
	console.log(result + " - " + query[result].toString());
  }
  if (query["userID"]) {
	 //console.log(query["userID"].toString().replace(/(\r\n|\n|\r)/gm,""));
	 for (record in ticketHolder) {
	 //	console.log(ticketHolder[record]["UserID"] + " " + query["userID"]);
		 if (ticketHolder[record]["UserID"] === query["userID"]) {
			 console.log("TRUE");
			 ticketCounter = ticketCounter + 1;
			 responseHolder[ticketCounter] = {date: ticketHolder[record]["OpenDate"], link: '<a href="http://discussion.academyart.edu/admin/editRecord.do?triggerName=editRecord&lo_record=2-' + ticketHolder[record]["TicketID"] + '">' + ticketHolder[record]["TicketID"] + '</a> ' + ticketHolder[record]["OpenDate"] + " -- " + ticketHolder[record]["Description"] + '<br />\n'};
		 }
		 
	 }
	 console.log(query["userID"] + " - " + ticketCounter);

 }
 responseHolder.sort(function(a, b){
	 var dateA=new Date(a.date), dateB=new Date(b.date)
	 return dateA-dateB //sort by date ascending
 });
// console.log(responseHolder); 
 for (i=0; i < responseHolder.length; i++) {
 	if (responseHolder[i]) {
	httpResp = httpResp + responseHolder[i]["link"];
	}
 }
  console.log(httpResp);
  res.end(httpResp);
}).listen(serverPort, serverURL);

csv()
.fromPath(__dirname+'/data.csv',{
    columns: true
})
.transform(function(data){
    return data;
})
.on('data',function(data,index){
//    console.log('#'+index+' '+JSON.stringify(data));
        console.log(data["TicketID"] + " -- " + data["Assign"] + " -- " + data["DateModified"]);
        console.log(data["UserID"] + " -- " + data["StudentID"] + " -- " + data["Info"]);
        console.log("||___________________________________________________||");
        ticketHolder.push(data)
})
.on('end',function(count){
    console.log('Number of lines: '+count);
})
.on('error',function(error){
    console.log(error.message);
});


