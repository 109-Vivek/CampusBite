import axios from "axios";
import React, { useState } from "react";
import {useNavigate } from "react-router";
import toast from "react-hot-toast";

const Signin = () => {

  const [rollNumber, setrollNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/student/signin", { rollNumber, password })
      if(response.data === "Invalid rollNumber or password")
      {
        toast.error(response.data);
        return;
      }
      else{
        toast.success("Signin Successfull");
        localStorage.setItem("token",response.data.token);
        navigateTo("/dashboard");
      }
    }
    catch(error)
    {
      toast.error("Error Signing in");
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rollNumber">
            Roll Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="rollNumber"
            type="text"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e)=>setrollNumber(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
