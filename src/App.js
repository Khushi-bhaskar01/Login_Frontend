import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Navigate, Route ,Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import RefreshHandler from './pages/RefreshHandler';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to="/login" />
  }
  return (
    <div className="App">
      <RefreshHandler  setIsAuthenticated={setIsAuthenticated}/>
       <Routes>
         <Route path='/' element={<Navigate to="/home" />} />
         <Route path='/home' element={<PrivateRoute element={<Home />} />} />
         <Route path='/signup' element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
         <Route path='/login' element={<Login />} />
         
       </Routes>
    </div>
  );
}

export default App;
