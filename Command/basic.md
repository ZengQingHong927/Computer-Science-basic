# nodejs commander

- chalk (命令行指令颜色配置)
- commander (nodejs命令行工具)

## example

```js
const program = require('commander');
function main () {
  program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

program.parse(process.argv);

let {
  type,
  dest,
  example
}   = commander;

if (program.debug) console.log(program.opts());
console.log('pizza details:');
if (program.small) console.log('- small pizza size');
if (program.pizzaType) console.log(`- ${program.pizzaType}`);

}

```

```js

var program = require ('commander');

var mainA = () => {
  await mongodb.init ()
  program
    .option('-m, --mode[mode]', 'mode');
    
  program.parse(process.argv);
   
  let { mode }  = program;
    
  // execute function based on different mode
  ...
  
  process.exit(0)
}

try {
  mainA ();
}
catch (e) {
}

```
