var httpResp = "";
var http = require('http');
var url = require('url');
var csv = require('csv');
var serverURL = "127.0.0.1";
var serverPort = "1339";
var ticketHolder = new Array();
var responseHolder = new Array();
var ticketCounter = 0;
var techs = new Array();

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  httpResp = "";
  var url_parts = url.parse(req.url, true); 
  var query = url_parts.query;
  for (result in query) {
    //console.log(result + " - " + query[result].toString());
  }
  if (query["search"]) {
  	 var regexcounter = 0;
	 queryarray = query["search"].toString().replace(/(\r\n|\n|\r)/gm,"").split(" ");
	 //console.log(query["search"].toString().replace(/(\r\n|\n|\r)/gm,""));
	 //console.log(regexstring);
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
	 				//console.log("Enough to send back!");
					responseHolder[ticketCounter] = {date: ticketHolder[record]["OpenDate"], link: '<a href="http://discussion.academyart.edu/admin/editRecord.do?triggerName=editRecord&lo_record=2-' + ticketHolder[record]["TicketID"] + '">' + ticketHolder[record]["TicketID"] + '</a> ' + ticketHolder[record]["OpenDate"] + "-" + ticketHolder[record]["Description"] + '-' + ticketHolder[record]["UserID"] + '<br />\n'};
	 			}
		 	}
		 	//console.log(regexcounter);
		 	regexcounter = 0;
		 	ticketCounter = ticketCounter + 1;
  	 	}
  	 	ticketCounter = 0;
    //httpResp = httpResp + query["userID"] + " - " + techs[query["userID"]] + "<br />\n" ;
 }
  responseHolder.sort(function(b, a){
	 var dateA=new Date(a.date), dateB=new Date(b.date)
	 return dateA-dateB //sort by date ascending
 });
// console.log(responseHolder); 
 for (i=0; i < responseHolder.length; i++) {
 	if (responseHolder[i]) {
	httpResp = httpResp + responseHolder[i]["link"];
	}
 }
 responseHolder = new Array();
  //console.log(httpResp);
  res.end(httpResp);
  //clearTechs();
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
