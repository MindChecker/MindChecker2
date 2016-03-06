var fs = require('fs');
var querystring = require('querystring');

function home(request, response){
	fs.readFile(__dirname + '/../public/start.html', function(err, file) {
		response.writeHead(200, {"Content-type": "text/html"});
		response.end(file);
	});
}

function resource(req, res) {
	fs.readFile(__dirname + '/../public' + req.url, function(err, data){
      if (err) {
        console.log(err);
      } else {
        var fileEnd = req.url.split('.')[1];
        var fileType;
        if (fileEnd === 'svg'){
          fileType = 'image/svg+xml';
        } else {
          fileType = 'text/' + fileEnd;
        }
        res.writeHead(200, {'Content-Type' : fileType});
        res.end(data);
      }
    });
}

var fs = require("fs");

// Read wordsDE file and splits it into 2D array, with each definition an
// array containing English word, German word, and type of word.
var dict = fs.readFileSync("server/GP.csv", "utf8").split("\n")
                                             .map(x => x.split('\t'));

function gpFinder(req, res) {
	var word = req.url.split('=')[1].substr(0,3).toLowerCase();
	console.log(word);
	var results = [];
    for( var i = 0, x = dict.length-1; i < x ; i++ ){
        var reg1 = new RegExp( '^' + word);
        
        var lowerWord = dict[i][13].toLowerCase();
        if(i===1) console.log(reg1, lowerWord);
        if( reg1.test( lowerWord )  ){
            // if the English word of a definition array matches the word, push the
            //whole definition, stripped of annotations (which would be in sq. brackets or parentheses)
            results.push( {
            	name: dict[i][7],
            	address: dict[i][9],
            	lat: dict[i][14],
            	lng: dict[i][15],
            	phone: dict[i][18]
            } );
            // once results has 10 items, stop searching
            if( results.length >= 5 ){
                break;
            }
        }
    }
  console.log(results);
  res.writeHead(200, {'Content-Type' : 'application/json'});
  res.end(JSON.stringify(results));
}

function notFound(request, response) {
	response.writeHead(404, {'Content-type': 'text/html'});
	response.end('404 page not found');
}

module.exports = {
	home:  home,
	resource: resource,
	notFound: notFound,
	gpFinder: gpFinder
};