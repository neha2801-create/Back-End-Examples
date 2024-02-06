import { EventEmitter } from 'events';
import readline from 'readline';

const eventEmitter = new EventEmitter();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//scream handler for scream event
eventEmitter.on('scream', () => { console.log("I hear a scream!") });

//attach whisper handler to whisper event
eventEmitter.on('whisper', () => { console.log("I hear a whisper...") });

rl.setPrompt('What event would you like to activate?\n');
rl.prompt();

rl.on('line', (response) => {
  eventEmitter.emit(response);
  if (response === "quit"){
    rl.close();
  }
});
