import React from 'react'
import { useEffect } from 'react'
import ContentPost from '../contentPostContainer/ContentPost'
import Post from '../postContainer/Post'
import axios from 'axios'
import './MainPost.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'
const MainPost = () => {
  const [posts, setPosts] = useState([])
  const userDetails = useSelector(state => state.user)
  let user = userDetails.user
  const id = user.other._id
  const accessToken = user.token
  useEffect(()=>{
    const getPosts = async() => {
      try {
        const {data} = await axios.get(`http://localhost:5000/api/user/flw/${id}`,{
          headers:{
            token:accessToken
          }
        })
        setPosts(data)
      } catch (error) {
        console.log(error.message); 
      }
    }
    getPosts()
  },[])
  return (
    <div className='mainpost-container'>
      <ContentPost/>
      {
        posts.map(post => (
          <div key={post._id}>
            <Post post={post}/>
          </div>
        
        ))
      }
    </div>
  )
}

export default MainPost