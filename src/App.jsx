import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./routes/Landing";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
