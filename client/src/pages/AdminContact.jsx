import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import toast from 'react-hot-toast'
import axios from 'axios'


const AdminContact = () => {
    
  const {authUser} = useAuthStore();
  const[name,setName]=useState('')
  const[mail,setMail]=useState('')
  const[desc,setDesc]=useState('')

  const data = {
    service_id: 'service_6if8ffj',
    template_id: 'template_uov2r2o',
    user_id: 'ZptoHDThWcTrz4SMG',
    template_params: {
      to_name:'Skill Evaluator Admin',
      skillName:name,
      message:desc,
      from_email:authUser?.email
    }
};


  const submitHandler = async(e) =>{
    e.preventDefault()
    let response = await axios.post("https://api.emailjs.com/api/v1.0/email/send",data) 
    console.log(name,mail,desc,response)
    toast.success('Request Sent Successfully')
    setName('')
    setDesc('')
  }
  return (
    <div className='p-5 mt-5 '>
      <h1 className='text-center'>Contact Admin</h1>
      <form onSubmit={submitHandler} className='form-group'>
        <input
        className='form-control mb-3'
        type='mail'
        placeholder='enter your mail'
        name='mail'
        value={authUser?.email}
        />
        
        <input
        className='form-control mb-3'
        type='text'
        placeholder='enter skill name'
        name='name'
        value={name}
        onChange={(e)=>{setName(e.target.value)}}/>
        
        <textarea 
        className='form-control mb-3'
        placeholder='enter skill description'
        name='message'
        rows={12}
        value={desc}
        onChange={(e)=>{setDesc(e.target.value)}}/>
        <div className='text-right'><button className='btn btn-success'>Send Request</button></div>
      </form>
    </div>
  )
}

export default AdminContact
