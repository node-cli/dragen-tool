#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const pwd = process.cwd();
function create(){
  let config, configPath;
  program
  .command('start <dir> <name>')
  .option('-c, --config', 'read config')
  .action((dir, name)=>{
    console.log(dir, name);
    start(config, path, name)
  })
  .parse(process.argv);
  configPath = program.config ? program.config : `${pwd}/createDir.config.js`;
  if(fs.existsSync(configPath)){
    config = fs.readFileSync(`${pwd}/createDir.config.js`);
  }else{
    console.error(`未找到您的配置文件`)
  }
}

function start(config, path, name){
  console.log(config)
}

create();

