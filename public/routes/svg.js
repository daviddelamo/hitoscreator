'use strict'
var express = require('express');
var SVGController = require('../controller/svg.js');


var api = express.Router();

api.post('/generate', SVGController.generateSVG);

module.exports = api;
