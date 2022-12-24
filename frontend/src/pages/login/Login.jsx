import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../redux/api'
import { toast } from 'react-hot-toast'
const Login = () => {
  const dispatch = useDispatch()
  const {isFetching,error} = useSelector(state => state)
  const [email, setEmail] = useState("")
  const user = useSelector(state => state.user)
  const [password, setPassword] = useState("")
  const notifySuccess = msg => toast.success(msg)
  const notifyError = msg => toast.error(msg)
  const handleLogin = e => {
    e.preventDefault()
    if(!email || !password){
      notifyError("Please add all fields")
      return
    }
    if(password.length < 6 && password.length > 1){
      notifyError("Password must have 6 characters")
      return
    }
    login(dispatch,{email,password})
  }
    return (
    <div className='main-container-register'>
        <div className='sub-container'>
            <div style={{flex:1,marginLeft:150}}>
                <p className='logo-text'>Soc<span className='part'>ial</span></p>
                <p className='intro-text'>Connect with your <span className='part'> family and friends </span></p>
            </div>
            <div style={{flex:3,display:"flex",flexDirection:"column"}}>
                <p className='create-account-text'>Login Account</p>
                <input value={email} id="email" onChange={(e)=>setEmail(e.target.value)} type="email" className='input-text'  placeholder='Email'/>
                <input value={password} id='password' onChange={(e)=>setPassword(e.target.value)}  type="password" className='input-text'  placeholder='*****'/>
                <button onClick={handleLogin} className='signup-btn'>Login </button>
                <Link to={"/forgot-password"}>
                <p style={{textAlign:"start",marginLeft:'30%',}}>Forgot password?</p>
                </Link>
                <Link to={"/register"}>
                <p style={{textAlign:"start",marginLeft:'30%',marginTop:-10}}>Create new account?</p>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Login