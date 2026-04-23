import React, { useState } from "react";
import { Notebook } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()



  return (
    <div  className="max-w-md mx-auto mt-10">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center mb-6">
          <Notebook className="w-12 h-12 text-indigo-600 mb-2" />
          <h2 className="text-2xl font-bold text-gray-900 mt-4">Welcome Back</h2>
          <p className="text-gray-500 text-sm my-3">Sign in to access your notes</p>

          <form>
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
                value=""
                placeholder="you@example.com"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="">Password</label>
              <input
                id="password"
                type="password"
                value=""
                placeholder="****************"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <button type="submit" className="bg-indigo-700 w-full text-white py-2 focus:ring-2 rounded-md my-4 transition-colors focus:outline-none disabled:cursor-not-allowed " >Sign In</button>
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
