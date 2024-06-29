import React, { useEffect, useState } from "react";
import axios from "axios";
import Mess from "./Mess";
import CreateMessForm from "./CreateMessForm";

const Dashboard = () => {
  const [messes, setMesses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    getMesses();
  }, []);

  async function getMesses() {
    try {
      const response = await axios.get("http://localhost:3000/admin/listMess", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });
      setMesses(response.data.messes);
    } catch (error) {
      console.error("Something went wrong", error);
    }
  }

  function toggleModal() {
    setIsModalOpen(!isModalOpen); // Toggle modal state
  }

  return (
    <div className="flex flex-col gap-5 p-4">
      <CreateMessForm getMesses={getMesses} />
      {messes.map((mess) => {
        return <Mess key={mess._id} mess={mess} getMesses={getMesses} />;
      })}
    </div>
  );
};

export default Dashboard;
