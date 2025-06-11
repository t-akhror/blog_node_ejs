const {Schema, model}=require('mongoose')

const postSchema=new Schema({
    id:Number,
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
    tags:[String],
    reactions:{
        likes:Number,
        dislikes:Number
    },
    views:Number,
    userId:Number    
},{timestamps:true})

module.exports=model('Post',postSchema)