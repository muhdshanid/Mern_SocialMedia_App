import React from 'react'
import ContentPost from '../contentPostContainer/ContentPost'
import Post from '../postContainer/Post'
import './ProfileMainPost.css'
import profile from '../Images/Profile.png'
const ProfileMainPost = () => {
  return (
    <div className='profile-mainpost-container'>
      <div>
        <img src={`${profile}`} className='profile-cover-image' alt="" />
        <h2 style={{marginTop:-43,color:"white",textAlign:"start"
      ,marginLeft:"35px"}}>Your Profile</h2>
      </div>
      <ContentPost/>
      <Post/>
      <Post/>
      <Post/>
    </div>
  )
}

export default ProfileMainPost