import React, { useState } from 'react'
import './Navbar.css'
import searchIcon from '../Images/search.png'
import notification from '../Images/bell.png'
import message from '../Images/message.png'
import profile from '../Images/Profile.png'
import { Link } from 'react-router-dom'
import {IoCloseCircleOutline} from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/userReducer'
import { useEffect } from 'react'
import axios from 'axios'
const Navbar = () => {
    const userDetails = useSelector(state => state.user)
    let user = userDetails.user
    let id = user.other._id
    const accessToken = user.token;
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    useEffect(()=>{
        const getAllUsers = async() =>{
            const {data} = await axios.get("http://localhost:5000/api/user/all-users",{
                headers:{
                    token:accessToken
                }
            })
            setUsers(data)
        }
        getAllUsers()
    },[])
    console.log(users);
  return (
    <div className='main-navbar'> 
        <div className='logo-container'>
            <Link style={{textDecoration:"none",color:"black"}} to={"/"}><p style={{fontWeight:"bold"}}>Soc<span className='part'>ial</span></p></Link>
        </div>
        <div className='search-container' style={{display:"flex",flexDirection:"column",position:'relative'}}>
            <div className='search-input-container'>
                <img src={`${searchIcon}`} className='search-icon' alt="" />
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder='search your friends' className='search-input' type="text" />
            </div>
           {
            search !== "" || open === true ? 
            <div className='search-result' style={{display:"flex",flexDirection:'column',position:"absolute",alignItems:"center",justifyContent:'center'}}>
            <span onClick={()=>([
                setOpen(false),
                setSearch("")])} style={{color:"white",height:"5px",marginLeft:"468px"}}><IoCloseCircleOutline size={20}/></span>
            <div className='users-container'>
                {
                    users?.map(user=>(
                         user.username.includes(search) && user._id !== id ?
            <Link style={{textDecoration:"none"}} to={`/profile/${user._id}`}>
            <div className='user-containerr' >
                <img className='search-image' src={`${user.profile}`} alt="" />
                <p style={{color:"black"}}>{user.username}</p>
            </div></Link> : ""
                    )) 
                }
                </div>
        </div> : ""
           }
        </div>
        <div className='icons-container'>
            <img src={`${notification}`} className='icons' style={{marginBottom:"5px"}} alt="" />
            <Link to={"/chat"}>
            <img src={`${message}`} className='icons' alt="" />
            </Link>
           <Link to={`/profile/${id}`} style={{textDecoration:"none",color:"black"}}>
           <div style={{display:"flex",alignItems:"center",marginRight:"30px"}}>
                <img src={`${user.other.profile}`} className='profile-image' alt="" />
                <p style={{marginLeft:"5px",fontWeight:"bold"}} className='part'>{user.other.username}</p>
            </div></Link>
            <div onClick={handleLogout} style={{marginRight:"10px",display:"flex",marginLeft:"0px",cursor:"pointer"}}>
                <p style={{fontWeight:"bold",color:'red'}}>Logout</p>
            </div>
        </div>
    </div>
  )
}

export default Navbar