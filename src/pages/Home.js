import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db, useAuth } from "../firebase-config";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import IconButton from '@mui/material/IconButton';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  },);
  
  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div className="post"  key ={post.id}>
            <div className="postHeader">
              <div className="title" >
                <h2> {post.title}</h2>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <Button  size = "small"onClick={() => {
                      deletePost(post.id);
                    }}variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>

                )}
                
              </div>
            </div>
            <div className="postTextContainer " style= {{ display:"flex" , justifyContent:"space-between"}}> <h4>{post.postText}</h4>
        
         </div>
            <div className="postTextContainer" style = {{color :"ButtonFace"}}><a href={post.link}>Read Here</a></div>
            <div className="user" style= {{ display:"flex" , justifyContent:"flex-end"}}><h4>Posted By : {post.author.name}</h4><img  class = "image--cover "  style = {{width: "50px", height: "50px",borderRadius: "50%", margin: "10px"}} src = {post.author.profilePic}></img></div>
          
          </div>
        );
      })}
    </div>
  );
}

export default Home;
