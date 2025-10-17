import React ,{ useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login} = useAuthStore();

  const validateForm = () => {
    if (!email.trim()) return toast.error("Email is required");
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) return toast.error("Enter a valid email");
    if (!password.trim()) return toast.error("Password is required");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if(validateForm()){
        login({email,password});
    }
    setEmail('');
    setPassword('');
  }

  return (
    <div>
      <h1>Login Page</h1>
      <form className='form-group' onSubmit={(e)=>{submitHandler(e)}}>
        <input 
        className='form-control'
        type="text" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter User Email Address'/>
        <input 
        className='form-control' 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Enter Password'/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
