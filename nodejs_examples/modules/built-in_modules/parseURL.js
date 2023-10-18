import { parse } from 'url';
const adr = 'http://localhost:8080/default.htm?year=2020&month=October';
const q = parse(adr, true);
const qdata = q.query;

console.log(q.host); 
console.log(q.pathname); 
console.log(q.search); 
console.log(qdata); 
console.log(qdata.month); 