const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const poster=new Schema({
  
    text:{
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true
    },

like:{
    type:Number,
    default:0
}

   
})

const Poster=mongoose.model('Poster',poster);


module.exports=Poster;

