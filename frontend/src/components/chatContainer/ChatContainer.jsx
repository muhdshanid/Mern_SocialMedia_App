import React, { useEffect, useRef, useState } from "react";
import "./ChatContainer.css";
import axios from "axios";
import {io} from 'socket.io-client'
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
const ChatContainer = ({ currentChatUser }) => {
    const [inputMessage, setInputMessage] = useState()
  const [messages, setMessages] = useState();
  const socket = useRef()
  const userDetails = useSelector((state) => state.user);
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const notifyError = msg => toast.error(msg)
  let user = userDetails.user;
  let id = user.other._id;
  const accessToken = user.token; 
  const scrollRef = useRef()
  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/message/get-message/${id}/${currentChatUser._id}`
        );
        setMessages(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMessages();
  }, [currentChatUser._id]);
  useEffect(()=>{
    if(currentChatUser !== null){
      socket.current = io("http://localhost:5000");
      socket.current.emit("addUser",id)
    }
  },[id])
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])
  const handleSend  = async() => {
    if(!inputMessage){
        notifyError("Write something")
        return
    }
    const message ={
        myself:true,
        message:inputMessage
    }
    socket.current.emit("sendMsg",{
      to:currentChatUser._id,
      from:id,
      message:inputMessage
    })
   await fetch(`http://localhost:5000/api/message/new`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        token:accessToken
    },
    body:JSON.stringify({
        message:inputMessage,
        from:id,
        to:currentChatUser._id
    })
   })
   setMessages(messages.concat(message))
   setInputMessage("")
  }
  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-receive",(msg)=>{
        console.log(msg);
        setArrivalMessage({myself:false,message:msg})
      })
    }
  },[arrivalMessage])
  useEffect(()=>{
    arrivalMessage && setMessages((pre)=>[...pre,arrivalMessage])
  },[arrivalMessage])
  return (
    <div className="main-chat-container">
      <div>
        <div
          style={{
            display: "flex",
            marginLeft: "30px",
            backgroundColor: "rgb(241 243 241)",
            width: "55pc",
            padding: "5px",
            marginTop: "10px",
            borderRadius: "10px",
          }}
        >
          <img
            className="user-profile"
            src={`${currentChatUser?.profile}`}
            alt=""
          />
          <p style={{ marginTop: "10px", marginLeft: "10px" }}>
            {currentChatUser?.username}
          </p>
        </div>
        <div className="msg-container">
          {messages?.map((msg) => (
            <div ref={scrollRef} >
              {msg.myself === false ? (
                <div className="message">
                  <img
                    src={`${currentChatUser?.profile}`}
                    className="chat-profile"
                    alt=""
                  />
                  <p style={{ textAlign: "start", marginLeft: "10px" }}>
                    {" "}
                    {msg?.message}
                  </p>
                </div>
              ) : (
                <div className="message-sender">
                  <p style={{ textAlign: "start", marginLeft: "10px" }}>
                    {" "}
                    {msg?.message}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="msg-sender-container">
          <input
          value={inputMessage}
          onChange={e=>setInputMessage(e.target.value)}
            className="msg-input"
            type="text"
            placeholder="Write your message"
          />
          <button onClick={handleSend} className="send-btn">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
