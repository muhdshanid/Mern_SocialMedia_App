import React from "react";
import "./Rightbar.css";
import ads from "../Images/ads.jpg";
import image3 from "../Images/image3.jpg";
import image4 from '../Images/image4.jpg'
import image5 from '../Images/image5.jpg'
import image6 from '../Images/image6.jpg'
import image2 from "../Images/image2.jpg";
import adsFriends from '../Images/add-user.png'
const Rightbar = () => {
  return (
    <div className="rightbar">
      <div className="right-container">
        <div className="ads-container">
          <img src={`${ads}`} className="adsimg" alt="" />
          <div>
            <p
              style={{ textAlign: "start", marginLeft: "10px", marginTop: -20 }}
            >
              CodeDemy
            </p>
            <p
              style={{
                textAlign: "start",
                marginLeft: "10px",
                fontSize: "12px",
                marginTop: "-16px",
              }}
            >
              By codedemy course
            </p>
          </div>
        </div>
        <div className="ads-container">
          <img src={`${image3}`} className="adsimg" alt="" />
          <div>
            <p
              style={{ textAlign: "start", marginLeft: "10px", marginTop: -20 }}
            >
              CodeDemy
            </p>
            <p
              style={{
                textAlign: "start",
                marginLeft: "10px",
                fontSize: "12px",
                marginTop: "-16px",
              }}
            >
              By codedemy course
            </p>
          </div>
        </div>
      </div>
      <div className="right-container-two">
        <h3 style={{textAlign:"start",marginLeft:"10px"}}>Suggested for you</h3>
        <div style={{marginTop:"-10px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:'space-between'}}>
            <div style={{display:"flex",alignItems:"center"}}>
              <img src={`${image2}`} className="profile-image" alt="" />
              <div>
              <p style={{marginLeft:"10px",textAlign:"start"}}>Shanid</p>
              <p style={{marginLeft:"10px",textAlign:"start",marginTop:"-16px",fontSize:"11px",color:"#aaa"}}>Suggested for you</p>
              </div>
            </div>
            <div style={{backgroundColor:"#aaa",padding:"10px",marginRight:13,borderRadius:"50%",cursor:"pointer"}}>
              <img src={`${adsFriends}`} className='add-friend' alt="" />
            </div>
          </div>
        </div>
        <div style={{marginTop:"-10px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:'space-between'}}>
            <div style={{display:"flex",alignItems:"center"}}>
              <img src={`${image3}`} className="profile-image" alt="" />
              <div>
              <p style={{marginLeft:"10px",textAlign:"start"}}>Messi</p>
              <p style={{marginLeft:"10px",textAlign:"start",marginTop:"-16px",fontSize:"11px",color:"#aaa"}}>Followed by shanid</p>
              </div>
            </div>
            <div style={{backgroundColor:"#aaa",padding:"10px",marginRight:13,borderRadius:"50%",cursor:"pointer"}}>
              <img src={`${adsFriends}`} className='add-friend' alt="" />
            </div>
          </div>
        </div>
        <div style={{marginTop:"-10px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:'space-between'}}>
            <div style={{display:"flex",alignItems:"center"}}>
              <img src={`${image6}`} className="profile-image" alt="" />
              <div>
              <p style={{marginLeft:"10px",textAlign:"start"}}>Sinan</p>
              <p style={{marginLeft:"10px",textAlign:"start",marginTop:"-16px",fontSize:"11px",color:"#aaa"}}>Followed by shanid</p>
              </div>
            </div>
            <div style={{backgroundColor:"#aaa",padding:"10px",marginRight:13,borderRadius:"50%",cursor:"pointer"}}>
              <img src={`${adsFriends}`} className='add-friend' alt="" />
            </div>
          </div>
        </div>
        <div style={{marginTop:"-10px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:'space-between'}}>
            <div style={{display:"flex",alignItems:"center"}}>
              <img src={`${image5}`} className="profile-image" alt="" />
              <div>
              <p style={{marginLeft:"10px",textAlign:"start"}}>Anurag</p>
              <p style={{marginLeft:"10px",textAlign:"start",marginTop:"-16px",fontSize:"11px",color:"#aaa"}}>Followed by shanid</p>
              </div>
            </div>
            <div style={{backgroundColor:"#aaa",padding:"10px",marginRight:13,borderRadius:"50%",cursor:"pointer"}}>
              <img src={`${adsFriends}`} className='add-friend' alt="" />
            </div>
          </div>
        </div>
        <div style={{marginTop:"-10px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:'space-between'}}>
            <div style={{display:"flex",alignItems:"center"}}>
              <img src={`${image4}`} className="profile-image" alt="" />
              <div>
              <p style={{marginLeft:"10px",textAlign:"start"}}>Jasil</p>
              <p style={{marginLeft:"10px",textAlign:"start",marginTop:"-16px",fontSize:"11px",color:"#aaa"}}>Followed by shanid</p>
              </div>
            </div>
            <div style={{backgroundColor:"#aaa",padding:"10px",marginRight:13,borderRadius:"50%",cursor:"pointer"}}>
              <img src={`${adsFriends}`} className='add-friend' alt="" />
            </div>
          </div>
        </div>
        <div style={{marginTop:"-10px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:'space-between'}}>
            <div style={{display:"flex",alignItems:"center"}}>
              <img src={`${image5}`} className="profile-image" alt="" />
              <div>
              <p style={{marginLeft:"10px",textAlign:"start"}}>Sinan</p>
              <p style={{marginLeft:"10px",textAlign:"start",marginTop:"-16px",fontSize:"11px",color:"#aaa"}}>Followed by shanid</p>
              </div>
            </div>
            <div style={{backgroundColor:"#aaa",padding:"10px",marginRight:13,borderRadius:"50%",cursor:"pointer"}}>
              <img src={`${adsFriends}`} className='add-friend' alt="" />
            </div>
          </div>
        </div>
        <div style={{marginTop:"-10px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:'space-between'}}>
            <div style={{display:"flex",alignItems:"center"}}>
              <img src={`${image4}`} className="profile-image" alt="" />
              <div>
              <p style={{marginLeft:"10px",textAlign:"start"}}>Sinan</p>
              <p style={{marginLeft:"10px",textAlign:"start",marginTop:"-16px",fontSize:"11px",color:"#aaa"}}>Followed by shanid</p>
              </div>
            </div>
            <div style={{backgroundColor:"#aaa",padding:"10px",marginRight:13,borderRadius:"50%",cursor:"pointer"}}>
              <img src={`${adsFriends}`} className='add-friend' alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
