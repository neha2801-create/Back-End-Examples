// Example adapted from Azat Mardan

// Imports
import express, { json } from 'express'
import m from "mongoose";

// Instantiations
const app = express()

const remoteurl = 'mongodb+srv://chester_the_tester:pfwcs@pfw-cs.ctovaum.mongodb.net/?retryWrites=true&w=majority';
m.connect(remoteurl, { useNewUrlParser: true, useUnifiedTopology: true })

const profileSchema = m.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true }
})
const Profile = m.model('Profile', profileSchema)

// Configurations

// Middleware
app.use(json()) //BodyParser has been integrated into Express, now you can call this instead

// Routes
app.get('/profile', (req, res) => {
    Profile.find({}, { '_id': 0, 'first_name': 1, 'last_name': 1 }, (err, profiles) => {
        if (err) {
            res.status(404)
        }

        if (req.query.id)
            res.send(profiles[req.query.id])
        else
            res.send(profiles)
    })
})

app.post('/profile', (req, res) => {
    let profile = new Profile(req.body)
    profile.save((error, _) => {
        if (error){
            console.error(error.message);
            return res.sendStatus(400)
        }
        else {
            console.log('created', profile)
            res.status(201).send()
        }
    })
})

app.put('/profile/:id', (req, res) => {
    Profile.find({}, (err, profiles) => {
        if (err) {
            res.status(404)
        }

        let profile = profiles[req.params.id]
        profile.first_name = req.body.first_name
        profile.last_name = req.body.last_name

        profile.save((err) => {
            if (err)
                res.status(404)

            console.log("Update", profile)
            res.status(204).send()
        })
    })
})

app.delete('/profile/:first_name', (req, res) => {
    Profile.deleteOne({ first_name: req.params.first_name }, (err) => {
        if (err)
            res.status(404)
        console.log('deleted', req.params.first_name)
        res.status(204).send()
    })
})

// Error handlers

// Server bootup or server export
app.listen(process.env.PORT || 8080)
console.log("Waiting on port 8080 for DB requests");

export default app