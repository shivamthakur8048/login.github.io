const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
const model = require('../model/model')
const mongoose = require('mongoose')
const JWT_SECRET='thisismyfirsttokensecret'
const registration=async (req, res) => {
    const { username, password: pass, email, number } = req.body
    if (!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: "user already exists" })
    }
    if (!pass || typeof pass !== 'string') {
        return res.json({ status: 'error', error: "Invalid password" })
    }
    if (pass.length < 6) {
        return res.json({ status: 'error', error: "password too small, password should be atleast 6 characters" })
    }
    const password = await bcrypt.hash(pass, 10)
    try {
        const response = await model.create({
            username, password, email, number
        })
        console.log(response);
    } catch (error) {
        if (error.code === 11000) {
            res.json({ status: 'error', error: "user already exits" })
        }
        throw error
    }
    console.log(req.body);
    // res.json({ status: "ok" })
    res.redirect('redirect.html')
}

const login=async(req,res)=>{
    const {username,password}=req.body

    const user=await model.findOne({username}).lean()
    if(!user){
        return res.json({status:"error",error:'invalid username/password'})
    }{
    if(await bcrypt.compare(password,user.password)){
        const token=jwt.sign({
            id:user._id,
            username:user.username
        },JWT_SECRET)
        
        console.log({status:'ok',data:token})
        res.redirect('/main.html')

    }else{
        res.send({status:'ok',data:"INVALID CREDENTIALS"})
    }}
    // res.send(`<h1>Login done</h1>`)
}

module.exports={login,registration}