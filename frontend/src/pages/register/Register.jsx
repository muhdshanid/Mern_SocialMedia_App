import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import './Register.css'
import { signup } from '../../redux/api'
import { toast } from 'react-hot-toast';
import imageIcon from '../../components/Images/add-user.png'
const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isFetching,error} = useSelector(state => state)
  const user = useSelector(state => state.user)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [percentage, setPercentage] = useState(0)
  const [password, setPassword] = useState("")
  const [phonenumber, setphonenumber] = useState('')
  const [username, setUseraname] = useState("")
  const [file, setFile] = useState(null)
  const notifySuccess = msg => toast.success(msg)
  const notifyError = msg => toast.error(msg)
  const userDetails = user.user
  const handleClick = e => {
    e.preventDefault()
    if(!username || !email || !password || !phonenumber){
      notifyError("Please add all fields")
      return
    }
    if(phonenumber.length !== 10){
      notifyError("Invalid phonenumber")
    }
    if(password.length < 6){
      notifyError("Password must have  6 characters")
    }
    if (file !== null) {
      const fileName = new Date().getTime() + file?.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
          if(progress !== 100){
            setLoading(true)
            let roundedPercentage = Math.round(progress).toFixed(2)
            setPercentage(roundedPercentage + "%")
          }
        },
        (error) => {
         notifyError("Something went wrong")
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            signup(dispatch,{email,password,phonenumber,username,profile:downloadURL})
            setLoading(false)
          });
        }
      );
    }else{
      notifyError("Please add profile image")
    }
  }
  if(userDetails?.status === "Pending"){
    navigate("/verify-email")
  }
  return (
    <div className='main-container-register'>
        <div className='sub-container'>
            <div style={{flex:1,marginLeft:150}}>
                <p className='logo-text'>Soc<span className='part'>ial</span></p>
                <p className='intro-text'>Connect with your <span className='part'> family and friends </span></p>
            </div>
            <div style={{flex:3,display:"flex",flexDirection:"column"}}>
                <p className='create-account-text'>Create New Account</p>
                <label htmlFor="file">Add Profile
            <img className="icons" src={`${imageIcon}`} alt="" />
                <input
              type="file"
              style={{display:"none"}}
              name="file"
              id="file"
              className='input-text'
              onChange={(e) => setFile(e.target.files[0])}
            />
            </label>
                <input value={username} onChange={e => setUseraname(e.target.value)} type="text" className='input-text' placeholder='Username'/>
                <input value={phonenumber} onChange={e => setphonenumber(e.target.value)} type="text" className='input-text'  placeholder='Phone number'/>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" className='input-text'  placeholder='Email'/>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className='input-text'  placeholder='*****'/>
                <button onClick={handleClick} className='signup-btn'>{loading ? "Loading..." : "Signup"}</button>
                <Link to={"/login"}>
                <p style={{textAlign:"start",marginLeft:'30%',}}>Already have a account?</p>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Register