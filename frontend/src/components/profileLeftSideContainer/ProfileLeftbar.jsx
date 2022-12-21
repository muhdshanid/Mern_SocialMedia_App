import React from "react";
import "./ProfileLeftbar.css";
import profile from "../Images/Profile.png";
import image1 from "../Images/image1.jpg";
import image2 from "../Images/image2.jpg";
import image3 from "../Images/image3.jpg";
import image4 from "../Images/image4.jpg";
import image5 from "../Images/image5.jpg";
import image6 from "../Images/image6.jpg";
const ProfileLeftbar = () => {
  return (
    <div className="profile-leftbar">
      <div className="notifications-container">
        <img src={`${profile}`} className="profile-page-cover" alt="" />
        <div style={{ display: "flex", alignItems: "center", marginTop: -30 }}>
          <img src={`${image1}`} className="profile-image" alt="" />
          <div>
            <p
              style={{
                marginLeft: 6,
                marginTop: 20,
                color: "black",
                textAlign: "start",
              }}
            >
              Shanid
            </p>
            <p
              style={{
                marginLeft: 6,
                marginTop: -18,
                color: "black",
                textAlign: "start",
                fontSize: 11,
              }}
            >
              Software Developer
            </p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ color: "black", marginLeft: 20, fontSize: "14px" }}>
            Profile Views
          </p>
          <p
            style={{
              color: "black",
              marginRight: 20,
              fontSize: "12px",
              marginTop: 18,
            }}
          >
            43242
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: -20,
          }}
        >
          <p style={{ color: "black", marginLeft: 20, fontSize: "14px" }}>
            Friends{" "}
          </p>
          <p
            style={{
              color: "black",
              marginRight: 20,
              fontSize: "12px",
              marginTop: 18,
            }}
          >
            43242
          </p>
        </div>
        <div style={{ marginTop: -20 }}>
          <h5
            style={{
              color: "black",
              fontSize: "14px",
              marginTop: 30,
              textAlign:'start',
              marginLeft:15
            }}
          >
            User bio{" "}
          </h5>
          <p
            style={{
              color: "black",
              fontSize: "12px",
              marginTop: -20,
              textAlign: "start",
              marginLeft: 15,
            }}
          >
            Lorem ipsum dolor sit amet consectetur hello adipisicing elit.
            Exercitationem, illum?
          </p>
        </div>
        <button style={{width:"100%",paddingTop:7,color:"white",paddingBottom:7,border:"none",backgroundColor:"green"
      }}>Edit Bio</button>
      </div>
      <div className="notifications-container">
        <h3>Your Friends</h3>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:-20}}>
          <p style={{marginLeft:"10px"}}>Friends</p>
          <p style={{marginRight:"10px",color:"#aaa"}}>See all</p>
        </div>
        <div style={{display:"flex",flexWrap:'wrap',marginLeft:5}}>
          <div style={{marginLeft:4}}>
            <img src={`${image1}`} alt="" className="friend-image" />
            <p style={{marginTop:-2}}>Sinan</p>
          </div>
          <div  style={{marginLeft:4}}>
            <img src={`${image2}`} alt="" className="friend-image" />
            <p style={{marginTop:-2}}>Jasil</p>
          </div>
          <div  style={{marginLeft:4}}>
            <img src={`${image3}`} alt="" className="friend-image" />
            <p style={{marginTop:-2}}>Anjoom</p>
          </div>
          <div  style={{marginLeft:4}}>
            <img src={`${image5}`} alt="" className="friend-image" />
            <p style={{marginTop:-2}}>Jasil</p>
          </div>
          <div  style={{marginLeft:4}}>
            <img src={`${image6}`} alt="" className="friend-image" />
            <p style={{marginTop:-2}}>Anjoom</p>
          </div>
          <div  style={{marginLeft:4}}>
            <img src={`${image4}`} alt="" className="friend-image" />
            <p style={{marginTop:-2}}>Anurag</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLeftbar;
