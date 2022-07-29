import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import IconButton from '@mui/material/IconButton';
function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  });
  
  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };
  
  const[likes , setLikes]=useState(0);
  const inc=()=>{
     setLikes(likes+1);
     
}
  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div className="post" key ={post.id}>
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  > Delete
                    {" "}
                    &#128465;
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer"> <h2>{post.postText}</h2> </div>
            <div className="postTextContainer"><a href={post.link}>Link to the question</a></div>
            <div className="user"><h4>Posted By :<span></span><AccountCircleIcon></AccountCircleIcon><span> </span>{post.author.name}</h4></div>
          
          </div>
        );
      })}
    </div>
  );
}

export default Home;
