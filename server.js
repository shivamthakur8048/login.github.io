const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const model = require('./model/model')
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
const router=require('./routes/register')

mongoose.connect('mongodb+srv://sHivam8048:thakur@cluster0.gpu32.mongodb.net/login_info?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected to the database");
}).catch(() => {
    console.log("error connecting");
})
app.use(bodyParser.json())
app.use(express.urlencoded())
app.use(express.static('./public'))

app.use('/register',router)

app.listen(5000, () => {
    console.log("connected to the server");
})