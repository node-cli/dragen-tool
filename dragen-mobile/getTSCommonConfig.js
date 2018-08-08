'use strict';

const fs = require('fs');
const path = require('path');
const assign = require('object-assign');

module.exports = function(){
  let my = {};
  let tsConfig = path.join(process.cwd(), 'tsconfig.json');
  if(fs.existsSync(tsConfig)){
    my = require(tsConfig);
  }
  return assign({
    noUnusedParameters: false,
    noUnusedLocals: false,
    strictNullChecks: false,
    target: 'es6',
    jsx: 'preserve',
    moduleResolution: 'node',
    // 是否生成.d.ts文件
    declaration: true,
    allowSyntheticDefaultImports: true,
  }, my.compilerOptions)
}
