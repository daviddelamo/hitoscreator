var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var pdf_routes = require('./public/routes/pdf.js');
var svg_routes = require('./public/routes/svg.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.use('/pdf', pdf_routes);
app.use('/svg', svg_routes);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
