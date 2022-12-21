import './App.css';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './pages/login/Login';
import Register from './pages/register/Register';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
