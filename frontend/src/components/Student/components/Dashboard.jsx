import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplaySchedule from "./DisplaySchedule";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const [messes, setMesses] = useState(null);
  const [currMess, setCurrMess] = useState(null);

  useEffect(() => {
    getPrimaryMess();
    getMesses();
  }, []);

  async function getPrimaryMess() {
    try {
      const response = await axios.get(
        "http://localhost:3000/student/primarymess",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCurrMess(response.data.messId);
    } catch (error) {
      console.error("Something went wrong", error);
    }
  }

  async function getMesses() {
    try {
      const response = await axios.get("http://localhost:3000/student/messes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMesses(response.data.messes);
    } catch (error) {
      console.error("Something went wrong", error);
    }
  }

  async function setPrimary() {
    try {
      const response = await axios.put(
        "http://localhost:3000/student/setPrimaryMess",
        { primaryMessId: currMess },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Primary Mess set successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  return (
    <div>
      <div>Dashboard</div>
      <div className="flex flex-row p-4 justify-center items-center">
        {messes &&
          messes.map((mess, index) => {
            return (
              <div key={index} onClick={() => setCurrMess(mess._id)} className="border p-4 flex flex-col justify-center items-center">
                <div>{mess.messName}</div>
                {currMess === mess._id && <button className="border p-1 bg-red-500 rounded-lg text-white" onClick={setPrimary}>Set Primary</button>}
              </div>
            );
          })}
      </div>
      {currMess &&
        messes &&
        (currMess === "Primary Mess not set" ? (
          <div>Set a mess as primary first</div>
        ) : (
          <DisplaySchedule
            schedule={messes.find((mess) => mess._id === currMess).messSchedule}
          />
        ))}
    </div>
  );
};
export default Dashboard;
