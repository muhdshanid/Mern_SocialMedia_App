import React from "react";
import profile from "../Images/Profile.png";
import likeIcon from "../Images/like.png";
import commentIcon from "../Images/speech-bubble.png";
import shareIcon from "../Images/share.png";
import moreOption from "../Images/more.png";
import LikedIcon from "../Images/setLike.png";
import "./ProfilePost.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const ProfilePost = ({post}) => {
  const userDetails = useSelector(state => state.user)
    let userr = userDetails.user
    let id = userr.other._id
    const accessToken = userr.token;
  const [user, setUser] = useState([])
  const [like, setLike] = useState([post.like.includes(id) ? LikedIcon : likeIcon])
  const [count, setCount] = useState(post.like.length)
  const [comments, setComments] = useState([]);
  const [commentWriting, setCommentWriting] = useState("");
  const [showComments, setShowComments] = useState(false);
  useEffect(()=>{
    const getUser = async () => {
      try {
        const {data} = await axios.get(`http://localhost:5000/api/user/posted-user/${post.user}`)
        setUser(data)
      } catch (error) {
        console.log(error.message);
      }
    }
    getUser()
  },[post.user])
  const handleLike = async() => {
    if (like == likeIcon) {
      await fetch(`http://localhost:5000/api/post/like/${post._id}`,{
        method:'PUT',
        headers:{
          "Content-Type":"application/json",
          token:accessToken
        },
        body:JSON.stringify({ 
          user:id
        })
      })
      setLike(LikedIcon);
      setCount(count + 1);
    } else {
      await fetch(`http://localhost:5000/api/post/like/${post._id}`,{
        method:'PUT',
        headers:{
          "Content-Type":"application/json",
          token:accessToken
        },
        body:JSON.stringify({
          user:id
        })
      })
      setLike(likeIcon);
      setCount(count - 1);
    }
  };
  const addComments = () => {
    const comment = { 
      id: "57349573",
      username: "shanid",
      title: `${commentWriting}`,
    };
    setComments(comments.concat(comment));
  };
  const handleComment = () => {
    addComments();
  };
  const handleShow = () => {
    if (showComments === false) {
      setShowComments(true);
    } else {
      setShowComments(false);
    }
  };
  return (
    <div className="post-container">
      <div className="sub-post-container">
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
              <img src={`${user.profile}`} className="post-img" alt="" />
            <p style={{ marginLeft: "5px" }}>{user?.username}</p>
            <img src={`${moreOption}`} className="more-icon" alt="" />
          </div>
          <p
            style={{
              marginLeft: 10,
              marginTop: 0,
              textAlign: "start",
              width: "96%",
            }}
          >
            {post.title}
          </p>
          <img src={`${post.image}`} className="post-images" alt="" />
          <div style={{ display: "flex" }}>
            <div style={{width:"300px", display: "flex", marginLeft: "10px" }}>
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {
                  post.user !== id  && <img
                  src={`${like}`}
                  className="icon-post"
                  onClick={handleLike}
                  alt=""
                />
                }
                <p style={{ marginLeft: "6px" }}>{count} Likes</p>
              </div>
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 20,
                }}
              >
                <img
                  src={`${commentIcon}`}
                  onClick={handleShow}
                  className="icon-post"
                  alt=""
                />
                <p style={{ marginLeft: "6px" }}>{post.comments.length} Comments</p>
              </div>
            </div>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                marginLeft: 100,
              }}
            >
              <img src={`${shareIcon}`} style={{marginLeft:20,width:20}} alt="" />
              <p style={{ marginLeft: "10px" }}>Share</p>
            </div>
          </div>
          {showComments ? (
            <div style={{ padding: "10px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={`${profile}`} className="comment-post-img" alt="" />
                 {/* <p style={{marginLeft:"7px"}}>Shanid</p> */}
                <input
                  className="comment"
                  placeholder="Write your thought"
                  onChange={(e) => setCommentWriting(e.target.value)}
                  type="text"
                  name=""
                  id=""
                />
                <button className="comment-btn" onClick={handleComment}>
                  Post
                </button>
              </div>
              {comments.map((cmt) => (
                <div style={{  alignItems: "center" }}>
                  <div style={{display:"flex",alignItems:"center"}}>
                    <img
                      src={`${profile}`}
                      className="comment-post-img"
                      alt=""
                    />
                    <p style={{ marginLeft: "7px",fontSize:18,marginTop:6 }}>{cmt.username}</p>
                  </div>
                  <p style={{marginTop:"-16px", marginLeft: "62px" ,textAlign:"start"}}>{cmt.title}</p>
                  <p style={{marginTop:"-13px", marginLeft: "62px" ,textAlign:"start",color:"#aaa",fontSize:11}}>Reply</p>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;
