'use strict'

var http = require('http'),
    fileSystem = require('fs'),
    path = require('path');
var hummus=require('hummus');
var fillForm = require('./pdf-form-fill').fillForm;
function generatePDF(req, res){
  var outputName = new Date().getTime();
  var filePath = '/tmp/cultos_'+outputName+'.pdf');
  console.log('filePath: '+filePath);
  var writer = hummus.createWriterToModify('./public/pdf_templates/cultos.pdf', {
  			modifiedFilePath: filePath
  });

  var params = req.body;

  var data = params;
  console.log(data);

  fillForm(writer,data);
  writer.end();

  var stat = fileSystem.statSync(filePath);
  res.writeHead(200, {'Content-Type': 'application/pdf',
                      'Content-Length': stat.size});



  var readStream = fileSystem.createReadStream(filePath);
  // We replaced all the event handlers with a simple call to readStream.pipe()
  readStream.pipe(res);
  readStream.on('close', function(){
    fs.unlink(filePath);
  });
  res.end();
}

module.exports = {
  generatePDF
};
