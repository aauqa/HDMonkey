var httpResp = "";
var http = require('http');
var url = require('url');
var csv = require('csv');
var serverURL = "10.3.33.108";
var serverPort = "1338";
var ticketHolder = new Array();


// these are labels for the days of the week
cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// these are human-readable month name labels, in order
cal_months_labels = ['January', 'February', 'March', 'April',
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December'];

// these are the days of the week for each month, in order
cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// this is the current date
cal_current_date = new Date();
cal_current_year = cal_current_date.getFullYear().toString();

function ticketCalendar() {
	this.ticketArray = new Array();
	this.ticketArray[cal_current_year.toString()] = new Array();
	for (month = 0; month < 11; month++) {
		this.ticketArray[cal_current_year.toString()][month] = new Array();
		for (day = 1; day < cal_days_in_month[month]; day++) {
			this.ticketArray[cal_current_year.toString()][month][day] = new Array();
		}
	}
	this.ticketArray["2011"] = new Array();
	for (month = 0; month < 11; month++) {
		this.ticketArray["2011"][month] = new Array();
		for (day = 1; day < cal_days_in_month[month]; day++) {
			this.ticketArray["2011"][month][day] = new Array();
		}
	}
}
ticketCalendar.prototype.getMonth = function(year,month) {

	for (daycount = 0; daycount < cal_days_in_month[month]; daycount ++) {
		console.log('Year: ' + year + ' Month: ' + cal_months_labels[month] + ' Day: ' +  Number(daycount+1));
	}

}

ticketCalendar.prototype.getDateRange = function(startdate, numdays) {
	var returnArray = new Array();
	returnArray[startdate.getFullYear().toString()] = new Array();
	//console.log(startdate.getMonth() + " - " + typeof(startdate.getFullYear().toString()));
	returnArray[startdate.getFullYear().toString()][startdate.getMonth()] = new Array();
	returnArray[startdate.getFullYear().toString()][startdate.getMonth()][startdate.getDate()] = startdate.toDateString();
	datecount = 0;
	datecurrent = new Date(startdate.getFullYear(),startdate.getMonth(),startdate.getDate());
	
	//console.log(datecurrent.getFullYear().toString() + " " + datecurrent.getMonth() + " " + datecurrent.getDate());
	
	
	//console.log(datecurrent.toDateString());
	for (datestart = datecurrent.getDate(); datecount < numdays-1; datecount++) {
		//console.log("Current Date " + datecurrent.toDateString());
		//end of the month
		if (datecurrent.getDate()+1 > cal_days_in_month[datecurrent.getMonth()]) {
			datecurrent.setDate(1);
			//console.log(datecurrent.getMonth());
			//end of the year December 31st
			if (datecurrent.getMonth() === 11 ) {
				//console.log("Merry Xmas");
				datecurrent.setMonth(0);
				//console.log((Number(datecurrent.getFullYear()) + 1).toString());
				datecurrent.setFullYear((Number(datecurrent.getFullYear()) + 1).toString());
				returnArray[datecurrent.getFullYear().toString()] = new Array();
				returnArray[datecurrent.getFullYear().toString()][datecurrent.getMonth()] = new Array();	
				
			} else {
				datecurrent.setMonth(datecurrent.getMonth()+1);
				//console.log("Changing Months " + datecurrent.getMonth());
				returnArray[datecurrent.getFullYear().toString()][datecurrent.getMonth()] = new Array();	
			}
		
		} else {
				
			datecurrent.setDate(datecurrent.getDate()+1);
			
		}
		returnArray[datecurrent.getFullYear().toString()][datecurrent.getMonth()][datecurrent.getDate()] = datecurrent.toDateString();
		//console.log(datecurrent.getFullYear().toString() + " " + datecurrent.getMonth() + " " + datecurrent.getDate());
	
	}
	return returnArray;
}

var hdTicketCalendar = new ticketCalendar();


var techs = new Array()


function clearTechs() {
  techs["superedmund"] = 0;
  techs["JELLINGTON"] = 0;
  techs["SYOON"] = 0;
  techs["ASURANGS2"] = 0;
  techs["CWONG"] = 0;
  techs["TLEE"] = 0;
  techs["PHUNDLEY"] = 0;
  techs["JWILLEY"] = 0;
  techs["EKENNETT2"] = 0;
  techs["TPEGEUERO"] = 0;
  techs["LCORDOVA"] = 0;
  techs["DMANCHA"] = 0;
  techs["NRILEY"] = 0;
  techs["JSTEARS2"] = 0;
  techs["AHONCIAN2"] = 0;
  techs["EHERNANDEZ"] = 0;
  techs["jstears_hd"] = 0;
}

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	httpResp = "";
	var url_parts = url.parse(req.url, true); 
	var query = url_parts.query;
	for (result in query) {
	//console.log(result + " - " + query[result].toString());
	}
	if (query["userID"]) {
		 //console.log(query["userID"].toString().replace(/(\r\n|\n|\r)/gm,""));
		 for (record in ticketHolder) {
				if (ticketHolder[record]["Assign"] !== null) {
					var assignees = ticketHolder[record]["Assign"].split(",");
					for (names in assignees) {
							techs[assignees[names]] += 1;
					}
				}
		}
		if (query["userID"] === "ALL") {
			for (tech in techs) {
				if (techs[tech]) {
					httpResp = httpResp + tech + " - " + techs[tech] + "<br />\n" ;
				}
			}        
		} else {
				httpResp = httpResp + query["userID"] + " - " + techs[query["userID"]] + "<br />\n" ;
			}
	}
    else if (query["date"] && query["range"])  {
		var queryDate = new Date(query["date"]);
		//console.log("Query for date range " + queryDate.toDateString() + " " + query["range"]);
		var myarray = hdTicketCalendar.getDateRange(queryDate,query["range"]);
		for (yearcount = queryDate.getFullYear(); yearcount < myarray.length; yearcount++) {
			//console.log(yearcount);
			for (monthcount = 0; monthcount < myarray[yearcount.toString()].length; monthcount++) {
				//console.log(yearcount + " " + monthcount)
					if (myarray[yearcount.toString()][monthcount]) {
						for (daycount = 0; daycount < myarray[yearcount.toString()][monthcount].length; daycount++) {
							//console.log(yearcount + " " + monthcount + " " + daycount);
							if (myarray[yearcount.toString()][monthcount][daycount]) {
								//console.log(daycount);
								httpResp = httpResp + myarray[yearcount.toString()][monthcount][daycount] + "<br />\n";
								//console.log(myarray[yearcount.toString()][monthcount][daycount]);
								//console.log(Date(yearcount,monthcount,daycount).toDateString());
								var results = checkByDate(new Date(yearcount,monthcount,daycount));
								for (names in results) {
									var ticketcount = 0;
									httpResp = httpResp + '<b>' + names + '</b>: ';
									for (tickets in results[names]) {
										//httpResp = httpResp + results[names][tickets]["ticketID"] + ' - ';
										ticketcount = ticketcount + 1;
									}
									httpResp = httpResp + "<br />\n" + "Total: " + ticketcount + "<br />\n";
								}
								httpResp = httpResp + '<br />\n';
								
							}
						}
					}
		
			
			}
			
		}
	
	}

  console.log(httpResp);
  res.end(httpResp);
  clearTechs();
}).listen(serverPort, serverURL);

function checkByDate(checkdate) {
	var tempArray = new Array();
	//console.log(checkdate.toDateString());
	//console.log(checkdate.getFullYear());
	//console.log(checkdate.getMonth());
	//console.log(checkdate.getDate());
	for (record in ticketHolder) {
		//console.log(ticketHolder[record]["OpenDate"].split(".")[0] + " " + ticketHolder[record]["OpenDate"].split(".")[1] + " " + ticketHolder[record]["OpenDate"].split(".")[2]);
		if (ticketHolder[record]["OpenDate"].split(".")[0] == checkdate.getFullYear()) {
			if (Number(ticketHolder[record]["OpenDate"].split(".")[1]) == Number(checkdate.getMonth() + 1)) {
				//console.log("Same Month");
				//console.log(checkdate.getDate());
				if (Number(ticketHolder[record]["OpenDate"].split(".")[2]) === Number(checkdate.getDate())) {
					//console.log("Same Day");
					if (ticketHolder[record]["Assign"] !== null) {
						var assignees = ticketHolder[record]["Assign"].split(",");
						for (names in assignees) {
							if (!tempArray[assignees[names]]) {
								tempArray[assignees[names]] = new Array();
							}
							tempArray[assignees[names]].push({"ticketID": ticketHolder[record]["TicketID"], "openDate":ticketHolder[record]["OpenDate"] });
						}
				}
				}
				
			}
			//console.log("Same Year");
		}
	
	}
	return tempArray;

}


csv()
.fromPath(__dirname+'/current_data.csv',{
    columns: true
})
.transform(function(data){
    return data;
})
.on('data',function(data,index){
//    console.log('#'+index+' '+JSON.stringify(data));
        //console.log(data["TicketID"] + " -- " + data["Assign"] + " -- " + data["DateModified"]);
        //console.log(data["UserID"] + " -- " + data["StudentID"] + " -- " + data["Info"]);
        //console.log("||___________________________________________________||");
        ticketHolder.push(data)
})
.on('end',function(count){
    console.log('Number of lines: '+count);
})
.on('error',function(error){
    console.log(error.message);
});


