import React from "react";
import "./ProfileLeftbar.css";
import profile from "../Images/Profile.png";
import image1 from "../Images/image1.jpg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
const ProfileLeftbar = () => {
  let location = useLocation()
  let id = location.pathname.split("/")[2]
  const [followingUser, setFollowingUser] = useState([])
  const [loggedUser, setLoggedUser] = useState()
  const userDetails = useSelector(state => state.user)
  let user = userDetails.user
  const paramId = user.other._id
  console.log(user.other.following);
  const [follow, setFollow] = useState([user.other.following.includes(id) ? "Unfollow" : "Follow"])
  useEffect(()=>{
    const getUser = async () => {
      try {
        const {data} = await axios.get(`http://localhost:5000/api/user/posted-user/${id}`)
        setLoggedUser(data)
      } catch (error) {
        console.log(error.message);
      }
    }
    getUser()
  },[])
  let followers = loggedUser?.followers?.length
  let following = loggedUser?.following?.length
  useEffect(()=>{
    const fetchFollowingUsers = async () => {
      try {
        const {data} = await axios.get(`http://localhost:5000/api/user/following/${id}`)
        setFollowingUser(data)
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchFollowingUsers()
  },[])
  const accessToken = user.token
  const handleFollow = async id => {
    if(follow == "Follow"){
      await fetch(`http://localhost:5000/api/user/following/${id}`,{
          method:"PUT",
          headers:{
                  "Content-Type":"application/json",
                  token:accessToken
          },
          body:JSON.stringify({user:user.other._id})
      })
      setFollow("Unfollow")
    }else{
      await fetch(`http://localhost:5000/api/user/following/${id}`,{
        method:"PUT",
        headers:{
                "Content-Type":"application/json",
                token:accessToken
        },
        body:JSON.stringify({user:user.other._id})
    })
    setFollow("Follow")
    }
}
  return (
    <div className="profile-leftbar">
      <div className="notifications-container">
        <img src={`${profile}`} className="profile-page-cover" alt="" />
        <div style={{ display: "flex", alignItems: "center", marginTop: -30 }}>
          <img src={`${loggedUser?.profile}`} className="profile-image" alt="" />
          <div>
            <p
              style={{
                marginLeft: 6,
                marginTop: 20,
                color: "black",
                textAlign: "start",
              }}
            >
              {loggedUser?.username}
            </p>
            <p
              style={{
                marginLeft: 6,
                marginTop: -18,
                color: "black",
                textAlign: "start",
                fontSize: 11,
              }}
            >
              Software Developer
            </p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ color: "black", marginLeft: 20, fontSize: "14px" }}>
           Following
          </p>
          <p
            style={{
              color: "black",
              marginRight: 20,
              fontSize: "12px",
              marginTop: 18,
            }}
          >
            {following}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: -20,
          }}
        >
          <p style={{ color: "black", marginLeft: 20, fontSize: "14px" }}>
            Followers{" "}
          </p>
          <p
            style={{
              color: "black",
              marginRight: 20,
              fontSize: "12px",
              marginTop: 18,
            }}
          >
            {followers}
          </p>
        </div>
        <div style={{ marginTop: -20 }}>
          <h5
            style={{
              color: "black",
              fontSize: "14px",
              marginTop: 30,
              textAlign:'start',
              marginLeft:15
            }}
          >
            User bio{" "}
          </h5>
          <p
            style={{
              color: "black",
              fontSize: "12px",
              marginTop: -20,
              textAlign: "start",
              marginLeft: 15,
            }}
          >
            Lorem ipsum dolor sit amet consectetur hello adipisicing elit.
            Exercitationem, illum?
          </p>
        </div>
        {
          user.other._id !== id ? <div onClick={e=>handleFollow(loggedUser._id)}><button style={{cursor:"pointer",width:"100%",paddingTop:7,color:"white",paddingBottom:7,border:"none",backgroundColor:"green"
        }}>{follow}</button> </div> : 
        <button style={{width:"100%",paddingTop:7,color:"white",paddingBottom:7,border:"none",backgroundColor:"green"
      }}>Edit Bio</button>
        }
      </div>
      <div className="notifications-container">
        <h3>Following</h3>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:-20}}>
          <p style={{marginLeft:"10px"}}>Friends</p>
          <p style={{marginRight:"10px",color:"#aaa"}}>See all</p>
        </div>
        <div style={{display:"flex",flexWrap:'wrap',marginLeft:5}}>
          {
            followingUser.map(user => (
              <Link to={`/profile/${user._id}`} style={{textDecoration:"none",color:"black"}}>
              <div key={user._id} style={{marginLeft:4,cursor:"pointer"}}>
            <img src={`${user.profile}`} alt="" className="friend-image" />
            <p style={{marginTop:-2}}>{user.username}</p>
          </div>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ProfileLeftbar;
