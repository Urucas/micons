'use strict'

module.exports = function(image_path, output_path, platforms, cb) {
  
  var gm = require('gm');
  var quality = 100;
  var fs = require('fs');

  var ios_icons = [
    {id:'icon-40', size: {w:40, h:40}},
    {id:'icon-40@2x', size: {w:80, h:80}},
    {id:'icon-50', size: {w:50, h:50}},
    {id:'icon-50@2x', size: {w:100, h:100}},
    {id:'icon-60@2x', size: {w:120, h:120}},
    {id:'icon-72', size: {w:72, h:72}},
    {id:'icon-72@2x', size: {w:144, h:144}},
    {id:'icon-76', size: {w:76, h:76}},
    {id:'icon-76@2x', size: {w:152, h:152}},
    {id:'icon-small', size: {w:29, h:29}},
    {id:'icon-small@2x', size: {w:58, h:58}},
    {id:'icon', size: {w:57, h:57}},
    {id:'icon@2x', size: {w:114, h:114}}
  ];

  var android_icons = [
    {id:'drawable', size: {w:96, h:96}},
    {id:'drawable-hdpi', size: {w:72, h:72}},
    {id:'drawable-ldpi', size: {w:36, h:36}},
    {id:'drawable-mdpi', size: {w:48, h:48}},
    {id:'drawable-xhdpi', size: {w:96, h:96}},
    {id:'drawable-xxhdpi', size: {w:114, h:114}}
  ];

  if(platforms.indexOf('ios') != -1) {
    var output_folder = output_path + "/ios";
    if(!fs.existsSync(output_folder)){
      fs.mkdirSync(output_folder, '0755');
    }
    for(var i in ios_icons){
      var icon = ios_icons[i];
      var output = output_path + "/ios/"+icon.id+".png";
      gm(image_path)
      .thumb(icon.size.w, icon.size.h, output, quality, function(err){
        if(err != undefined) console.log(err);
      });
    }  
  }

  if(platforms.indexOf('android') != -1) {
    var output_folder = output_path + "/android";
    if(!fs.existsSync(output_folder)){
      fs.mkdirSync(output_folder, '0755');
    }
    
    for(var i in android_icons){
      var icon = android_icons[i];
      var output = output_path + "/android/"+icon.id;
      if(!fs.existsSync(output)){
        fs.mkdirSync(output, '0755');
      }
      output+= "/icon.png";
      gm(image_path)
      .thumb(icon.size.w, icon.size.h, output, quality, function(err){
        if(err != undefined) console.log(err);
      });
    }  
  }

}