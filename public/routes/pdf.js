'use strict'
var express = require('express');
var PDFController = require('../controller/pdf.js');


var api = express.Router();

api.post('/generate', PDFController.generatePDF);

module.exports = api;
