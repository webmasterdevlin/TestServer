var http = require('http');
var formidable = require("formidable");
var util = require('util');

var server = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (req.method.toLowerCase() === 'post') {
    processForm(req, res);
    return;
  }

  if (req.method.toLowerCase() === 'get') {
    var data = {
      data: {
        coffees : [
          'Espresso',
          'Double Espresso',
          'Short Macchiato',
          'Ristretto',
          'Long Black',
          'Cafe Latte',
          'Cappuccino',
          'Flat White',
          'Piccolo Latte',
          'Affogato',
          'Americano',
        ]
      }
    };

    var responseData = JSON.stringify(data);
    res.end(responseData);
    console.log("get: ", responseData);
    return;
  }

  res.end();
});


function processForm(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields) {

    fields.id = '1';

    res.writeHead(200, {
      'content-type': 'text/plain'
    });

    var data = JSON.stringify({
      fields: fields
    });

    res.end(data);

    console.log("posted fields:");
    console.log(data);
  });
}

var port = 4201;
server.listen(port);
console.log("server listening on port " + port);