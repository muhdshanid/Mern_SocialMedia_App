import React from 'react'
import './Navbar.css'
import searchIcon from '../Images/search.png'
import notification from '../Images/bell.png'
import message from '../Images/message.png'
import profileImage from '../Images/Profile.png'
const Navbar = () => {
  return (
    <div className='main-navbar'>
        <div className='logo-container'>
            <p>Social</p>
        </div>
        <div>
            <div className='search-input-container'>
                <img src={`${searchIcon}`} className='search-icon' alt="" />
                <input placeholder='search your friends' className='search-input' type="text" />
            </div>
        </div>
        <div className='icons-container'>
            <img src={`${notification}`} className='icons' alt="" />
            <img src={`${message}`} className='icons' alt="" />
            <div style={{display:"flex",alignItems:"center"}}>
                <img src={`${profileImage}`} className='profile-image' alt="" />
                <p style={{marginLeft:"5px"}}>Shanid</p>
            </div>
        </div>
    </div>
  )
}

export default Navbar