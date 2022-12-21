import React from "react";
import "./ProfileRightbar.css";
import ads from "../Images/ads.jpg";
import image3 from "../Images/image3.jpg";
import image4 from '../Images/image4.jpg'
import image5 from '../Images/image5.jpg'
import image6 from '../Images/image6.jpg'
import image2 from "../Images/image2.jpg";
import adsFriends from '../Images/add-user.png'
const ProfileRightbar = () => {
  return (
    <div className="profile-righbar">
      <div className="profile-right-container">
        <h3>Friend requests</h3>
        <div>
         <div>
         <div style={{display:"flex",alignItems:'center',marginLeft:10,cursor:"pointer"}}>
            <img src={`${image2}`} className='friends-image' alt="" />
            <p style={{textAlign:"start",alignItems:'center',marginLeft:"10px"}}>muhd shanid want to make you friends</p>
          </div>
          <div style={{display:"flex",justifyContent:"space-around"}}>
            <button style={{paddingLeft:"30px",paddingRight:"30px",paddingTop:5,paddingBottom:5
          ,border:"none",backgroundColor:'black',color:'white',borderRadius:"10px"}}>Accept</button>
            <button style={{paddingLeft:"30px",paddingRight:"30px",paddingTop:5,paddingBottom:5
          ,border:"none",backgroundColor:'black',color:'white',borderRadius:"10px"}}>Deny</button>
          </div>
         </div>
         <div>
         <div style={{display:"flex",alignItems:'center',marginLeft:10,cursor:"pointer"}}>
            <img src={`${image3}`} className='friends-image' alt="" />
            <p style={{textAlign:"start",alignItems:'center',marginLeft:"10px"}}>muhd shanid want to make you friends</p>
          </div>
          <div style={{display:"flex",justifyContent:"space-around"}}>
            <button style={{paddingLeft:"30px",paddingRight:"30px",paddingTop:5,paddingBottom:5
          ,border:"none",backgroundColor:'black',color:'white',borderRadius:"10px"}}>Accept</button>
            <button style={{paddingLeft:"30px",paddingRight:"30px",paddingTop:5,paddingBottom:5
          ,border:"none",backgroundColor:'black',color:'white',borderRadius:"10px"}}>Deny</button>
          </div>
         </div>
         <div>
         <div style={{display:"flex",alignItems:'center',marginLeft:10,cursor:"pointer"}}>
            <img src={`${image6}`} className='friends-image' alt="" />
            <p style={{textAlign:"start",alignItems:'center',marginLeft:"10px"}}>muhd shanid want to make you friends</p>
          </div>
          <div style={{display:"flex",justifyContent:"space-around"}}>
            <button style={{paddingLeft:"30px",paddingRight:"30px",paddingTop:5,paddingBottom:5
          ,border:"none",backgroundColor:'black',color:'white',borderRadius:"10px"}}>Accept</button>
            <button style={{paddingLeft:"30px",paddingRight:"30px",paddingTop:5,paddingBottom:5
          ,border:"none",backgroundColor:'black',color:'white',borderRadius:"10px"}}>Deny</button>
          </div>
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

export default ProfileRightbar;
