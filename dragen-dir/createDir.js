#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const pwd = process.cwd();
function create(){
  let configPath;
  program
  .arguments('<name>')
  .option('-c, --config', 'read config')
  .action((name)=>{
    configPath = program.config ? program.config : `${pwd}/createDir.config.js`;
    start(configPath, name)
  })
  .parse(process.argv);
}

function start(configPath,name){
  let config;
  if(fs.existsSync(configPath)){
    config = require(configPath);
  }else{
    console.error(`未找到您的配置文件`)
    process.exit(1);
  }
  let curPath = `${config.path}/${name}`;
  if(isExists(curPath)){
    console.error('你的目标文件已存在');
    return;
  }else{
    fs.mkdirSync(curPath);
  }
  generatorStruct(config.dir, curPath, name,  config.template);
}

function generatorStruct(dir, curPath, name, template){
  let templateCfg = template ? require(path.resolve(template))(name) : null;
  dir.forEach((item)=>{
    if(item && item.dirName){
      let newPath = `${curPath}/${item.dirName}`;
      createDir(newPath);
      if(item.subDir){
        generatorStruct(item.subDir, newPath, name, template);
      }
    }else if(item && item.fileName){
      if(item.template && templateCfg){
        createFile(curPath, item.fileName, templateCfg[item.template]);
      }
      createFile(curPath, item.fileName);
    }else if(item && item.fileNames){
      item.fileNames.forEach((sub)=>{
        createFile(curPath, sub);
      })
    }else if(item && item.files){
      item.files.forEach((sub)=>{
        if(templateCfg && sub.template){
          createFile(curPath, sub.fileName, templateCfg[sub.template]);
        }else{
          createFile(curPath, sub.fileName);
        }
      })
    }
  });
}

function createDir(dir){
  fs.mkdirSync(dir);
}

function createFile(dir, fileName, template){
  let newFile = `${dir}/${fileName}`;
  fs.open(newFile,'w', (err, fd)=>{
    if(err) throw err;
    if(template && fd){
      let ws = fs.createWriteStream(newFile, {start: 0});
      let buf = Buffer.from(template);
      ws.write(buf, 'utf8', (err, buffer)=>{
        console.log(`${fileName}写入完成`);
      });
    }
  });
}

function isExists(dir){
  return fs.existsSync(dir)
}

function parseTemplate(template){

}

create();

