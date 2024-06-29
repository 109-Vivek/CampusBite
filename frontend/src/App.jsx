import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import { Toaster } from "react-hot-toast";
import Student from "./components/Student/Student";
import Admin from "./components/Admin/Admin";
import MessAdmin from "./components/MessAdmin/MessAdmin";

function App() {
  return (
    <BrowserRouter >
        <Toaster />
        <Routes>
          <Route path="/student/*" element={<Student />}></Route>
          <Route path="/mess-admin/*" element={<MessAdmin />}></Route>
          <Route path="/admin/*" element={<Admin/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}
export default App;
