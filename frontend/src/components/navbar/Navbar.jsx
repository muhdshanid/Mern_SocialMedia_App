import React from 'react'
import './Navbar.css'
import searchIcon from '../Images/search.png'
import notification from '../Images/bell.png'
import message from '../Images/message.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/userReducer'
const Navbar = () => {
    const userDetails = useSelector(state => state.user)
    let user = userDetails.user
    let id = user.other._id
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
  return (
    <div className='main-navbar'>
        <div className='logo-container'>
            <Link style={{textDecoration:"none",color:"black"}} to={"/"}><p>Social</p></Link>
        </div>
        <div>
            <div className='search-input-container'>
                <img src={`${searchIcon}`} className='search-icon' alt="" />
                <input placeholder='search your friends' className='search-input' type="text" />
            </div>
        </div>
        <div className='icons-container'>
            <img src={`${notification}`} className='icons' alt="" />
            <Link to={"/chat"}>
            <img src={`${message}`} className='icons' alt="" />
            </Link>
           <Link to={`/profile/${id}`} style={{textDecoration:"none",color:"black"}}>
           <div style={{display:"flex",alignItems:"center"}}>
                <img src={`${user.other.profile}`} className='profile-image' alt="" />
                <p style={{marginLeft:"5px"}}>{user.other.username}</p>
            </div></Link>
            <div onClick={handleLogout} style={{marginRight:"10px",marginLeft:"20px",cursor:"pointer"}}>
                <p>Logout</p>
            </div>
        </div>
    </div>
  )
}

export default Navbar