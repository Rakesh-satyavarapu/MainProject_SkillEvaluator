import React, { useState } from 'react';
import { axiosInstance } from "../lib/axios";
import toast from 'react-hot-toast';
import { useParams, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { Lock, CheckCircle } from 'lucide-react';

const ResetPass = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [pass, setPass] = useState('');

  const changePass = async (e) => {
    e.preventDefault();
    try {
      let res = await axiosInstance.post(`/api/setPass/${email}`, { pass });
      if (res.data.set) {
        toast.success('Password reset successfully!');
        navigate('/login');
      }
      setPass('');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl p-8"
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-600 mt-1">
            Enter your new password to regain access to your account
          </p>
        </div>

        <form onSubmit={changePass} className="space-y-5">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition"
                name="password"
                value={pass}
                type="password"
                onChange={(e) => setPass(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Choose a strong password for better security.
            </p>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold hover:shadow-lg transition"
          >
            <CheckCircle className="h-5 w-5" />
            Reset Password
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPass;





// import React from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// import toast from 'react-hot-toast';
// import { useParams } from "react-router-dom";
// import { useNavigate } from 'react-router-dom'; 


// const ResetPass = () => {
//   const navigate = useNavigate();
//   const { email } = useParams(); 
//     const [pass,setPass] = useState('')
//     const changePass = async(e) =>{
//         e.preventDefault()
//         try{
//           let res = await axios.post(`/api/setPass/${email}`,{pass})
//           if(res.data.set)
//           {
//             toast.success('password reset successfully ')
//             navigate('/login')
//           }
//         setPass('')
//         }
//         catch(err)
//         {}
//     }
//     return (
//         <div className=' min-vh-100  d-flex justify-content-center align-items-center bg-dark'>
//           <div className='card p-5 mt-5 shadow-lg rounded-5 justify-content-center align-items-center ' style={{margin:'40px',width:'525px'}}>
//             <form className='form-group w-100' onSubmit={changePass}>
//               <div className=''>
//                 <input 
//                 className='form-control mb-3' 
//                 name='password'
//                 value={pass}
//                 type='password' 
//                 onChange={(e)=>setPass(e.target.value)}
//                 placeholder='enter password' 
//                 required />
//                 <button className='btn btn-primary'>submit</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )
// }

// export default ResetPass
