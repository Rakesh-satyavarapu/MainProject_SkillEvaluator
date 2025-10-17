import React,{useState} from 'react'
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signUp} = useAuthStore();
    
    const validateForm = () => {
    if (!email.trim()) return toast.error("Email is required");
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) return toast.error("Enter a valid email");
    if (!password.trim()) return toast.error("Password is required");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };
    
    const submitHandler = async(e) => {
      e.preventDefault();
      if(validateForm()){
          signUp({name: username,email: email,password: password});
      }
      setUsername('');
      setEmail('');
      setPassword('');
    }
      
    return (
        <div>
        <h1>Register Page</h1>
        <form className='form-group' onSubmit={(e)=>{submitHandler(e)}}>
        <input 
          className='form-control'
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter Username'
        />
        <input 
          className='form-control' 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter Email Address'
        />
        
        <input 
          className='form-control' 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter Password'
        />

        <button type="submit">Register</button>
    </form>
    </div>
  )
}

export default Register
