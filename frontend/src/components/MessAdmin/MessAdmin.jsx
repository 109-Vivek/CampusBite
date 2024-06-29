import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/Signin";
import Dashboard from "./components/Dashboard";

function MessAdmin() {
  return (
    <div className="bg-[#111827] w-[100vw] h-[100vh] flex justify-center items-center flex-col">
      <Routes>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default MessAdmin;
