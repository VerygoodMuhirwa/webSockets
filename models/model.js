const mongoose=require("mongoose")

const dbSchema= new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    
    
},{timestamps:true})

const MessageModel= mongoose.model('Messages',dbSchema)
module.exports= MessageModel
