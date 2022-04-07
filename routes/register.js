const express=require('express')
const router=express.Router()
const{registration,login}=require('../controller/regi')

router.post('/', registration)
router.post('/login',login)
module.exports=router