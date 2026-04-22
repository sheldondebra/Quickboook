import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./routes/Landing";
import Signup from "./routes/Signup";
import Login from "./routes/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signip" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
