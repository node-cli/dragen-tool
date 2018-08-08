const fs = require('fs');
const program = require('commander');
function create(dir, name){
  program
  .option('-c, --config', 'read config')
  .command('<dir> <name>')
  .action((dir, name)=>{

  })
  .parse(process.argv);
  if(program.config){

  }
}
