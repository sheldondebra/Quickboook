import React, { useState } from "react";
import { Notebook } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading , setLoading] = useState()
    const[error , setError] = useState()


    const {signIn} = useAuth()

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
      e.preventDefault();
      setError()

      if(!email || !password) {
        return setError('Please Enter your Email or Password')
      }

      try{
        setLoading(true)
        await signIn(email, password);
        navigate('/dashboard')
      }catch(err){
        setError('Login Unsuccessful' + err.message)
      }finally{
        setLoading(false)
      }
    }



  return (
    <div  className="max-w-md mx-auto mt-10">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center mb-6">
          <Notebook className="w-12 h-12 text-indigo-600 mb-2" />
          <h2 className="text-2xl font-bold text-gray-900 mt-4">Welcome Back</h2>
          <p className="text-gray-500 text-sm my-3">Sign in to access your notes</p>
    {
      error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
          <div>{error}</div>
        </div>
      )
    }
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                placeholder="you@example.com"
                onChange={(e)=>setEmail(e.target.value)}
                
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="****************"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
               
              />
            </div>
            <button type="submit" className="bg-indigo-700 w-full text-white py-2 focus:ring-2 rounded-md my-4 transition-colors focus:outline-none disabled:cursor-not-allowed " disabled={loading} >
              {loading ? 'Loging In ...' : "Signin"}
              </button>
          </form>
          <div>
            <p className="text-gray-600 text-sm  ">
              Don't have an account yet?
              <Link to="/signup" className="text-indigo-600 font-bold ml-2">Create An Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
