// ==UserScript==
// @name           Help Desk Monkey
// @namespace      http://online.academyart.edu
// @description    Greasmonkey script to augment the LMS admin tools - Property of Academy of Art University
// @include        http://admin.academyart.edu/*
// @include        http://discussion.academyart.edu/* 
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
//nodeServer IP (use 'localhost' for local version)
var serverIP = '127.0.0.1';
var serverPort = '1337';

//clear our global variables.
var divContent = "";
var results = "";
var divStyle = ' style="position:fixed;top:10px;right:0px;width:30%; height:500; padding:0;border-style:solid;border-width:6px;border-color:grey;background-color:rgba(0,0,0,255);display:none;overflow-y: scroll;font-size:14pt;z-index:9;" ';
var search = "";
var searchterms = "";
var terms = new Array();
var outputstring = "";
var lastname;
var firstname;
var email;
var phone;
var orig_url;
var summary;
var description;
var recordnumber;
var studentID;
var userID;
var divToggle = false;
var txt = document.createElement("div");
var searchresults = document.createElement("div");
var dateinput = document.createElement("input");
searchresults.setAttribute("style","height:200;overflow-y:scroll");
searchresults.innerHTML = "";

function hideDiv() {
    if (divToggle === true) {
        document.getElementById("hd_tickets").style.display = "none";
        divToggle = false;
        } else if (divToggle === false) {
        document.getElementById("hd_tickets").style.display = "inline";
        divToggle = true;    
    }
}

function getTicketsByDate() {
	GM_xmlhttpRequest ( {
				method:         'GET',
				url:            'http://' + serverIP + ':1338' + '/?date=' + dateinput.value + '&range=5' ,  	
				onload:         function (responseDetails) {
									results = "";
									results = responseDetails.responseText;
									txt.innerHTML = '<div id="hd_tickets"' + divStyle + '>' + results + '</div>';
									divToggle = true;  
									document.getElementById("hd_tickets").style.display = "inline";
						}
					});
				
}

function getTicketsByTech() {
        	GM_xmlhttpRequest ( {
        	method:         'GET',
        	url:            'http://' + serverIP + ':1337' + '/?userID=ALL' ,  	
        	onload:         function (responseDetails) {
          	              		results = responseDetails.responseText;
                           		txt.innerHTML = '<div id="hd_tickets"' + divStyle + '>' + results + '</div>';
                           		divToggle = true;  
								document.getElementById("hd_tickets").style.display = "inline";
                           		
    			 	}
                });	


	hideDiv();
}

function searchTickets(args) {
	console.log("Ticket's Searched with " + args);
	GM_xmlhttpRequest ( {
				method:         'GET',
				url:            'http://' + serverIP + ':1337' + '/?search=' + args ,  	
				onload:         function (responseDetails) {
									results = "";
									results = responseDetails.responseText;
									searchresults.innerHTML = results;
									//console.log(results);
						}
					});
					
}

if (document.URL.slice(0, 52) === "http://discussion.academyart.edu/admin/editRecord.do") {

    if (document.URL.slice(52) ==="?createNewRecord=true") {
        //New Ticket page
    }
    else {
        //HD Ticket page

        //pull relevant ticket info from page using Greasemonkey
        lastname =  document.getElementsByName("record_lastName")[0].value;
        firstname = document.getElementsByName("record_firstName")[0].value;
        email =     document.getElementsByName("record_email")[0].value;
        phone =     document.getElementsByName("record_phone")[0].value;
        orig_url =  document.getElementsByName("record_pageURL")[0].value;
        summary =   document.getElementsByName("record_summary")[0].value;
        description = document.getElementsByName("record_description")[0].value;
        recordnumber = document.getElementsByClassName("table_text_b")[0].innerHTML.slice(12);
        studentID = document.getElementsByClassName("table_text_c")[9].innerHTML.slice(0, -6);
        userID = document.getElementsByClassName("table_text_link")[1].innerHTML;            
        
        //request from node server for recent tickets for user by userID scraped from page
        window.addEventListener("load", function(e) {
        	GM_xmlhttpRequest ( {
        	method:         'GET',
        	url:            'http://' + serverIP + ':' + serverPort + '/?userID=' + userID ,  	
        	onload:         function (responseDetails) {
          	              		pageText = responseDetails.responseText;
                           		divContent = pageText;
                           		generateHTML();
    			 	}
                });		

        }, false);
        
        //take response from node server, generate HTML, and embed in page
        function generateHTML(){
           var buttonElems = document.getElementsByClassName("large_headline");

            //generate search terms for wiki from recordsummary
           search = summary.split(":");
           searchterms = search[0] + "";
           if (search.length > 1) {
               searchterms = searchterms + ' AND (';
               terms = search[1].split(" ");
               for (i=0;i<terms.length;i++) {
                       if (terms[i] !== "") {
                               if (i === terms.length - 1) {
                                       searchterms = searchterms + terms[i];
                               } else searchterms = searchterms + terms[i] + ' OR ';
                       }
               }
               searchterms = searchterms + ')';
           }
           
           var mydiv = document.createElement("div"); 
           var  wikisearch = window.document.createElement("a");
           wikisearch.setAttribute("href", 'https://wiki.academyart.edu/dosearchsite.action?spaceSearch=false&queryString=' + searchterms );
           wikisearch.textContent = "Search Wiki";
           document.getElementsByName("record_summary")[0].parentNode.appendChild(wikisearch);
           
           
           var  ticketsearch = window.document.createElement("a");
           ticketsearch.setAttribute("href", '#');
           ticketsearch.textContent = "Search Similar Tickets";
           ticketsearch.addEventListener('click',searchTickets(summary),false);
           mydiv.appendChild(ticketsearch);
           document.getElementsByName("record_summary")[0].parentNode.appendChild(mydiv);
		   mydiv.appendChild(searchresults);
           //create the Report button and format HTML for it.
           var hideButton = window.document.createElement("a");
           hideButton.setAttribute("href", '#');
           hideButton.textContent = "User History";
           hideButton.addEventListener('click',hideDiv,false);           
           buttonElems[0].appendChild(hideButton);
           //generate recent links from node server reply - divContent
           var txt = document.createElement("div");
           txt.innerHTML = '<div id="hd_tickets"' + divStyle + '>' + divContent + '</div>';
           buttonElems[0].appendChild(txt);
           divContent = "";
        }
    
    }  //end HD Ticket code
    
    
} else if (document.URL.slice(0, 52) === "http://discussion.academyart.edu/admin/listRecord.do") {

		//Open Records
		var buttonElems = document.getElementsByClassName("large_headline");
        window.addEventListener("load", function(e) {
        	GM_xmlhttpRequest ( {
        	method:         'GET',
        	url:            'http://' + serverIP + ':1338' + '/?userID=ALL' ,  	
        	onload:         function (responseDetails) {
          	              		pageText = responseDetails.responseText;
                           		divContent = pageText;
                           		makeHTML();
    			 	}
                });		

        }, false);
        function makeHTML() {
            var hideButton = window.document.createElement("a");
            hideButton.setAttribute("href", '#');
            hideButton.textContent = "Show/Hide";
            hideButton.addEventListener('click',hideDiv,false);           
            //generate recent links from node server reply - divContent
            buttonElems[0].appendChild(txt);
            dateinput.setAttribute("type","text");
            dateinput.setAttribute("id","searchdate");
            today = new Date();
            dateinput.setAttribute("value", today.getFullYear() + "." + Number(today.getMonth() + 1) + "." + today.getDate());
            buttonElems[0].appendChild(dateinput);
            buttonElems[0].appendChild(hideButton);
            buttonElems[0].appendChild(document.createElement("br"));
            var searchbutton = document.createElement("a");
            searchbutton.setAttribute("href", '#');
            searchbutton.textContent = "Search by Date";
            searchbutton.addEventListener('click',getTicketsByDate,false);
            buttonElems[0].appendChild(searchbutton);            
            var totals = document.createElement("a");
            totals.setAttribute("href", '#');
            totals.textContent = "Ticket Totals";
            totals.addEventListener('click',getTicketsByTech,false);
            buttonElems[0].appendChild(document.createElement("br"));
            buttonElems[0].appendChild(totals);   
            divContent = "";
            //addButtonListener();           
             
        }
} else if (document.URL.slice(0,53) === "http://discussion.academyart.edu/admin/editUser/user/") {
	
	
	//User Profile
	window.addEventListener("load", function(e) {
        	GM_xmlhttpRequest ( {
        	method:         'GET',
        	url:            'http://' + serverIP + ':' + serverPort + '/?userID=' + document.URL.slice(53,document.URL.indexOf("?")) ,  	
        	onload:         function (responseDetails) {
          	              		pageText = responseDetails.responseText;
                           		divContent = pageText;
                           		startHTML();
    			 	}
                });		

        }, false);
        
        //take response from node server, generate HTML, and embed in page
        function startHTML(){
           var buttonElems = document.getElementsByClassName("large_headline");
           //create the Report button and format HTML for it.
           var hideButton = window.document.createElement("a");
           hideButton.setAttribute("href", '#');
           hideButton.textContent = "User History";
           hideButton.addEventListener('click',hideDiv,false);           
           buttonElems[0].appendChild(hideButton);
           //generate recent links from node server reply - divContent
           var txt = document.createElement("div");
           txt.innerHTML = '<div id="hd_tickets"' + divStyle + '>' + divContent + '</div>';
           buttonElems[0].appendChild(txt);
           divContent = "";
        }
}

//returns a similar message:
//Record: # 55555
//Last Name: LastName
//First Name: FirstName
//Email Address: email
//Phone Number: 555/555-5555
//Summary: Email: Instructor is having issues with email account
//Description: blahblahblah