import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const CreateMessForm = ({ getMesses }) => {
  const [messName, setMessName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { messName, adminName, adminUsername, adminPassword };
    const requestHeaders = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/create",
        requestBody,
        requestHeaders
      );
      console.log(response);
      if (response.data.msg === "Mess Created Successfully") {
        toast.success("Mess Created Successfully");
        getMesses();
        setMessName("");
        setAdminName("");
        setAdminUsername("");
        setAdminPassword("");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Mess</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="messName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Mess Name
          </label>
          <input
            id="messName"
            type="text"
            placeholder="Mess Name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={messName}
            onChange={(e) => setMessName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="adminName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Admin Name
          </label>
          <input
            id="adminName"
            type="text"
            placeholder="Admin Name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="adminUsername"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Admin Username
          </label>
          <input
            id="adminUsername"
            type="text"
            placeholder="Admin Username"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={adminUsername}
            onChange={(e) => setAdminUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="adminPassword"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Admin Password
          </label>
          <input
            id="adminPassword"
            type="password"
            placeholder="Admin Password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMessForm;
