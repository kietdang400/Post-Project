const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/I-Was-Here', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(()=>{console.log('Connected DB')})
.catch(err=>console.error);

const Poster=require('./Modal/poster');

app.get('/post',async(req,res)=>{
    const poster=await Poster.find();
    res.json(poster);
});

app.post('/Post',(req,res)=>{
    const Post=new Poster({
        text:req.body.text,
        name:req.body.name,
        like:req.body.like
    });

    Post.save();
    res.json(Post);

});

app.put('/post/edit/:id',async(req,res)=>{

    const edit=await Poster.findByIdAndUpdate(req.params.id,req.body);
    
    edit.like=edit.like;

    edit.save();
    res.json(edit);
    
});

app.delete('/post/delete/:id',async(req,res)=>{
    const erase=await Poster.findByIdAndDelete(req.params.id);

    res.json(erase);
});


app.listen(3001,()=>{console.log("Litsening on Port 3001")});