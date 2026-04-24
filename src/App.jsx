import { BrowserRouter, Navigate, replace, Route, Routes } from "react-router-dom";
import Landing from "./routes/Landing";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./routes/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";


function App() {


  const { loading, currentUser} = useAuth();

  if (loading){
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-indigo-600 text-xl">

        Loading QuickNotes
        </div>
      </div>
    )
  }


  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? <Navigate to="/dashboard" replace /> : <Landing />
            }
          />
          <Route
            path="/login"
            element={
              currentUser ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />
          <Route
            path="/signup"
            element={
              currentUser ? <Navigate to="/dashboard" replace /> : <Signup />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <div className="container mx-auto px-4 py-8">
                  <Dashboard />
                </div>
              </ProtectedRoutes>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
