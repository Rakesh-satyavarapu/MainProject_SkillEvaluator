import React ,{ useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    let res = await axios.post('http://localhost:5000/auth/login', {
      email,
      password
    });
    console.log(res.data);
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
