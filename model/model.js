const mongoose=require('mongoose')

const schema= mongoose.Schema

const registerData= new schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    number:{
        type:Number,
        required:true,
        unique:true
    }
})

module.exports=mongoose.model('registerDetails',registerData)