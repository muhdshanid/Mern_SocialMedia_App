import React, { useEffect, useState } from "react";
import "./ProfileRightbar.css";
import axios from "axios";
import Suggestion from "../rightSideContainer/Suggestion";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const ProfileRightbar = () => {
  const [users, setUsers] = useState()
  const [followers, setFollowers] = useState([])
  const userDetails = useSelector(state => state.user)
  let user = userDetails.user
  let location = useLocation()
  let id = location.pathname.split("/")[2]
  const paramId = user.other._id
    useEffect(()=>{
    const getUser = async () => {
      try {
        const {data} = await axios.get(`http://localhost:5000/api/user/suggestion-user/${paramId}`,{
        })
        setUsers(data)
      } catch (error) {
        console.log(error.message);
      }
    }
    getUser()
  },[])
  useEffect(()=>{
    const fetchFollowingUsers = async () => {
      try {
        const {data} = await axios.get(`http://localhost:5000/api/user/followers/${id}`)
        setFollowers(data)
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchFollowingUsers()
  },[])
  return (
    <div className="profile-righbar">
      <div className="profile-right-container">
        <h3>Followers</h3>
        <div>
         {
          followers.map(user => (
            <div style={{marginTop:"10px"}}>
         <div style={{display:"flex",alignItems:'center',marginLeft:10,cursor:"pointer"}}>
            <img src={`${user.profile}`} className='friends-image' alt="" />
            <p style={{textAlign:"start",alignItems:'center',marginLeft:"10px"}}>{user.username}</p>
          </div>
         </div>
          ))
         }
        </div>
      </div>
      <div className="right-container-two">
        <h3 style={{textAlign:"start",marginLeft:"10px"}}>Suggested for you</h3>
        {
          users?.map(user => (
            <Suggestion userDetails={user}/>
          ))
        } 
      </div>
    </div>
  );
};

export default ProfileRightbar;
