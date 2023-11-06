// refer to https://www.edx.org/course/introduction-node-js-microsoft-dev283x by Azat Mardan

import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({name: String})

const remoteurl = 'mongodb+srv://chester_the_tester:pfwcs@pfw-cs.ctovaum.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(remoteurl, { useNewUrlParser: true, useUnifiedTopology: true })

let Course = mongoose.model('Course', courseSchema)
let csCourse = new Course({ name: 'CS Course'})

let result = await csCourse.save();
console.log('Saved: ', result);