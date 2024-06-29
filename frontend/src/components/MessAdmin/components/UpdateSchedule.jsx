import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateSchedule = ({ messSchedule }) => {
  const currentDayName = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(new Date());

  const [schedule, setSchedule] = useState(messSchedule);
  const [day, setDay] = useState(currentDayName);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function handleChange(e) {
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        [e.target.name]: e.target.value,
      },
    });
  }

  async function updateSchedule() {
    try {
      const response = await axios.put(
        "http://localhost:3000/messadmin/updateSchedule",
        { schedule },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("mess_admin_token"),
          },
        }
      );
      if (response.data.msg === "Schedule Updated Successfully")
        toast.success("Schedule Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-row gap-2 justify-center items-center p-4 w-full">
      <ul className="h-full flex-column p-2 space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400  mb-4">
        {days.map((dayName) => (
          <Day key={dayName} dayName={dayName} day={day} setDay={setDay} />
        ))}
      </ul>
      <div className="p-4 flex flex-col justify-evenly  bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full h-full">
        {/* Content Comes Here  */}
        <div>
          <label htmlFor="breakfast">Breakfast : </label>
          <input
            id="breakfast"
            type="text"
            name="breakfast"
            className="block bg-[#3d495b] rounded-sm px-2 w-full"
            placeholder="Enter breakfast meals"
            value={schedule[day].breakfast}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="lunch">Lunch : </label>
          <input
            id="lunch"
            type="text"
            name="lunch"
            className="block bg-[#3d495b] rounded-sm px-2 w-full"
            placeholder="Enter lunch meals"
            value={schedule[day].lunch}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="snacks">Snacks : </label>
          <input
            id="snacks"
            type="text"
            name="snacks"
            className="block bg-[#3d495b] rounded-sm px-2 w-full"
            placeholder="Enter snacks meals"
            value={schedule[day].snacks}
            onChange={handleChange} 
          ></input>
        </div>
        <div>
          <label htmlFor="dinner">Dinner : </label>
          <input
            id="dinner"
            type="text"
            name="dinner"
            className="block bg-[#3d495b] rounded-sm px-2 w-full"
            placeholder="Enter dinner meals"
            value={schedule[day].dinner}
            onChange={handleChange}
          ></input>
        </div>
        <button
          className="border rounded-md bg-blue-700 p-2 m-2 text-white"
          onClick={updateSchedule}
        >
          Update in Database
        </button>
      </div>
    </div>
  );
};

const Day = ({ dayName, day, setDay }) => {
  function abbrevate(dayName) {
    switch (dayName) {
      case "Sunday":
        return "S";
      case "Monday":
        return "M";
      case "Tuesday":
        return "T";
      case "Wednesday":
        return "W";
      case "Thursday":
        return "T";
      case "Friday":
        return "F";
      case "Saturday":
        return "S";
    }
  }
  return (
    <li onClick={() => setDay(dayName)}>
      <a
        href="#"
        className={
          dayName === day
            ? "inline-flex items-center px-3 py-2 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600"
            : "inline-flex items-center px-3 py-2 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
        }
        aria-current="page"
      >
        <svg
          className="w-4 h-4 me-2 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        ></svg>
        {window.innerWidth < 768 ? abbrevate(dayName) : dayName}
      </a>
    </li>
  );
};

export default UpdateSchedule;
