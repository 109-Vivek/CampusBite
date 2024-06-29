import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplaySchedule from "./DisplaySchedule";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const [messes, setMesses] = useState(null);
  const [currMess, setCurrMess] = useState(null);
  const [primaryMess, setPrimaryMess] = useState(null);

  useEffect(() => {
    getMesses();
    getPrimaryMess();
  }, []);

  async function getPrimaryMess() {
    try {
      const response = await axios.get(
        "http://localhost:3000/student/primarymess",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("student_token")}` },
        }
      );
      setCurrMess(response.data.messId);
      setPrimaryMess(response.data.messId);
    } catch (error) {
      console.error("Something went wrong", error);
    }
  }

  async function getMesses() {
    try {
      const response = await axios.get("http://localhost:3000/student/messes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("student_token")}`,
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
            Authorization: `Bearer ${localStorage.getItem("student_token")}`,
          },
        }
      );
      setPrimaryMess(currMess);
      toast.success("Primary Mess set successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="w-[min(1100px,100%)] flex flex-col gap-5 p-5">
      <div className="text-sm  font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex -mb-px overflow-x-scroll">
          {messes &&
            messes.map((mess, index) => (
              <li
                className="me-2 relative p-5"
                key={index}
                onClick={() => setCurrMess(mess._id)}
              >
                <a
                  href="#"
                  aria-current="page"
                  className={
                    currMess === mess._id
                      ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                      : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  }
                >
                  {mess.messName}
                </a>
                {currMess === mess._id && primaryMess != currMess && (
                  <button
                    className="absolute top-1 right-1 m-2  p-1 text-xs font-extralight text-green-500 rounded-lg bg-[#1F2937]"
                    onClick={setPrimary}
                  >
                    Set Primary
                  </button>
                )}
              </li>
            ))}
        </ul>
      </div>
      {currMess &&
        messes &&
        (currMess === "Primary Mess not set" ? (
          <div className="text-white">Primary Mess not set ! <br></br>Click on any mess and set as primary</div>
        ) : (
          <DisplaySchedule
            schedule={messes.find((mess) => mess._id === currMess).messSchedule}
          />
        ))}
    </div>
  );
};
export default Dashboard;
