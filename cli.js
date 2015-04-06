#!/usr/bin/env node
'use strict'

var fs = require('fs');
var color = require('colors');

var argv = process.argv.slice(2);

var image_path = argv.shift();
if(image_path == undefined) {
  console.log("Image path not setted".red);
  return;
}

if(!fs.existsSync(image_path)){
   console.log("Image not found".red+" -> "+image_path.white);
   return;
}

var output_path = argv.shift();
if(output_path == undefined) {
  console.log("Output path not setted".red);
  return;
}

if(output_path == undefined || !fs.existsSync(output_path)){
   console.log("Output path not found".red+" -> "+output_path.white);
   return;
}

var platforms = [];
if(argv.indexOf('--android') !== -1) platforms.push('android');
if(argv.indexOf('--ios') !== -1) platforms.push('ios');
if(argv.indexOf('--osx') !== -1) platforms.push('osx');
if(platforms.length == 0) {
   console.log("No platforms selected".red);
   return;
}

var micons = require("./");
micons(image_path, output_path, platforms, function(err){
  if(err != undefined) console.log("Error "+err.red);
  else console.log("Finish creating icons".green);  
});
