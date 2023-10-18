//Use this to create a random token one time
import crypto from 'crypto'

//Create random token
const token = crypto.randomBytes(64).toString("hex")

console.log(token);