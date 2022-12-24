import React, { useEffect, useState } from "react";
import "./Leftbar.css";
import profile from "../Images/Profile.png";
import image1 from "../Images/image1.jpg";
import image2 from "../Images/image2.jpg";
import image3 from "../Images/image3.jpg";
import image4 from "../Images/image4.jpg";
import image5 from "../Images/image5.jpg";
import image6 from "../Images/image6.jpg";
import axios from "axios";
import { useSelector } from "react-redux";
const Leftbar = () => {
  const [posts, setPosts] = useState([]);
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  const id = user.other._id;
  const accessToken = user.token;
  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/user/flw/${id}`,
          {
            headers: {
              token: accessToken,
            },
          }
        );
        setPosts(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPosts();
  }, []);
  return (
    <div className="leftbar">
      <div className="notifications-container">
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <p style={{ marginLeft: "-10px" }}>Notifications</p>
          <p style={{ color: "#aaa", marginLeft: "20px" }}>See all</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: -13 }}>
          <img src={`${profile}`} className="noti-img" alt="" />
          <p
            style={{
              marginLeft: "5px",
              color: "#aaa",
              fontSize: 13,
              textAlign: "start",
              width: "120px",
            }}
          >
            Shanid liked your post
          </p>
          <img src={`${image1}`} className="like-image" alt="" />
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: -13 }}>
          <img src={`${profile}`} className="noti-img" alt="" />
          <p
            style={{
              marginLeft: "5px",
              color: "#aaa",
              fontSize: 13,
              textAlign: "start",
              width: "120px",
            }}
          >
            Shanid started to following you
          </p>
          <img src={`${image2}`} className="followinguser-image" alt="" />
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: -13 }}>
          <img src={`${profile}`} className="noti-img" alt="" />
          <p
            style={{
              marginLeft: "5px",
              color: "#aaa",
              fontSize: 13,
              textAlign: "start",
              width: "120px",
            }}
          >
            Shanid liked your post
          </p>
          <img src={`${image3}`} className="like-image" alt="" />
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: -13 }}>
          <img src={`${image3}`} className="noti-img" alt="" />
          <p
            style={{
              marginLeft: "5px",
              color: "#aaa",
              fontSize: 13,
              textAlign: "start",
              width: "120px",
            }}
          >
            Shanid started to following you
          </p>
          <img src={`${image4}`} className="followinguser-image" alt="" />
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: -13 }}>
          <img src={`${profile}`} className="noti-img" alt="" />
          <p
            style={{
              marginLeft: "5px",
              color: "#aaa",
              fontSize: 13,
              textAlign: "start",
              width: "120px",
            }}
          >
            Shanid started to following you
          </p>
          <img src={`${image5}`} className="followinguser-image" alt="" />
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: -13 }}>
          <img src={`${image3}`} className="noti-img" alt="" />
          <p
            style={{
              marginLeft: "5px",
              color: "#aaa",
              fontSize: 13,
              textAlign: "start",
              width: "120px",
            }}
          >
            Shanid liked your post
          </p>
          <img src={`${image6}`} className="like-image" alt="" />
        </div>
      </div>
      <div className="notifications-container">
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <p style={{ marginLeft: "-20px" }}>Explore</p>
          <p style={{ color: "#aaa", marginLeft: "40px" }}>See all</p>
        </div>
        <div>
          {posts?.map((post) => (
            post.image === "" ? ""  :
              <img key={post._id} src={`${post.image}`} className="explore-image" alt="" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
