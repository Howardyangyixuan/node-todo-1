const api = require('./index')
const { program } = require('commander');
program
  .command('add')
  .description('add a task')
  .action((...args) => {
    let words
    if(args.length>1){
      words = args[1].join(' ')
    }else{
      words=''
    }
    api.add(words)
  });
// program
// .command('clear')
//   .description('clear all tasks')
//   .action(() => {
//     api.clear()
//   });
if(process.argv.length ===2){
  api.showAll()
}else{
  program.parse(process.argv);
}