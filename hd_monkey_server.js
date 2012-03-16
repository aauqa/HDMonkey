/*
 *	hd_monkey_server - nodeJS server for tracking HelpDesk tickets
 *
 *	Use this in combination with the HelpDeskMonkey GreaseMonkey script
 *	to augment the LMS admin tools
 *
 *	requires csv and url modules, available via npm
 *
 */

//stores the text response string sent back to browser
var httpResp = "";
//to install the required modules with npm in
//the same folder as this script (will generat
//node_modules folder)
//-- npm install csv url
var http = require('http');
var url = require('url');
var csv = require('csv');

//Change the following to your address.
//IP/DNS address that browser will connect to
var serverURL = "127.0.0.1";
//Port the browser will connect on.
var serverPort = "1337";
//filename (csv format) of ticket data
var dataFile = "data.csv";

//Array to store each ticket read from csv file
var ticketHolder = new Array();
//Array used to help arrange the http 
var responseHolder = new Array();

//builds the HTTP server
http.createServer(function (req, res) {
  //HTTP header 
  res.writeHead(200, {'Content-Type': 'text/plain'});
  //resets response string amd array
  httpResp = "";
  responseHolder= new Array();
  //used for total ticket count 
  var ticketCounter = 0;
  //split out url parts (denoted with questionmarks)
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  if (query["userID"]) {
	 //console.log(query["userID"].toString().replace(/(\r\n|\n|\r)/gm,""));
	 for (record in ticketHolder) {
	 //	console.log(ticketHolder[record]["UserID"] + " " + query["userID"]);
		 if (ticketHolder[record]["UserID"] === query["userID"]) {
			 //console.log("TRUE");
			 ticketCounter = ticketCounter + 1;
			 responseHolder[ticketCounter] = {date: ticketHolder[record]["OpenDate"], link: '<a href="http://discussion.academyart.edu/admin/editRecord.do?triggerName=editRecord&lo_record=2-' + ticketHolder[record]["TicketID"] + '">' + ticketHolder[record]["TicketID"] + '</a> ' + ticketHolder[record]["OpenDate"] + " -- " + ticketHolder[record]["Description"] + '<br />\n'};
		 }
		 
	 }
	 //console.log(query["userID"] + " - " + ticketCounter);

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
  //console.log(httpResp);
  res.end(httpResp);
}).listen(serverPort, serverURL);

csv()
.fromPath(__dirname+'/'+dataFile,{
    columns: true
})
.transform(function(data){
    return data;
})
.on('data',function(data,index){
/*
	console.log('#'+index+' '+JSON.stringify(data));
        console.log(data["TicketID"] + " -- " + data["Assign"] + " -- " + data["DateModified"]);
        console.log(data["UserID"] + " -- " + data["StudentID"] + " -- " + data["Info"]);
        console.log("||___________________________________________________||");
*/
        ticketHolder.push(data)
})
.on('end',function(count){
    console.log('Number of lines: '+count);
})
.on('error',function(error){
    console.log(error.message);
});


