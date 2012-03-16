/*
 *	hd_monkey_server - nodeJS server for tracking HelpDesk tickets
 *
 *	Use this in combination with the HelpDeskMonkey GreaseMonkey script
 *	to augment the LMS admin tools
 *
 *	requires csv and url modules, available via npm
 *
 */
//to install the required modules with npm in
//the same folder as this script (will generat
//node_modules folder)
//-- npm install csv url
var http = require('http');
var url = require('url');
var csv = require('csv');

//stores the text response string sent back to browser
var httpResp = "";

//Change the following to your address.
//IP/DNS address that browser will connect to
var serverURL = "127.0.0.1";
//Ports the browser will connect on for each service.
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
  
  //searches for any ticket from a specific user, used on Help Desk ticket page
  if (query["userID"]) { http://serverURL:serverPort/?userID=VHEIN2
    //for loop to search through each ticket in ticketHolder array
    for (record in ticketHolder) {
      //if the userID in url matches the UserID field of a ticket
      if (ticketHolder[record]["UserID"] === query["userID"]) {
	//add 1 to total ticket count
	ticketCounter = ticketCounter + 1;
	//add an entry to responsHolder array containing HTML to link back to ticket found
	//can edit this to return any info from ticket available
	responseHolder[ticketCounter] = {date: ticketHolder[record]["OpenDate"], link: '<a href="http://discussion.academyart.edu/admin/editRecord.do?triggerName=editRecord&lo_record=2-' + ticketHolder[record]["TicketID"] + '">' + ticketHolder[record]["TicketID"] + '</a> ' + ticketHolder[record]["OpenDate"] + " -- " + ticketHolder[record]["Description"] + '<br />\n'};
      }
    }	//returns a list of any tickets containing search terms in url
  } else if (query["search"]) {  //i.e. http://serverURL:serverPort/?search=My Search Terms
      var regexcounter = 0;
      queryarray = query["search"].toString().replace(/(\r\n|\n|\r)/gm,"").split(" ");
	for (record in ticketHolder) {
	  for (aquery in queryarray) {
	    var regexstring = queryarray[aquery] ;
	    var myregex = new RegExp(regexstring,"i");
	    //console.log(regexstring);
	    if (ticketHolder[record]["Description"] !== null) {
	      //console.log(ticketHolder[record]["Description"]);
	      var found = myregex.test(ticketHolder[record]["Description"]);		
	      if (found) {
		regexcounter = regexcounter + 1
	      }
	    }
	    if (regexcounter >= queryarray.length * .5) {
	      responseHolder[ticketCounter] = {date: ticketHolder[record]["OpenDate"], link: '<a href="http://discussion.academyart.edu/admin/editRecord.do?triggerName=editRecord&lo_record=2-' + ticketHolder[record]["TicketID"] + '">' + ticketHolder[record]["TicketID"] + '</a> ' + ticketHolder[record]["OpenDate"] + "-" + ticketHolder[record]["Description"] + '-' + ticketHolder[record]["UserID"] + '<br />\n'};
	    }
	  }
	  //console.log(regexcounter);
	  regexcounter = 0;
	  ticketCounter = ticketCounter + 1;
       }
       ticketCounter = 0;
  } 
 //sort tickets by open date by extending builtin sort function
 responseHolder.sort(function(a, b){
	 var dateA=new Date(a.date), dateB=new Date(b.date)
	 return dateA-dateB //sort by date ascending
 });
 //build httpResp string from responsHolder array
 for (i=0; i < responseHolder.length; i++) {
 	if (responseHolder[i]) {
	httpResp = httpResp + responseHolder[i]["link"];
	}
 }
 //send response string to browser and terminate connection
  res.end(httpResp);
}).listen(serverPort, serverURL);

//csv module
//reads datafile containing available tickets
csv()
//reads from same directory as hd_monkey_server, uses datafile name
//from above
.fromPath(__dirname+'/'+dataFile,{
    columns: true
})
.transform(function(data){
    return data;
})
//for each line in csv file...
.on('data',function(data,index){
  //...add an object containing ticket info from each line in csv file
  ticketHolder.push(data) 
/*
 USED FOR LOGGING EACH TICKET ENTRY FOUND IN CSV FILE
	console.log('#'+index+' '+JSON.stringify(data));
        console.log(data["TicketID"] + " -- " + data["Assign"] + " -- " + data["DateModified"]);
        console.log(data["UserID"] + " -- " + data["StudentID"] + " -- " + data["Info"]);
        console.log("||___________________________________________________||");
*/
})
.on('end',function(count){
  //log to each entry in csv file has been added to ticketHolder by displaying total ticket count
    console.log('Number of lines: '+count);
})
.on('error',function(error){
    console.log(error.message);
});




