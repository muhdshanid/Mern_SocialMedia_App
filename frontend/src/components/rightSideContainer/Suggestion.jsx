import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import adsFriends from '../Images/add-user.png'
import userToFollow from '../Images/afterFollowImg.png'
const Suggestion = ({userDetails}) => {
  const userDetail = useSelector(state => state.user)
  let user = userDetail.user
  const userId = user.other._id
    const [follow, setFollow] = useState(adsFriends)
    const accessToken = user.token
    const handleFollow = async id => {
        await fetch(`http://localhost:5000/api/user/following/${id}`,{
            method:"PUT",
            headers:{
                    "Content-Type":"application/json",
                    token:accessToken
            },
            body:JSON.stringify({user:userId})
        })
        setFollow(userToFollow)
    }
  return (
    <div style={{marginTop:"-10px"}} id={userDetails._id}>
          <div style={{display:"flex",alignItems:"center",justifyContent:'space-between'}}>
            <Link to={`/profile/${userDetails._id}`} style={{textDecoration:"none",color:"black"}}>
            <div style={{display:"flex",alignItems:"center",cursor:"pointer"}}>
              <img src={`${userDetails.profile}`} className="profile-image" alt="profile" />
              <div>
              <p style={{marginLeft:"10px",textAlign:"start"}}>{userDetails.username}</p>
              <p style={{marginLeft:"10px",textAlign:"start",marginTop:"-16px",fontSize:"11px",color:"#aaa"}}>Suggested for you</p>
              </div>
            </div>
            </Link>
            <div onClick={e => handleFollow(userDetails._id)} style={{backgroundColor:"#aaa",padding:"10px",marginRight:13,borderRadius:"50%",cursor:"pointer"}}>
              <img src={`${follow}`} className='add-friend' alt="" />
            </div>
          </div>
        </div> 
  )
} 

export default Suggestion