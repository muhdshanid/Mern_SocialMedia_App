import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const location = useLocation()
    const code = location.search.split("?")[1]
    const notifySuccess = msg => toast.success(msg)
    const notifyError = msg => toast.error(msg)
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleClick = async(e) =>{
        e.preventDefault()
        if(!password){
            notifyError("Enter new password")
            return
        }
        if(password.length < 6 && password.length > 1){
            notifyError("Password must have 6 characters")
            return
          }
        await fetch(`http://localhost:5000/api/user/reset-password/?${code}`,{
            method:'PUT',
            headers:{
                "Content-Type": "application/json",
        },
        body:JSON.stringify({password})
        }).then((res) => {
            console.log(res);
            notifySuccess("Password changed")
            navigate("/login")
        }).catch(err => {
            notifyError("Failed to change password")
        })
    }
   return (
    <div style={{width:"100vw" , height:"100vh", display:'flex' , alignItems:"center" , justifyContent:"center"}}>
            <div style={{width:"25%" , padding:"20px" , margin:"auto" , borderRadius:"10px" , backgroundColor:"black"}}>
                <p style={{color:"white"}}>Enter Your New Password</p>
                <form style={{display:"flex" , flexDirection:"column"}}>
                    <input type={"password"} placeholder="**********" style={{flex:1 , minWidth:"40px" , margin:"10px 0px" , padding:"10px", borderRadius:"10px"}} onChange={(e)=>setPassword(e.target.value)}/>
                    <button style={{width:"40%" , border:"none" , padding:"10px 20px" , backgroundColor:"white" , color:"black" , borderRadius:"10px" , margin:"20px 0px" , cursor:"pointer"}} onClick={handleClick}>Set Password</button>
         
                </form>
            </div>
        </div>
  ) 
}

export default ResetPassword