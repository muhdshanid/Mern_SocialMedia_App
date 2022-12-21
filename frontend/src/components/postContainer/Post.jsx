import React from "react";
import profile from "../Images/Profile.png";
import likeIcon from "../Images/like.png";
import commentIcon from "../Images/speech-bubble.png";
import shareIcon from "../Images/share.png";
import moreOption from "../Images/more.png";
import LikedIcon from "../Images/setLike.png";
import "./Post.css";
import { useState } from "react";
const Post = () => {
  const [like, setLike] = useState(likeIcon);
  const [count, setCount] = useState(10);
  const [comments, setComments] = useState([]);
  const [commentWriting, setCommentWriting] = useState("");
  const [showComments, setShowComments] = useState(false);
  const handleLike = () => {
    if (like === likeIcon) {
      setLike(LikedIcon);
      setCount(count + 1);
    } else {
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
            <img src={`${profile}`} className="post-img" alt="" />
            <p style={{ marginLeft: "5px" }}>Shanid</p>
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
            reiciendis corporis qui veritatis...
          </p>
          <img src={`${profile}`} className="post-images" alt="" />
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
                <p style={{ marginLeft: "6px" }}>100k Comments</p>
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

export default Post;
