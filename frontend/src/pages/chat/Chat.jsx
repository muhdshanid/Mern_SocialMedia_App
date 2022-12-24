import React from 'react'
import ChatContainer from '../../components/chatContainer/ChatContainer'
import Contact from '../../components/contact/Contact'
import Navbar from '../../components/navbar/Navbar'

const Chat = () => {
  return (
    <div>
        <Navbar/>
        <div style={{display:"flex"}}>
        <Contact/>
        </div>
    </div>
  )
}

export default Chat