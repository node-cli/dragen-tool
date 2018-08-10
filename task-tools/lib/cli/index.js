#!/usr/bin/env node

'use strict';

require('colorful').colorful();
const gulp = require('gulp');

const program = require('commander');
const packageInfo = require('../../package.json');

//command('exec <cmd>) .option('-p, --publish', 'publish'， Regexp), usage, action可以接收command中的参数及options, alias对command别名, description 命令描述  arguments('<cmd> [env]')
// <path>, <mode> [env] [name] [query] 命令的参数, 必须的参数与可选参数
// 事件 执行命令和选项事件
// outputHelp(fn)
// program.args  选项  program.templateEngine, program.sauce  ....
program
  .version(packageInfo.version, '-v, --version')
  // 子命令
  .command('run <name>', 'start specified task')
  .parse(process.argv);

  const proc = program.runningCommand;
  if(proc){
    proc.on('close', process.exit.bind(process));
    proc.on('error', ()=>{
      process.exit(1);
    })
  }

  const subCmd = program.args[0];
  if(!subCmd || subCmd != 'start'){
    program.help();
  }
