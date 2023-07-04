const express = require('express')
const path = require('path')
const db = require('./database.js')
const auth = require('./auth.js')
const session = require('express-session');

const app = express()

const port = 3000

app.use(express.json())

app.use(express.static(path.join(__dirname, './public/scripts/login')))
app.use(express.static(path.join(__dirname, './public/scripts/admin')))
app.use(express.static('public'))

app.use(session({
    secret: [...Array(32)].map(() => Math.random().toString(36)[2]).join(''),
    resave: false,
    saveUninitialized: false
}));

const secret_key_len = 8


app.get('/login', (req, res) => {
    const pagePath = path.join(__dirname, './public/html/login.html')
    res.sendFile(pagePath)
})

app.post('/login/try_key', (req, res) => {
    try{
        const attempt = req.body.attempt
        console.log('login request', attempt)
        db.check_key_valid(attempt).then(is_valid => {
            
            req.session.admin = is_valid ? req.session.admin = attempt : undefined
            console.log(`response for ${attempt} : ${is_valid}, ${req.session.admin}`)

            res.send(JSON.stringify({result: is_valid}))
        })
        
    }catch(e){
        console.log(`Error with trying key ${e}`)
    }
})

app.use(auth.authenticate)

app.get('/admin', (req, res) => {
    const pagePath = path.join(__dirname, './public/html/admin.html')
    res.sendFile(pagePath)
})

app.post('/admin/new_key', (req, res) => {
    try{
        const new_key = [...Array(secret_key_len)].map(() => Math.random().toString(36)[2]).join('')
        db.add_key(new_key)
        res.send(new_key)
    }catch(e){
        console.log(`Error with new key: ${e}`)
    }
})

app.post('/admin/get_current', (req, res) => {
    res.send(req.session.admin)
})


app.listen(port, () => {
    console.log('listening on localhost:', port)
})