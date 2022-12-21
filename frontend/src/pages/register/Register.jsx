import React from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
const Register = () => {
  return (
    <div className='main-container-register'>
        <div className='sub-container'>
            <div style={{flex:1,marginLeft:150}}>
                <p className='logo-text'>Soc<span className='part'>ial</span></p>
                <p className='intro-text'>Connect with your <span className='part'> family and friends </span></p>
            </div>
            <div style={{flex:3,display:"flex",flexDirection:"column"}}>
                <p className='create-account-text'>Create New Account</p>
                <input type="text" className='input-text' placeholder='Username'/>
                <input type="text" className='input-text'  placeholder='Phone number'/>
                <input type="email" className='input-text'  placeholder='Email'/>
                <input type="password" className='input-text'  placeholder='*****'/>
                <button className='signup-btn'>Signup</button>
                <Link to={"/login"}>
                <p style={{textAlign:"start",marginLeft:'30%',}}>Already have a account?</p>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Register