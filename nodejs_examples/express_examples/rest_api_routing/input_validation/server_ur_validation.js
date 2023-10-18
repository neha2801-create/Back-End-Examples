// Imports
import express from 'express'
import { json } from 'body-parser'

// Instantiations
const app = express()
var profile = []

// Configurations

// Middleware
app.use(json())

// Routes
app.get('/profile', (req, res) => {
    if (req.query.id)
        res.send(profile[req.query.id])
    else
        res.send(profile)
})

app.post('/profile', (req, res) => {
    if (!req.body.first_name || !req.body.last_name)
        return res.send(400)
    
    let obj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }
        
    profile.push(obj)
    console.log('created', profile)
    res.status(201).send()
})

app.put('/profile/:id', (req, res) => {
    Object.assign(profile[req.params.id], req.body)
    console.log('updated', profile[req.params.id])
    res.status(204).send()
})

app.delete('/profile/:id', (req, res) => {
    profile.splice(req.params.id, 1)
    console.log('deleted', profile)
    res.status(204).send()
})

// Error handlers

// Server bootup or server export
app.listen(process.env.PORT || 8080)
