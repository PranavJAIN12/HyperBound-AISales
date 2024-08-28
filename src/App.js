
import './App.css';
import CallerBots from './Components/CallerBots';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
// import LoginPage from './Components/Signup';
import Signup from './Components/Signup';
import Login from './Components/Login';


function App() {
  return (
    <Router>
    <div className='container'>
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/caller' element = {<> <Navbar/><CallerBots/>  </>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>

      
      
      
    </div>
    </Router>
  );
}

export default App;
