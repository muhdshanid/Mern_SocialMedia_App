import React from 'react'
import './ContentPost.css'
import profile from '../Images/Profile.png'
import imageIcon  from '../Images/gallery.png'
import emojiIcon  from '../Images/cat-face.png'
import videoIcon  from '../Images/video.png'
const ContentPost = () => {
  return (
    <div>
      <div className="content-upload-container">
        <div style={{display:"flex",alignItems:"center",padding:10}}>
          <img src={`${profile}`} className='profile-image' alt="" />
          <input placeholder='Write your real thought' type="text" className='content-input'/>
        </div>
        <div style={{display:"flex",marginLeft:"10px",alignItems:'center',marginTop:25}}>
          <img className='icons' src={`${imageIcon}`} alt="" />
          <img className='icons' src={`${emojiIcon}`} alt="" />
          <img className='icons' src={`${videoIcon}`} alt="" />
          </div>
          <div style={{marginTop:-43,display:"flex",justifyContent:'end'}}>
          <button className='post-btn'>Post</button>
        </div>
      </div>
    </div>
  )
}

export default ContentPost