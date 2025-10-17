import {create} from 'zustand';
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

export const useAuthStore = create((set,get) => ({
    
    authUser: null,
    isSigningUp: false,
    isLoggedIn: false,
    isCheckingAuth:true,

    checkAuth:async()=>
    {
        try {
            let res = await axiosInstance.get('/auth/check')
            set({authUser:res.data})
        } catch (error) {
            console.log("error in checking auth",error)
            set({authUser:null})
        }
        finally
        {
            set({isCheckingAuth:false})
        }
    },

    signUp: async({name,email,password})=>{
        set({isSigningUp:true})
        try {
            let res = await axiosInstance.post('/auth/register',{name,email,password})
            set({authUser:res.data})
            toast.success('Account created successfully')
        } catch (error) {
            toast.error(error.response.data.msg)
        }
        finally
        {
            set({isSigningUp:false})
        }
    },

    login :async({email,password}) =>{
        set({isLoggedIn:true})
        try {
            let res = await axiosInstance.post('/auth/login',{email,password})
            set({authUser:res.data})
            toast.success("logged in successfully")
        } catch (error) {
            toast.error(error.response.data.msg)
        }
        finally
        {
            set({isLoggedIn:false})
        }
    },

    logout :async() =>{
        try {
            await axiosInstance.get('/auth/logout');
            set({authUser:null})
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

}));