'use strict';

const path = require('path');

//  env变量，.bin目录
module.exports = function getRunCmdEnv() {
  const env = {};
  Object.keys(process.env).forEach((key)=>{
    env[key] = process.env[key];
  });
  const nodeModulesBinDir = path.join(__dirname, '../../node_modules/.bin');
  env.PATH = evn.PATH ? `${nodeModulesBinDir}:${env.PATH}` : nodeModulesBinDir;
  return env;
}
