import './App.css';

import {useEffect} from 'react';
import {Toaster} from 'react-hot-toast';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/Nav';
import Assist from './pages/Assist';
import SkillBoard from './pages/SkillBoard';
import SkillTestPage from './pages/SkillTestPage';
import TestResultPage from './pages/TestResultPage';
import SkillDetailPage from './pages/SkillDetailPage';
import {Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const {authUser,checkAuth} = useAuthStore();
  
  useEffect(()=>{checkAuth()},[checkAuth])

  return (
    <>
    <Nav />
    <Routes>
      <Route path='/' element={authUser? <Home /> : <Navigate to='/login' />} />
      <Route path='/login' element={!authUser ? <Login /> : <Navigate to='/' />} />
      <Route path='/register' element={!authUser ? <Register />: <Navigate to='/' />} />
      <Route path='/assist' element={authUser ? <Assist /> : <Navigate to='/login' />} />
       <Route
          path="/skills"
          element={authUser ? <SkillBoard /> : <Navigate to="/login" />}
        />
        <Route
  path="/skill/:skillId"
  element={authUser ? <SkillDetailPage /> : <Navigate to="/login" />}
/>
        <Route
          path="/test/:skillId"
          element={authUser ? <SkillTestPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/result/:skillId"
          element={authUser ? <TestResultPage /> : <Navigate to="/login" />}
        />
    </Routes>
    <Toaster/>
    </>
  );
}

export default App;
