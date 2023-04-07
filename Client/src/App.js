import {useState,useEffect} from 'react';
import './App.css';

function App() {

const API="http://localhost:3001"


const[poster,setPoster]=useState([]);
const[Modal,setModal]=useState(false)
const[newPost,setNewPost]=useState("");
const[newPostName,setNewPostName]=useState("");
const[like,setLike]=useState(0);






const fetchData=async()=>{
 await fetch(API+"/post")
 .then(res=>res.json())
 .then(data=>setPoster(data))
 .catch(err=>console.log(err))
};

useEffect(()=>{
fetchData()
},[]);

const addPost=async()=>{
const data=await fetch(API+ "/Post", {
  method:"POST",
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({ text: newPost, name:newPostName})
}).then(res=>res.json());

setPoster([...poster,data])
setModal(false);
setNewPost("");
}

const deletePost=async id=>{
const data=await fetch(API+ "/post/delete/" + id,{
  method:"delete",
  header:{'Content-Type': 'application/json'},
  body: JSON.stringify({ text: "String"})
}).then(res=>res.json());

setPoster(post=>post.filter(posts=>posts._id!==data._id))
console.log(poster)
}




const likePost=async (id, increase)=>{
const data= await fetch(API+ "/post/edit/"+ id, {
  method:"PUT",
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({like:like})
}).then(res=>res.json());

setLike(like+1);

setPoster(post=>post.map(poster=>{
if(poster._id===data._id){
poster.like=data.like;
};
return poster;
})) 

console.log(poster)
console.log(data.like);
};



const dislikePost=async (id, decrease)=>{
const data= await fetch(API+ "/post/edit/"+ id, {
  method:"PUT",
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({like:like})
}).then(res=>res.json());

setLike(like-1);

setPoster(post=>post.map(poster=>{
if(poster._id===data._id){
poster.like=data.like;
}

return poster;
}))

console.log(poster)
console.log(like)
};



  return (
    
    <div className="App">
      <h1><u>Make a Post!</u></h1>
  {Modal&&
  <div className="modal-container">
    <form>
        <div><button onClick={()=>setModal(false)}>x</button></div>
    <label>Name:</label>
    <input type='text' onChange={e=>setNewPostName(e.target.value)} value={newPostName}></input>
    <label>Enter Post:</label>
    <input type='text' onChange={e=>setNewPost(e.target.value)} value={newPost}></input>
     <div><button onClick={addPost}>Submit</button></div>
     </form>
  </div>}


<div className="post-container">{poster.map(post=>(
<div className="post" key={post._id}>
  <button className="delete-button" onClick={()=>deletePost(post._id)}>x</button>
<div className="header">
<div><h4>Post it</h4></div>
</div>

<div className="content">{post.text}</div>
<div className="bottom">
  <div>Like:<p>{post.like}</p></div>
  <div><h4>Posted By:</h4> <p>{post.name}</p></div>
</div>

<div>
  <button onClick={(e)=>{likePost(post._id, like)}}>Like</button>
  <button onClick={(e)=>{dislikePost(post._id, like)}}>Dislike</button>
  </div>
</div>))}

</div>
 
    <button onClick={()=>setModal(true)}>New Post</button>
    </div>
  );
}


export default App;
