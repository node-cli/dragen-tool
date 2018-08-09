#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const pwd = process.cwd();
function create(){
  let configPath;
  program
  .arguments('<dir> <name>')
  .option('-c, --config', 'read config')
  .action((dir, name)=>{
    configPath = program.config ? program.config : `${pwd}/createDir.config.js`;
    start(configPath, path.resolve(dir), name)
  })
  .parse(process.argv);
}

function start(configPath, dir, name){
  let config;
  if(fs.existsSync(configPath)){
    config = require(configPath);
  }else{
    console.error(`未找到您的配置文件`)
    process.exit(1);
  }
  let curPath = `${dir}/${name}`;
  fs.mkdirSync(curPath);
  generatorStruct(config.dir, curPath);
}

function generatorStruct(dir, curPath){
  dir.forEach((item)=>{
    if(item && item.dirName){
      newPath = `${curPath}/${item.dirName}`;
      createDir(curPath);
      if(item.subDir){
        generatorStruct(item.subDir, newPath);
      }
    }else if(item && item.fileName){
      createFile(curPath, item.fileName);
    }
  });
}

function createDir(dir){
  fs.mkdirSync(dir);
}

function createFile(dir, fileName){
  fs.open(`${dir}/${fileName}`,'w', (err, fd)=>{
    if(err) throw err;
  });
}

create();

