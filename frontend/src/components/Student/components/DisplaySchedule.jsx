import React from "react";
import { useState } from "react";

const DisplaySchedule = ({ schedule }) => {
  const currentDayName = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(new Date());

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
  return (
    <div className="flex flex-row gap-2 justify-center items-center p-4">
      <ul className="h-full flex-column p-2 space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400  mb-4">
        {days.map((dayName) => (
          <Day key={dayName} dayName={dayName} day={day} setDay={setDay} />
        ))}
      </ul>
      <div className="p-4 flex flex-col justify-evenly  bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full h-full">
        {/* Content Comes Here  */}
        <div className="flex flex-col p-2 gap-4">
          <div className="font-semibold">Breakfast : </div>
          <div>{schedule[day].breakfast}</div>
        </div>
        <div className="flex flex-col p-2 gap-4">
          <div className="font-semibold">Lunch : </div>
          <div>{schedule[day].lunch}</div>
        </div>
        <div className="flex flex-col p-2 gap-4">
          <div className="font-semibold">Snacks : </div>
          <div className="italic" >{schedule[day].snacks}</div>
        </div>
        <div className="flex flex-col p-2 gap-4">
          <div className="font-semibold">Dinner : </div>
          <div>{schedule[day].dinner}</div>
        </div>
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

export default DisplaySchedule;
