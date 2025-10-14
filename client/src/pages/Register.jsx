import React,{useState} from 'react'
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async(e) => {
      e.preventDefault();
      let res = await axios.post('http://localhost:5000/auth/register', {
        name: username,
        email: email,
        password: password
      });
      console.log(res.data);
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
