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
import AdminSkillBoard from './pages/AdminSkillBoard';
import AddSkill from './pages/AddSkill';
import EditSkill from './pages/EditSkill';
import AttemptPage from './pages/AttemptPage';  
import AdminDashboard from './pages/AdminDashboard';
import UserDetails from './pages/UserDetails';
import RegisteredUsers from './pages/RegisteredUsers';
import GeneratedQuestionsPage from './pages/GeneratedQuestionsPage';

import {Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import AdminContact from './pages/AdminContact';
import Profile from './pages/Profile';

function App() {
  const {authUser,checkAuth,isAdmin} = useAuthStore();
  
  useEffect(()=>{checkAuth()},[checkAuth])

  return (
    <>
    <Nav />
    <Routes>
      <Route path='/' element={authUser? <Home /> : <Navigate to='/login' />} />
      <Route path='/login' element={!authUser ? <Login /> : <Navigate to='/' />} />
      <Route path='/register' element={!authUser ? <Register />: <Navigate to='/' />} />
      <Route path='/assist' element={authUser ? <Assist /> : <Navigate to='/login' />} />
      <Route path="/skills" element={authUser ? <SkillBoard /> : <Navigate to="/login" />}/>
      <Route path="/request" element={authUser ? <AdminContact /> : <Navigate to="/login" />} />
      <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />

      <Route path="/skill/:skillId" element={authUser ? <SkillDetailPage /> : <Navigate to="/login" />} />
      <Route path="/test/:skillId" element={authUser ? <SkillTestPage /> : <Navigate to="/login" />} />
      <Route path="/result/:skillId" element={authUser ? <TestResultPage /> : <Navigate to="/login" />} />
      <Route path="/attempt/:attemptId" element={authUser ? <AttemptPage /> : <Navigate to="/login" />} />
      
      <Route path="/admin/dashboard" element={authUser  && isAdmin() ? <AdminDashboard/> : <Navigate to="/login" />} />
      <Route path="/admin/users" element={authUser  && isAdmin() ? <RegisteredUsers/> : <Navigate to="/login" />} />
      <Route path="/admin/user/:userId" element={authUser  && isAdmin() ? <UserDetails/> : <Navigate to="/login" />} />
      
      <Route path="/admin/skills" element={authUser  && isAdmin() ? <AdminSkillBoard/> : <Navigate to="/login" />} />
      <Route path="/admin/addSkill" element={authUser && isAdmin() ? <AddSkill /> : <Navigate to="/login" />} />
      <Route path="/admin/editSkill/:skillId" element={authUser && isAdmin() ? <EditSkill /> : <Navigate to="/login" />} />
      <Route path="/admin/generatedQuestions/:skillId" element={authUser  && isAdmin() ? <GeneratedQuestionsPage/> : <Navigate to="/login" />} />
    </Routes>
    <Toaster/>
    </>
  );
}

export default App;
