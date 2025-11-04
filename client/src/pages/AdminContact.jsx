import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, Sparkles, User } from 'lucide-react';
import axios from 'axios';

const AdminContact = () => {
  const { authUser } = useAuthStore();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const data = {
    service_id: 'service_6if8ffj',
    template_id: 'template_uov2r2o',
    user_id: 'ZptoHDThWcTrz4SMG',
    template_params: {
      to_name: 'Skill Evaluator Admin',
      skillName: name,
      message: desc,
      from_email: authUser?.email
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter a skill name');
      return;
    }
    
    if (!desc.trim()) {
      toast.error('Please enter a skill description');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
      toast.success('Request sent successfully!');
      setName('');
      setDesc('');
    } catch (error) {
      console.error('Error sending request:', error);
      toast.error('Failed to send request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Request a New Skill</h1>
          <p className="text-gray-600">Suggest a skill you'd like to see added to the platform</p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8"
        >
          <form onSubmit={submitHandler} className="space-y-6">
            {/* Email Field (Read-only) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Your Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={authUser?.email || ''}
                  readOnly
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Skill Name Field */}
            <div>
              <label htmlFor="skillName" className="block text-sm font-medium text-gray-700 mb-2">
                Skill Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Sparkles className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="skillName"
                  type="text"
                  placeholder="Enter the skill name you want to request"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Skill Description <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="description"
                  placeholder="Describe the skill and why it would be valuable to add..."
                  rows={8}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Please provide details about the skill, its importance, and any specific topics or areas it should cover.
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Sending Request...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Send Request</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MessageSquare className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">About Skill Requests</h3>
              <p className="text-sm text-blue-700">
                Your request will be reviewed by our admin team. We'll notify you via email once the skill is added to the platform.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminContact;






// import React, { useState } from 'react'
// import { useAuthStore } from '../store/useAuthStore'
// import toast from 'react-hot-toast'
// import axios from 'axios'


// const AdminContact = () => {
    
//   const {authUser} = useAuthStore();
//   const[name,setName]=useState('')
//   const[mail,setMail]=useState('')
//   const[desc,setDesc]=useState('')

//   const data = {
//     service_id: 'service_6if8ffj',
//     template_id: 'template_uov2r2o',
//     user_id: 'ZptoHDThWcTrz4SMG',
//     template_params: {
//       to_name:'Skill Evaluator Admin',
//       skillName:name,
//       message:desc,
//       from_email:authUser?.email
//     }
// };


//   const submitHandler = async(e) =>{
//     e.preventDefault()
//     let response = await axios.post("https://api.emailjs.com/api/v1.0/email/send",data) 
//     console.log(name,mail,desc,response)
//     toast.success('Request Sent Successfully')
//     setName('')
//     setDesc('')
//   }
//   return (
//     <div className='p-5 mt-5 '>
//       <h1 className='text-center'>Contact Admin</h1>
//       <form onSubmit={submitHandler} className='form-group'>
//         <input
//         className='form-control mb-3'
//         type='mail'
//         placeholder='enter your mail'
//         name='mail'
//         value={authUser?.email}
//         />
        
//         <input
//         className='form-control mb-3'
//         type='text'
//         placeholder='enter skill name'
//         name='name'
//         value={name}
//         onChange={(e)=>{setName(e.target.value)}}/>
        
//         <textarea 
//         className='form-control mb-3'
//         placeholder='enter skill description'
//         name='message'
//         rows={12}
//         value={desc}
//         onChange={(e)=>{setDesc(e.target.value)}}/>
//         <div className='text-right'><button className='btn btn-success'>Send Request</button></div>
//       </form>
//     </div>
//   )
// }

// export default AdminContact
