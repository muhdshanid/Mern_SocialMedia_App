import React from "react";
import profile from '../Images/Profile.png'
import likeIcon from '../Images/like.png'
import commentIcon from '../Images/speech-bubble.png'
import shareIcon from '../Images/share.png'
import "./Post.css";
const Post = () => {
  return (
    <div className="post-container">
      <div className="sub-post-container">
        <div>
          <div style={{display:"flex",alignItems:"center"}}>
            <img src={`${profile}`} className='post-img' alt="" />
            <p style={{marginLeft:"5px"}}>Shanid</p>
          </div>
            <p style={{marginLeft:10,marginTop:0,textAlign:"start",width:"96%"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum reiciendis corporis qui veritatis asperiores quia, voluptas ex minus architecto dicta magni tempore perspiciatis facilis laudantium et cumque? Soluta, inventore eius!</p>
            <img src={`${profile}`} className='post-images' alt="" />
        <div style={{display:"flex"}}>
            <div style={{display:'flex',marginLeft:"10px"}}>
            <div style={{cursor:"pointer",display:"flex",alignItems:"center"}}>
                <img src={`${likeIcon}`} className='icon-post' alt="" />
                <p style={{marginLeft:"6px"}}>100k Likes</p>
            </div>
            <div style={{cursor:"pointer",display:"flex",alignItems:"center",marginLeft:20}}>
                <img src={`${commentIcon}`} className='icon-post' alt="" />
                <p style={{marginLeft:"6px"}}>100k Comments</p>
            </div>
            </div>
            <div style={{cursor:"pointer",display:"flex",alignItems:"center",marginLeft:50}}>
                <img src={`${shareIcon}`} className='icon-post' alt="" />
                <p style={{marginLeft:"6px"}}>100k Comments</p>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
