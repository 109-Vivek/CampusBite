import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const Mess = ({ mess, getMesses }) => {
  const { messName, adminName, adminUsername } = mess;

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/admin/deleteMess`,
        {
          data: { messId: mess._id },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
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
    <div className="flex w-full flex-col bg-[#374151] text-[#E4E7EB] p-4 rounded-lg">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between border-b-[1px] mb-2 p-2">
          <div className="text-lg font-bold">{messName}</div>
          <MdDelete onClick={handleDelete} className="text-xl hover:cursor-pointer" />
        </div>  
        <div>
          Admin :<span className="font-mono font-light"> {adminName}</span>
        </div>
        <div>
          Admin Username :
          <span className="font-mono font-light"> {adminUsername}</span>
        </div>
      </div>
    </div>
  );
};

export default Mess;
