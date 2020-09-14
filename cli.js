const { Command } = require('commander');
const api = require('./index')
const program = new Command();
// program.version('0.0.1')
program
  .option('-x, --xx', 'x option')
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
program
.command('clear')
  .description('clear all tasks')
  .action((...args) => {
  });
program.parse(process.argv);

if (program.debug) console.log(program.opts());
if (program.small) console.log('- small pizza size');
if (program.pizzaType) console.log(`- ${program.pizzaType}`);