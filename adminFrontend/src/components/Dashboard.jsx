import React, { useEffect,useState } from "react";
import axios from "axios";
import Mess from "./Mess";
import CreateMessForm from "./CreateMessForm";

const Dashboard = () => {
    const [messes, setMesses] = useState([]);

  useEffect(() => {
    getMesses();
  }, []);

  async function getMesses() {
    console.log("called");
    try {
      const response = await axios.get("http://localhost:3000/admin/listMess", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMesses(response.data.messes);
    } catch (error) {
      console.error("Something went wrong", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
  return (
    <div>
        <div>Dashboard</div>
        {messes.map((mess) =>{
            return <Mess key={mess._id} mess={mess} getMesses={getMesses}/>
        } )}
        <CreateMessForm getMesses={getMesses} />
    </div>
  )
}
export default Dashboard
