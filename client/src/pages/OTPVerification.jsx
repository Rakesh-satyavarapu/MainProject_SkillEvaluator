import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { axiosInstance } from "../lib/axios";
import { useNavigate } from 'react-router-dom'; 
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ShieldCheck, Check, ArrowRight } from "lucide-react";

const OTPVerification = () => {
  const navigate = useNavigate();
  const { email } = useParams(); 
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  // Handle input change
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle backspace and focus on previous field
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyOTP = async(otp) =>{
    let user = await axiosInstance.get(`/api/confirmOtp/${email}`)
    if(String(user.data.verifyOtp) === String(otp))
    {
      toast.success('OTP verified successfully')
      navigate(`/reset/${email}`)
    }
    else{
      toast.error('incorrect otp')
    }
  }
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join(""); // Convert array to string
    if (enteredOtp.length === 6) {
      console.log(typeof(enteredOtp))
      verifyOTP(enteredOtp)
    } else {
      toast.error("Please enter a 6-digit OTP.");
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
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Enter OTP</h1>
          <p className="text-gray-600 mt-1">We have sent a 6-digit OTP to <span className="font-semibold text-gray-900">{email}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                maxLength="1"
                className="w-12 h-12 md:w-14 md:h-14 text-center text-lg font-semibold rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-gray-900"
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold hover:shadow-lg transition"
          >
            <Check className="h-5 w-5" />
            Verify OTP
          </motion.button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Didn't receive the code?
          <button
            type="button"
            onClick={handleSubmit}
            className="ml-1 text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
          >
            Resend <ArrowRight className="h-4 w-4" />
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default OTPVerification;





// import React, { useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; 
// import toast from "react-hot-toast";

// const OTPVerification = () => {
//   const navigate = useNavigate();
//   const { email } = useParams(); 
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const inputRefs = useRef([]);

//   // Handle input change
//   const handleChange = (index, e) => {
//     const value = e.target.value;
//     if (!isNaN(value) && value.length <= 1) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       // Move to the next input field
//       if (value !== "" && index < 5) {
//         inputRefs.current[index + 1].focus();
//       }
//     }
//   };

//   // Handle backspace and focus on previous field
//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const verifyOTP = async(otp) =>{
//     let user = await axios.get(`/api/confirmOtp/${email}`)
//     if(String(user.data.verifyOtp) === String(otp))
//     {
//       toast.success('OTP verified successfully')
//       navigate(`/reset/${email}`)
//     }
//     else{
//       toast.error('incorrect otp')
//     }
//   }
//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const enteredOtp = otp.join(""); // Convert array to string
//     if (enteredOtp.length === 6) {
//       console.log(typeof(enteredOtp))
//       verifyOTP(enteredOtp)
//     } else {
//       toast.error("Please enter a 6-digit OTP.");
//     }
//   };

//   return (
//     <div className="container mt-4 text-center">
//       <h2>Enter OTP</h2>
//       <p>We have sent a 6-digit OTP to your email.</p>
//       <form onSubmit={handleSubmit} className="d-flex justify-content-center gap-2">
//         {otp.map((digit, index) => (
//           <input
//             key={index}
//             type="text"
//             value={digit}
//             maxLength="1"
//             className="otp-input text-center"
//             onChange={(e) => handleChange(index, e)}
//             onKeyDown={(e) => handleKeyDown(index, e)}
//             ref={(el) => (inputRefs.current[index] = el)}
//           />
//         ))}
//       </form>
//       <button className="btn btn-primary mt-3" onClick={handleSubmit}>
//         Verify OTP
//       </button>
//     </div>
//   );
// };

// export default OTPVerification;
