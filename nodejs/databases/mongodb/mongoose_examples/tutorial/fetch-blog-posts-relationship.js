// Example adapted from old example at https://www.edx.org/course/introduction-node-js-microsoft-dev283x by Azat Mardan

import m from 'mongoose';
const commentSchema = m.Schema({
    text: String,
    post: { type: m.Schema.Types.ObjectId, ref: 'Post' } //This is pointing to an instance of a Post
})
const postSchema = m.Schema({
    name: String,
    url: String,
    text: String
})

const remoteurl = 'mongodb+srv://chester_the_tester:pfwcs@pfw-cs.ctovaum.mongodb.net/?retryWrites=true&w=majority';
m.connect(remoteurl, { useNewUrlParser: true, useUnifiedTopology: true })

let Post = m.model('Post', postSchema)
let Comment = m.model('Comment', commentSchema)

let post = new Post({
    name: 'Top 10 ES6 Features every Web Developer must know',
    url: 'https://webapplog.com/es6',
    text: 'This essay will give you a quick introduction to ES6.'
})

post.save((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Post is saved: ', post.toJSON())
    }

    let i = 0
    let ca = [{ text: 'Cruel...text 1' },
    { text: 'text 2' },
    { text: 'text 3' }
    ].forEach((comment, _, list) => {
        comment.post = post._id
        const c = new Comment(comment)
        c.save((error, result) => {
            if (error) return console.error(error)
            i++
            if (i == list.length) {
                queryCommentWithPost()
            }
        })
    })
})

const queryCommentWithPost = () => {
    // Populate
    Comment
        .findOne({ text: /Cruel/i })
        .populate('post')
        .exec(function (err, comment) {
            if (err) return console.error(err)
            console.log(`The comment is ${comment}`)
            m.disconnect()
        })
}
