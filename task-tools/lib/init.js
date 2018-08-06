'use strict';

const path = require('path');
const writeFile = require('fs').writeFileSync;
const chalk = require('chalk');
const getNpmArgs = require('./utils/get-npm-args.js');

const pathJoin = path.join;

// 报告无package.json文件
function reportNoConfig(){
  console.log(chalk.bgRed('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'));
  console.log(chalk.bgRed('!! Unable to setup antd-tools: project\'s package.json either missing !!'));
  console.log(chalk.bgRed('!! or malformed. Run `npm init` and then reinstall antd-tools.       !!'));
  console.log(chalk.bgRed('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'));
}

// 无package.json 中的scripts时处理
function addConfigHooks(cfg, projectDir){
  if(!cfg.scripts){
    cfg.scripts = {};
  }
  if(cfg.scripts.pub){
    return false;
  }
}

function reportCompletion(){
  console.log(chalk.bgGreen('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'));
  console.log(chalk.bgGreen('!! antd-tools was successfully installed for the project. !!'));
  console.log(chalk.bgGreen('!! Use `npm run pub` command for publishing.       !!'));
  console.log(chalk.bgGreen('!! publishing configuration.                                  !!'));
  console.log(chalk.bgGreen('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'));
}

function init(){
  const testMode = process.argv.indexOf('--test-mode') > 1;
  if(!testMode){
    const npmArgs = getNpmArgs();
    if(!npmArgs || !npmArgs.some(arg=>/^task-tools(@\d+\.\d+\.\d+)?$/.test(arg))){
      return;
    }
    // 项目目录
    const projectDir = pathJoin(__dirname, '../../../');
    const cfg = require(pathJoin(projectDir, 'package.json'));
    // 是否有项目配置
    if(!cfg){
      reportNoConfig();
      process.exit(1);
    }else if(addConfigHooks(cfg, projectDir)){
      reportCompletion();
    }
  }
}
init();
