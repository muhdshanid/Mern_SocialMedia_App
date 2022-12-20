import React from 'react'
import ContentPost from '../contentPostContainer/ContentPost'
import Post from '../postContainer/Post'
import './MainPost.css'
const MainPost = () => {
  return (
    <div className='mainpost-container'>
      <ContentPost/>
      <Post/>
    </div>
  )
}

export default MainPost