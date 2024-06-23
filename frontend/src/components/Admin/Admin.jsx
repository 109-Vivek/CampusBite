import { Routes, Route } from "react-router-dom";
import SigninForm from "./components/SigninForm";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signin" element={<SigninForm />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
