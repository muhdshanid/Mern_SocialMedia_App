import React, { useEffect } from "react";
import "./Rightbar.css";
import ads from "../Images/ads.jpg";
import image3 from "../Images/image3.jpg";
import axios from "axios";
import { useState } from "react";
import Suggestion from "./Suggestion";
import { useSelector } from "react-redux";
const Rightbar = () => {
  const [users, setUsers] = useState()
  const userDetails = useSelector(state => state.user)
  let user = userDetails.user
  const id = user.other._id
  useEffect(()=>{
    const getUser = async () => {
      try {
        const {data} = await axios.get(`http://localhost:5000/api/user/suggestion-user/${id}`,{
        })
        setUsers(data)
      } catch (error) {
        console.log(error.message);
      }
    } 
    getUser()
  },[])
  return (
    <div className="rightbar">
      <div className="right-container">
        <div className="ads-container">
          <img src={`${ads}`} className="adsimg" alt="" />
          <div>
            <p
              style={{ textAlign: "start", marginLeft: "10px", marginTop: -20 }}
            >
              CodeDemy
            </p>
            <p
              style={{
                textAlign: "start",
                marginLeft: "10px",
                fontSize: "12px",
                marginTop: "-16px",
              }}
            >
              By codedemy course
            </p>
          </div>
        </div>
        <div className="ads-container">
          <img src={`${image3}`} className="adsimg" alt="" />
          <div>
            <p
              style={{ textAlign: "start", marginLeft: "10px", marginTop: -20 }}
            >
              CodeDemy
            </p>
            <p
              style={{
                textAlign: "start",
                marginLeft: "10px",
                fontSize: "12px",
                marginTop: "-16px",
              }}
            >
              By codedemy course
            </p>
          </div>
        </div>
      </div>
      <div className="right-container-two">
        <h3 style={{textAlign:"start",marginLeft:"10px"}}>Suggested for you</h3>
        {
          users?.map(user => (
            <div key={user._id}>
              <Suggestion userDetails={user} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Rightbar;
