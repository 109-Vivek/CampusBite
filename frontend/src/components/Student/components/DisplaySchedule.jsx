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
    <div className="border p-8 flex flex-col items-center justify-center">
      <div className="text-center flex flex-row gap-2">
        {days.map((dayName) => (
          <Day key={dayName} dayName={dayName} setDay={setDay} />
        ))}
      </div>
      <h1 className="font-bold p-4">{day}'s Schedule</h1>
      <div className="flex flex-row p-2 gap-4">
        <div>Breakfast : </div>
        <div>{schedule[day].breakfast}</div>
      </div>
      <div className="flex flex-row p-2 gap-4">
        <div>Lunch : </div>
        <div>{schedule[day].lunch}</div>
      </div>
      <div className="flex flex-row p-2 gap-4">
        <div>Snacks : </div>
        <div>{schedule[day].dinner}</div>
      </div>
      <div className="flex flex-row p-2 gap-4">
        <div>Dinner : </div>
        <div>{schedule[day].dinner}</div>
      </div>
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

export default DisplaySchedule;
