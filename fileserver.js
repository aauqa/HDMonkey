var http = require("http");
var fs = require("fs");
var url = require("url");

http.createServer(function (req, res) {
	//console.log(url.parse(req.url).pathname);
	//console.log(url.parse(req.url).pathname.charAt(url.parse(req.url).pathname.length-1));
    switch (url.parse(req.url).pathname.charAt(url.parse(req.url).pathname.length-1)) {
        case '/':
			console.log("request for path " + req.url);
			fs.readdir(process.cwd() + req.url, function (err, files) {
			  if (err) {
				console.log(err);
				return;
			  }
			  console.log(files);
			  res.writeHead(200);
			  var tempString = "";
			  for (fileCount in files) {
			  	tempString = tempString + '<a href="http://10.3.31.75:9000' + req.url + files[fileCount] + '">' + files[fileCount] + '</a><br />\n';
			  	console.log(tempString);
			  }
			  res.end(tempString);
			});        	
            break;
        default:
			  fs.readFile(__dirname + req.url, function (err,data) {
				if (err) {
					if (err["code"] === "EISDIR") {
						console.log("Request for directory");
						fs.readdir(process.cwd() + req.url + "/", function (err, files) {
						  if (err) {
							console.log(err);
							return;
						  }
						  console.log(files);
						  res.writeHead(200);
						  var tempString = "";
						  for (fileCount in files) {
							tempString = tempString + '<a href="http://10.3.31.75:9000' + req.url + "/" + files[fileCount] + '">' + files[fileCount] + '</a><br />\n';
							console.log(tempString);
						  }
						  res.end(tempString);
						  }); 
					} else {
				  		res.writeHead(404);
				  		res.end(JSON.stringify(err));
				  	}
				  	return;
				}
				res.writeHead(200);
				res.end(data);
			  });
            break;
    }

}).listen(9000);

