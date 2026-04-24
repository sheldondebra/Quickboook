import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Notebook } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { User } from "lucide-react";
import { LogOut } from "lucide-react";


function Navbar() {
  const navigate = useNavigate();
  const {currentUser , Logout} = useAuth()



  const handleLogout = async () => {
    try{
    await Logout();
    navigate('/login');
  
  } catch(err){
    console.log('Failed ot logout '+ err.message);
  }
  
}

  return (
    <nav className="bg-white shadow-sm">
      <div className=" container mx-auto">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Notebook className="h-8 w-4 text-indigo-600" />
            <span className="text-xl font-semibold text-gray-900">
              QuickNotes
            </span>
          
          </Link>
          {currentUser ? (
            <div className="flex gap-2 items-center text-sm text-gray-600">
              <User className="h-4 w-4 mr-1"/>
              <span className="hidden md:inline" >{currentUser.email}</span>
              <button className=" flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors" onClick={handleLogout} >
                <LogOut className="h-4 w-4 mr-1 "/>
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium texxt-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Login In
                </Link>
              </div>
              <div className="space-x-4">
                <Link
                  to="/signup"
                  className="text-sm font-medium text-white px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
