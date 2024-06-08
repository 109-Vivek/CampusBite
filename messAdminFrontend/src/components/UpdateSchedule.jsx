import React from "react";
import { useState } from "react";
import axios from "axios";

const UpdateSchedule = ({messSchedule}) => {
  const currentDate = new Date();
  const options = { weekday: "long" };
  const currentDayName = new Intl.DateTimeFormat("en-US", options).format(
    currentDate
  );

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
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
        toast.error(error.data.response);
    }
  }

  return (
    <div className="border p-8 flex flex-col items-center justify-center">
      <div className="text-center flex flex-row gap-2">
        {days.map((dayName) => (
          <Day key={dayName} dayName={dayName} setDay={setDay} />
        ))}
      </div>
      <h1 className="font-bold p-4">{day}'s Schedule</h1>
      <div>
        <label>Breakfast : </label>
        <input
          type="text"
          name="breakfast"
          placeholder="Enter breakfast meals"
          value={schedule[day].breakfast}
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <label>Lunch : </label>
        <input
          type="text"
          name="lunch"
          placeholder="Enter lunch meals"
          value={schedule[day].lunch}
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <label>Snacks : </label>
        <input
          type="text"
          name="snacks"
          placeholder="Enter snacks meals"
          value={schedule[day].snacks}
          onChange={handleChange}
        ></input>
      </div>
      <div>
        <label>Dinner : </label>
        <input
          type="text"
          name="dinner"
          placeholder="Enter dinner meals"
          value={schedule[day].dinner}
          onChange={handleChange}
        ></input>
      </div>
      <button className="border rounded-md bg-blue-700 p-2 m-2 text-white" onClick={updateSchedule}>Update in Database</button>
    </div>
  );
};

const Day = ({ dayName, setDay }) => {
  return (
    <div
      className="border px-2 rounded-lg bg-indigo-300  py-1"
      onClick={() => setDay(dayName)}
    >
      {dayName}
    </div>
  );
};

export default UpdateSchedule;
