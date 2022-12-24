import React from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const notifySuccess = msg => toast.success(msg)
    const [isVerified, setIsVerified] = useState(false)
    const [url, setUrl] = useState("")
  const notifyError = msg => toast.error(msg)
  const navigate = useNavigate()
    const handleClick = async (e) =>{
        e.preventDefault()
        if(!email){
            notifyError("Enter email")
            return
        }
        await fetch("http://localhost:5000/api/user/forgot-password",{
            method:"POST",
            headers:{
                    "Content-Type": "application/json",
            },
            body:JSON.stringify({email})
        }).then(()=>{
            notifySuccess("Email verified ")
            setIsVerified(true)
            setEmail("")
    }).catch(err => notifyError("Something went wrong"))
}

    return (
       !isVerified ?  <div style={{width:"100vw" , height:"100vh", display:'flex' , alignItems:"center" , justifyContent:"center"}}>
       <div style={{width:"25%" , padding:"20px" , margin:"auto" , borderRadius:"10px" , backgroundColor:"black"}}>
           <p style={{color:"white"}}>Enter your Email</p>
           <form style={{display:"flex" , flexDirection:"column"}}>
               <input type={"text"} placeholder="Email" style={{flex:1 , minWidth:"40px" , margin:"10px 0px" , padding:"10px", borderRadius:"10px"}} onChange={(e)=>setEmail(e.target.value)} />
               <button style={{width:"40%" , border:"none" , padding:"10px 20px" , backgroundColor:"white" , color:"black" , borderRadius:"10px" , margin:"20px 0px" , cursor:"pointer"}} onClick={handleClick}>Send</button>
    
           </form>
       </div>
   </div> :
   <div style={{width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
    <h2>URL has sended to your email,Check email and Go to the URL</h2>
   </div>
      )
    }


export default ForgotPassword