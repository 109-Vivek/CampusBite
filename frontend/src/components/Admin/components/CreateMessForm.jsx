import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const CreateMessForm = ({ getMesses }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messName, setMessName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { messName, adminName, adminUsername, adminPassword };
    const requestHeaders = {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/admin/create`,
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
        toggleModal(); // Close modal after successful creation
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      {/* Modal toggle */}
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Create Mess
      </button>

      {/* Main modal */}
      <div
        className={
          isModalOpen
            ? "fixed p-4  top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-[#111827]"
            : "hidden"
        }
      >
        <div className="bg-[#374151] w-full max-w-md p-4 rounded-lg shadow-lg">
          {/* Modal content */}
          <div className="relative">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b rounded-t border-gray-600 ">
              <h3 className="text-lg font-semibold text-white">
                Create New Mess
              </h3>
              <button
                type="button"
                onClick={toggleModal}
                className="text-gray-400 bg-black rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            {/* Modal body */}
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label
                  htmlFor="messName"
                  className="block text-white text-sm font-semibold mb-2"
                >
                  Mess Name
                </label>
                <input
                  id="messName"
                  type="text"
                  placeholder="Mess Name"
                  className="w-full px-3 font-mono py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  value={messName}
                  onChange={(e) => setMessName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="adminName"
                  className="block text-white text-sm font-semibold mb-2"
                >
                  Admin Name
                </label>
                <input
                  id="adminName"
                  type="text"
                  placeholder="Admin Name"
                  className="w-full font-mono px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="adminUsername"
                  className="block text-white text-sm font-semibold mb-2"
                >
                  Admin Username
                </label>
                <input
                  id="adminUsername"
                  type="text"
                  placeholder="Admin Username"
                  className="w-full font-mono px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="adminPassword"
                  className="block text-white text-sm font-semibold mb-2"
                >
                  Admin Password
                </label>
                <input
                  id="adminPassword"
                  type="password"
                  placeholder="Admin Password"
                  className="w-full font-mono px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMessForm;
