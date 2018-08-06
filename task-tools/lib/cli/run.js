#!/usr/bin/env node

'use strict';

require('colorful').colorful();

const program = require('commander');
const gulp = require('gulp');

program.option('--help', ()=>{
  console.log('  Usage'.to.bold.blue.color);
})

program.parse(process.argv);

const task = program.argv[0];

if(!task){
  program.help();
}else{
  console.log('task run', task);
  require('../gulpfile');
  gulp.start(task);
}
