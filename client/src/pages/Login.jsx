
import { useState } from "react"
import axios from 'axios'
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"



export default function Login() {
  const navigate = useNavigate()
   const [data,setData] = useState({
    email:'',
    password:'',
  })
  const loginUser = async (e) => {
    e.preventDefault()
    const {email,password} = data
    try{
      const {data} = await axios.post('/login',{email,password})
      if(data.error){
        toast.error(data.error)
      }else {
        setData({})
        navigate('/dashboard')
      }
    }catch(err){
      console.log(err)
    }
  } 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={loginUser}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" value={data.email} onChange={(e)=>setData({...data, email:e.target.value})} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={data.password} onChange={(e)=>setData({...data, password:e.target.value})} />
            </div>
          </div>
  
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
