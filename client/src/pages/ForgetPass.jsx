import React, { useState } from 'react';
import axios from 'axios';
import { axiosInstance } from "../lib/axios";
import { useNavigate } from 'react-router-dom'; 
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Mail, Send, Sparkles } from 'lucide-react';

const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const date = new Date();
    date.setMinutes(date.getMinutes() + 15);

    const sendOtp = async (e) => {
        e.preventDefault();

        try {
            // Fixing API call
            let response = await axiosInstance.get(`/api/Finduser/${email}`);
            console.log(response)
            // Checking if the user exists
            if (response.data.userExist) {
                const otp = Math.floor(100000 + Math.random() * 900000);
                const expiryTime = Date.now() + 15 * 60 * 1000; // OTP expires in 15 mins
                await axiosInstance.post('/api/save-otp', { email, otp, expiryTime });
                const data = {
                    service_id: 'service_6if8ffj',
                    template_id: 'template_qqg9udy',
                    user_id: 'ZptoHDThWcTrz4SMG',
                    template_params: {
                        from: 'AI Skill Evaluator',
                        email: email,
                        passcode: otp,
                        time: date.toLocaleString(),
                    }
                };

                await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);

                // Reset email input
                setEmail('');
                toast.success('OTP sent to your email check inbox');
                // Navigate to OTP page
                navigate(`/otp/${email}`);
            } else {
                toast.error('User not found! Redirecting...');
                navigate('/register');
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
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
                        <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
                    <p className="text-gray-600 mt-1">Enter your registered email to receive an OTP</p>
                </div>

                <form onSubmit={sendOtp} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input 
                                id="email"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition"
                                name='email'
                                value={email}
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your email'
                                required 
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">You will receive a 6-digit OTP valid for 15 minutes.</p>
                    </div>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold hover:shadow-lg transition"
                    >
                        <Send className="h-5 w-5" />
                        Send OTP
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default ForgotPass;





// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; 
// import toast from 'react-hot-toast';

// const ForgotPass = () => {
//     const [email, setEmail] = useState('');
//     const navigate = useNavigate();

//     const date = new Date();
//     date.setMinutes(date.getMinutes() + 15);

//     const sendOtp = async (e) => {
//         e.preventDefault();

//         try {
//             // Fixing API call
//             let response = await axios.get(`/api/Finduser/${email}`);
//             console.log(response)
//             // Checking if the user exists
//             if (response.data.userExist) {
//                 const otp = Math.floor(100000 + Math.random() * 900000);
//                 const expiryTime = Date.now() + 15 * 60 * 1000; // OTP expires in 15 mins
//                 await axios.post('/api/save-otp', { email, otp, expiryTime });
//                 const data = {
//                     service_id: 'service_6if8ffj',
//                     template_id: 'template_qqg9udy',
//                     user_id: 'ZptoHDThWcTrz4SMG',
//                     template_params: {
//                         from: 'AI Skill Evaluator',
//                         email: email,
//                         passcode: otp,
//                         time: date.toLocaleString(),
//                     }
//                 };

//                 await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);

//                 // Reset email input
//                 setEmail('');
//                 toast.success('OTP sent to your email check inbox');
//                 // Navigate to OTP page
//                 navigate(`/otp/${email}`);
//             } else {
//                 toast.error('User not found! Redirecting...');
//                 navigate('/register');
//             }
//         } catch (error) {
//             console.error("Error sending OTP:", error);
//             toast.error('Something went wrong. Please try again.');
//         }
//     };

//     return (
//         <div className='min-vh-100 d-flex justify-content-center align-items-center bg-dark'>
//             <div className='card p-5 mt-5 shadow-lg rounded-5 justify-content-center align-items-center' style={{ margin: '40px', width: '525px' }}>
//                 <form className='form-group w-100'>
//                     <div>
//                         <input 
//                             className='form-control mb-3' 
//                             name='email'
//                             value={email}
//                             type='email'  // Changed to type='email' for validation
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder='Enter email' 
//                             required 
//                         />
//                         <button className='btn btn-primary' onClick={sendOtp}>Send OTP</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ForgotPass;
