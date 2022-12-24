import React from 'react'
import { useSelector } from 'react-redux'
import Leftbar from '../../components/leftSideContainer/Leftbar'
import MainPost from '../../components/mainPostContainer/MainPost'
import Navbar from '../../components/navbar/Navbar'
import Rightbar from '../../components/rightSideContainer/Rightbar'
import "./Home.css"
const Home = () => {
  const userDetails = useSelector(state => state.user)
  let user = userDetails.user
  return (
    <div className='home'>
      <Navbar/>
      <div className='component-container'>
        <Leftbar/>
        <MainPost/>
        <Rightbar/>
      </div>
    </div>
  )
}

export default Home