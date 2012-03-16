// ==UserScript==
// @name           Help Desk Monkey
// @namespace      http://online.academyart.edu
// @description    Help Desk LMS helper
// @include        http://admin.academyart.edu/admin/*
// @include        http://discussion.academyart.edu/* 
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
//IP address of hd_monkey_server
var serverIP = '127.0.0.1';
var serverPort = '1337';

//clear our global variables.
var divContent = "";
var divStyle = ' style="position:fixed;top:10px;right:0px;width:30%; height:500; padding:0;border-style:solid;border-width:6px;border-color:grey;background-color:rgba(0,0,0,255);display:none;overflow-y: scroll;" ';
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

function hideDiv() {
    if (divToggle === true) {
        document.getElementById("hd_tickets").style.display = "none";
        divToggle = false;
        } else if (divToggle === false) {
        document.getElementById("hd_tickets").style.display = "inline";
        divToggle = true;    
        }
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
           
           var wikisearch = document.createElement("div");        
           wikisearch.innerHTML = "";
           wikisearch.innerHTML = '<a href="https://wiki.academyart.edu/dosearchsite.action?spaceSearch=false&queryString=' + searchterms + '" target="_blank"> Search Wiki</a>';
           document.getElementsByName("record_summary")[0].parentNode.appendChild(wikisearch);
           
           //create the Report button and format HTML for it.
           var reportButton = document.createElement("input");
           reportButton.setAttribute("id","generateReport");
           reportButton.setAttribute("type","button");
           reportButton.setAttribute("value","Generate Report");
           var hideButton = window.document.createElement("a");
           hideButton.setAttribute("href", '#');
           hideButton.textContent = "Show/Hide Tickets";
           hideButton.addEventListener('click',hideDiv,false);           
           buttonElems[0].appendChild(reportButton);
           buttonElems[0].appendChild(hideButton);
           //generate recent links from node server reply - divContent
           var txt = document.createElement("div");
           txt.innerHTML = '<div id="hd_tickets"' + divStyle + '>' + divContent + '</div>';
           buttonElems[0].appendChild(txt);
           divContent = "";
           addButtonListener();
        }
    
     
        function addButtonListener(){
          var button = document.getElementById("generateReport");
          button.addEventListener('click',doMonkey,true);
        }   
    }  //end HD Ticket code
    
    
} else if (document.URL.slice(0, 52) === "http://discussion.academyart.edu/admin/listRecord.do") {
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
            hideButton.textContent = "Ticket Count";
            hideButton.addEventListener('click',hideDiv,false);           
            buttonElems[0].appendChild(hideButton);
            //generate recent links from node server reply - divContent
            var txt = document.createElement("div");
            txt.innerHTML = '<div id="hd_tickets"' + divStyle + '>' + divContent + '</div>';
            buttonElems[0].appendChild(txt);
            divContent = "";
            addButtonListener();           
             
        }
}

//makes a nice set of text for our Record summary page
function returnFormatted() {
    tempstring =  "Record: " + recordnumber + "\n" + "StudentID: " + studentID + "\n" +"Last Name: "+ lastname + "\n" + "First Name: "+ firstname + "\n" +/* "UserID: " + userID + "\n" +*/ "Email Address: "+ email + "\n" + "Phone Number: "+ phone + "\n" ;
    tempstring += "Summary: "+ summary + "\n"; //+  "Description: "+ description + "\n";
    return tempstring;
}
 
//the JS alert for the summary of a HD Ticket page
function doMonkey() {
    alert(returnFormatted());
}
//returns a similar message:
//Record: # 55555
//Last Name: LastName
//First Name: FirstName
//Email Address: email
//Phone Number: 555/555-5555
//Summary: Email: Instructor is having issues with email account
//Description: blahblahblah