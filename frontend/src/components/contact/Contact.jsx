import React, { useState } from "react";
import "./Contact.css";
import ChatContainer from "../chatContainer/ChatContainer";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const Contact = () => {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let id = user.other._id;
  const accessToken = user.token;
  const [users, setUsers] = useState();
  const [search, setSearch] = useState(null)
  const [currentChatUser, setCurrentChatUser] = useState(null)
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/user/following/${id}`,
          {
            headers: {
              token: accessToken,
            },
          }
        );
        setUsers(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, []);
  const handleClick  = (user) => {
    setCurrentChatUser(user)
  }
  return (
    <div className="main-contact-container">
      <div>
        <div style={{ width: "20pc", padding: "10px" }}>
          <input
            className="search-bar"
            type="search"
            placeholder="Search your friends"
            onChange={e=>setSearch(e.target.value)}
          />
        </div>
        {
          search !== null ? <div className="user-details-container">

          {  users?.map((user) => (
            user.username.includes(search) &&
            <div  key={user?._id} >
              {user?._id !== id ? (
                <div onClick={()=>handleClick(user)}className="user-container">
                  <img src={`${user?.profile}`} className="chat-image" alt="dp" />
                  <div style={{ marginLeft: "10px" }}>
                    <p
                      style={{
                        color: "black",
                        textAlign: "start",
                        marginTop: "5px",
                        fontSize: "15px",
                      }}
                    >
                      {user?.username}
                    </p>
                    <p
                      style={{
                        color: "black",
                        textAlign: "start",
                        marginTop: "-16px",
                        fontSize: "14px",
                      }}
                    >
                      Open your message
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div> :
        <div className="user-details-container">
          {users?.map((user) => (
            <div  key={user?._id} >
              {user?._id !== id ? (
                <div onClick={()=>handleClick(user)}className="user-container">
                  <img src={`${user?.profile}`} className="chat-image" alt="dp" />
                  <div style={{ marginLeft: "10px" }}>
                    <p
                      style={{
                        color: "black",
                        textAlign: "start",
                        marginTop: "5px",
                        fontSize: "15px",
                      }}
                    >
                      {user?.username}
                    </p>
                    <p
                      style={{
                        color: "black",
                        textAlign: "start",
                        marginTop: "-16px",
                        fontSize: "14px",
                      }}
                    >
                      Open your message
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
        }
        
      </div>
      {
        currentChatUser !== null ? <ChatContainer currentChatUser={currentChatUser}/>
        : <div style={{width:"700px",marginTop:"170px",marginLeft:"100px",fontSize:"30px",color:"#876b70"}}>
          <p>Oper Your Message Tab to Chat with your Friend</p>
        </div>
      }
      
    </div>
  );
};

export default Contact;
