import React, { useState } from "react";
import { Notebook } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setconfirmPassword] = useState()
  const [loading , setLoading ] = useState();
  const [error , setError] =useState()

const { signUp } = useAuth();

const navigate  = useNavigate();


const handleSubmit = async  (e) => {
  e.preventDefault()
  setError('')

  if(!email || !password || !confirmPassword){
    return setError('Please fill in all fields')
  }

  if(password !== confirmPassword){
    return setError('Password do not match')
  }

  if(password.length < 6 ){
    return setError('Password must be at least 6 characters')
  }

  try{
    setLoading(true)
    await signUp(email, password);
    navigate('/dashboard')
  } catch(err){
    setError('Failed to create account' + err.message || 'please try again')
  }finally{
    setLoading(false)
  }

}


  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center mb-6">
          <Notebook className="w-12 h-12 text-indigo-600 mb-2" />
          <h2 className="text-2xl font-bold text-gray-900 mt-4">
            Create your Account
          </h2>
          <p className="text-gray-500 text-sm my-3">
            Start taken your notes today
          </p>
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}

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
                onChange={(e) => setEmail(e.target.value)}
              
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder="****************"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-5"
               
              />
            </div>
            <div>
              <label htmlFor=""> Confirm Password</label>
              <input
                id="password-confimr"
                type="password"
                value={confirmPassword}
                placeholder="****************"
                onChange={(e) => setconfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
               
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-700 w-full text-white py-2 focus:ring-2 rounded-md my-4 transition-colors focus:outline-none disabled:cursor-not-allowed "
              disabled={loading}
            >
              {loading ? 'Creating Account ...' : 'Create Account'}
            </button>
          </form>
          <div>
            <p className="text-gray-600 text-sm  ">
              Aleady have an Account?
              <Link to="/login" className="text-indigo-600 font-bold ml-2">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
