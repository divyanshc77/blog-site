const mongoose=require('mongoose');
const { Schema ,model} = mongoose;

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    likedPosts:[{
        type:Schema.Types.ObjectId,ref:'Post'
    }]
});

module.exports = mongoose.model('User', userSchema);