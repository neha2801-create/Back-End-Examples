// Adapted from old example at https://www.edx.org/course/introduction-node-js-microsoft-dev283x by Azat Mardan

import m from 'mongoose';

const commentSchema = m.Schema({ text: String })
const postSchema = m.Schema({
    name: String,
    url: String,
    text: String,
    comments: [{ type: m.Schema.Types.ObjectId, ref: 'Comment' }]
})

const remoteurl = 'mongodb+srv://chester_the_tester:cs590@pfw-cs.ctovaum.mongodb.net/?retryWrites=true&w=majority';
m.connect(remoteurl, { useNewUrlParser: true, useUnifiedTopology: true })

let Comment = m.model('Comment', commentSchema)
let Post = m.model('Post', postSchema)

let ca = [{ text: 'Cruel... .var {house, mouse} = No type optimization at all' },
{ text: 'I think you are undervaluing the benefit of let and const.' },
{ text: '(p1, p2)=>{...}, i understand this, thank you!' }
].map((comment) => {
    const c = new Comment(comment)
    c.save()
    return c._id
})

console.log(ca)

const post = new Post({
    name: 'Top 10 ES6 Features every Web Developer must know',
    url: 'https://webapplog.com/es6',
    text: 'This essay will give you a quick introduction to ES6.',
    comments: ca
})

post.save(function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log('The post is saved: ', post.toJSON())
    }

    // Populate
    Post.findOne({ name: /Top 10 ES6/i })
        .populate('Comments')
        .exec(function (err, post) {
            if (err) return console.error(err)
            console.log(`The post is ${post}`)
            m.disconnect()
        })

    
})

Comment.deleteMany({}, function(err) { 
    if (err) console.log(err);
    console.log('collection removed') 
 });

