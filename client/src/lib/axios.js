import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"https://aiskillevaluator.onrender.com",
    withCredentials:true
    // baseURL:"http://localhost:5000",
})