import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/Signin";
import Dashboard from "./components/Dashboard";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <div><Toaster/></div>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen  ">
          <div className="flex-grow">
            <Routes>
              <Route path="/signin" element={<SignIn/>}></Route>
              <Route path="/dashboard" element={<Dashboard/>}></Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
