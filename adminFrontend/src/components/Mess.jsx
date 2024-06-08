import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const Mess = ({ mess ,getMesses}) => {
  const { messName,adminName,adminUsername } = mess;
  console.log(mess);

const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/admin/deleteMess",
        {
          data: { messId:mess._id }, // Send data as object with key 'data'
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Mess Deleted");
      getMesses();
    } catch (error) {
        toast.error("Something went wrong");
    }
  };
  
  return (
    <div className="flex flex-col bg-green-300 p-4 m-4 rounded-lg">
      <div className="flex flex-col">
        <div className="text-lg font-bold">{messName}</div>
        <div>  Admin Name : {adminName}</div>
        <div>Admin Username : {adminUsername}</div>
        <button onClick={handleDelete} className="border p-2 rounded-lg m-2 ">Delete</button>
      </div>
    </div>
  );
};

export default Mess;
