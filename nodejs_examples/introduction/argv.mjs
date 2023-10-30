/**
 * CommonJS Version
 */
// for (let i = 0; i < process.argv.length; i++){
//     console.log(process.argv[i]);
// }
// console.log(__dirname);
// console.log(__filename);

/**
 * ES6 Version
 * Requires file type of .mjs
 * or
 * add "type": "module" to package.json
 */
import { argv } from 'process';
import * as url from 'url';
 
for (let i = 0; i < argv.length; i++){
    console.log(argv[i]);
}

const __filename = url.fileURLToPath(import.meta.url); 
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
console.log(__dirname);
console.log(__filename);