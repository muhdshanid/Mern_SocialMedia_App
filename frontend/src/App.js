import './App.css';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom'
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { useSelector } from 'react-redux';
import {Toaster} from 'react-hot-toast'
import ForgotPassword from './pages/forgotpassword/ForgotPassword';
import VerifyEmail from './pages/verifyemail/VerifyEmail';
import ResetPassword from './pages/resetpassword/ResetPassword';
import Chat from './pages/chat/Chat';
function App() {
  const userDetails = useSelector(state => state.user)
  let user = userDetails?.user
  console.log(user);
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={user?.other?.verified === true ? <Home/> : <Navigate to={"/login"} replace={true}/>}/>
        <Route path='/login' element={ user?.other?.verified === true ?  <Navigate to={"/"} replace={true}/> : <Login/> }/>
        <Route path='/register' element={ <Register/>}/>
        <Route path='/chat' element={ <Chat/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/verify-email' element={user?.status === "Pending" ? <VerifyEmail/> : <Navigate to={"/"} replace={true}/>}/>
      </Routes>
      </BrowserRouter>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  );
}

export default App;
