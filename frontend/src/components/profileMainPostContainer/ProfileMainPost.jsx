import React from 'react'
import ContentPost from '../contentPostContainer/ContentPost'
import ProfilePost from './ProfilePost'
import './ProfileMainPost.css'
import profile from '../Images/Profile.png'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
const ProfileMainPost = () => {
  let location = useLocation()
  const userDetails = useSelector(state => state.user)
  let user = userDetails.user
  let id = location.pathname.split("/")[2]
  const [userPosts, setUserPosts] = useState([])
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const {data} = await axios.get(`http://localhost:5000/api/post/get-post/${id}`)
        setUserPosts(data)
      } catch (error) {
        console.log(error.message);
      } 
    }
    fetchUserPosts()
  },[id])
  return (
    <div className='profile-mainpost-container'>
      <div>
        <img src={`${profile}`} className='profile-cover-image' alt="" />
        <h2 style={{marginTop:-43,color:"white",textAlign:"start"
      ,marginLeft:"35px"}}>Your Profile</h2>
      </div>
      <ContentPost/>
      {
        userPosts?.map(post => (
          <ProfilePost post={post}/>
        ))
      }
    </div>
  )
}

export default ProfileMainPost