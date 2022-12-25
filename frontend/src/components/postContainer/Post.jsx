import React from "react";
import profile from "../Images/Profile.png";
import likeIcon from "../Images/like.png";
import commentIcon from "../Images/speech-bubble.png";
import shareIcon from "../Images/share.png";
import moreOption from "../Images/more.png";
import LikedIcon from "../Images/setLike.png";
import "./Post.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";
const Post = ({post}) => {
  const userDetail = useSelector(state => state.user)
  let userr = userDetail.user
  const userId = userr.other._id
  const userDetails = useSelector(state => state.user)
  const [like, setLike] = useState([post.like.includes(userId) ? LikedIcon : likeIcon]);
  const [count, setCount] = useState(post.like.length);
  const [user, setUser] = useState([])
  const [comments, setComments] = useState(post.comments);
  const [commentWriting, setCommentWriting] = useState("");
  const [showComments, setShowComments] = useState(false);
  let loggedInUser = userDetails.user
  const accessToken = loggedInUser.token
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
  },[])
  const handleLike = async() => {
    if (like == likeIcon) {
      await fetch(`http://localhost:5000/api/post/like/${post._id}`,{
        method:'PUT',
        headers:{
          "Content-Type":"application/json",
          token:accessToken
        },
        body:JSON.stringify({
          user:userId
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
          user:userId
        })
      })
      setLike(likeIcon);
      setCount(count - 1);
    }
  };
  const addComments = async() => {
    const comment = {
      postId: `${post._id}`,
      comment: `${commentWriting}`,
      profile:`${userr?.other?.profile}`,
      username:`${userr?.other?.username}`
    };
    setComments(comments.concat(comment));
    await fetch(`http://localhost:5000/api/post/comment-post`,{
        method:'PUT',
        headers:{
          "Content-Type":"application/json",
          token:accessToken
        },
        body:JSON.stringify({
          postId: `${post._id}`,
      comment: `${commentWriting}`,
      profile:`${userr?.other?.profile}`
        })
      })
      setCommentWriting("")
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
            {
              !user.profile  ?  <img src={`${profile}`} className="post-img" alt="" /> : 
              <img src={`${user.profile}`} className="post-img" alt="" />
            }
           
            <p style={{ marginLeft: "5px" ,fontWeight:"bold"}}>{user.username}</p>
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
          {
            post.image !== ""  ?
            <img src={`${post.image}`} className="post-images" alt="" />
            :
            post.video !== "" ? <video width="500" className="post-videos"  height="500" controls>
              <source src={`${post.video}`} type="video/mp4" />
            </video>  : ""
          }
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", marginLeft: "10px" }}>
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={`${like}`}
                  className="icon-post"
                  onClick={handleLike}
                  alt=""
                />
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
                <p style={{ marginLeft: "6px" }}>{comments.length} Comments</p>
              </div>
            </div>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                marginLeft: 130,
              }}
            >
              <img src={`${shareIcon}`} className="icon-post" alt="" />
              <p style={{ marginLeft: "19px" }}>Share</p>
            </div>
          </div>
          {showComments ? (
            <div style={{ padding: "10px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={`${userr?.other?.profile}`} className="comment-post-img" alt="" />
                {/* <p style={{marginLeft:"7px"}}>Shanid</p> */}
                <input
                  className="comment"
                  placeholder="Write your thought"
                  onChange={(e) => setCommentWriting(e.target.value)}
                  value={commentWriting}
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
                      src={`${cmt?.profile}`}
                      className="comment-post-img"
                      alt=""
                    />
                    <p style={{ marginLeft: "7px",fontSize:18,marginTop:6 }}>{cmt?.username}</p>
                  </div>
                  <p style={{marginTop:"-16px", marginLeft: "62px" ,textAlign:"start"}}>{cmt.comment}</p>
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

export default Post;
