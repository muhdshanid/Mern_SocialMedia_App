import React from 'react'
import MainPost from '../../components/mainPostContainer/MainPost'
import Navbar from '../../components/navbar/Navbar'
import ProfileLeftbar from '../../components/profileLeftSideContainer/ProfileLeftbar'
import ProfileMainPost from '../../components/profileMainPostContainer/ProfileMainPost'
import ProfileRightbar from '../../components/profileRightSideContainer/ProfileRightbar'
import './Profile.css'
const Profile = () => {
  return (
    <div className='profile-container'>
        <Navbar/>
        <div className='sub-profile-container'>
            <ProfileLeftbar/>
            <ProfileMainPost/>
            <ProfileRightbar/>
        </div>
    </div>
  )
}

export default Profile