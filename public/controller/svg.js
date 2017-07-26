'use strict'

var sharp = require('sharp');

var http = require('http'),
    fileSystem = require('fs'),
    path = require('path');
var gm = require('gm');


function generateSVG(req, res){

  var params = req.body;


  /*var buf = fileSystem.readFileSync(__dirname + '/../pdf_templates/hoja_cultos_editable.svg');
  var fileName = params.nombre+'.png';

  console.log(fileName);

  gm(buf).write(fileName, function (err) {
    if (err) return console.dir(arguments);

    console.log(this.outname + ' created :: ' + arguments[3]);
  });
  return;*/

  fileSystem.readFile(__dirname + '/../pdf_templates/hoja_cultos_editable.svg', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

      data = data.replace('${nombre}', params.nombre);

      var fileName = __dirname + '/output/'+params.nombre+'.png';
      var pngOptions= {
        progressive : true,
        compressionLevel : 6,
        adaptiveFiltering : true
      }
      sharp(__dirname + '/../pdf_templates/hoja_cultos_editable.svg').png(pngOptions).toBuffer(function(err, data, info){
        res.set({
          'Content-Type': 'image/png',
          'Content-Length': data.length
        });
        res.send(data);
      });

      /*gm(data).write(fileName, function(err){
        if (err){
          console.log(err);
        }else{
          console.log("Fichero creado correctamente.");
        }
      });*/


/*      Svg.fromXmlString(data.toString(), function(err, svg){
          if(err){
              throw new Error('SVG file not found or invalid');
          }

          var fileName = __dirname + '/output/'+params.nombre+'.png';

          console.log("fileName: "+fileName);

          var savePngParams = {
            output: fileName,
            file: svg
          };

          console.log("savePngParams: "+savePngParams);

          svg.savePng(savePngParams, function(err, filename){
              if(err){
                  throw err;
              }
          });
      });*/

  });

}

module.exports = {
  generateSVG
};
