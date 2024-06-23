import React from "react";
import { useState } from "react";

const Schedule = () => {

  const scheduleData = {
    Sunday: {
      breakfast: "Pancakes, Eggs and Bacon",
      lunch: "Grilled Chicken Sandwich, Caesar Salad",
      snacks: "Fruit Salad, Trail Mix",
      dinner: "Spaghetti and Meatballs, Garlic Bread",
    },
    Monday: {
      breakfast: "Oatmeal, Fresh Fruit",
      lunch: "Turkey Sandwich, Vegetable Soup",
      snacks: "Yogurt, Carrot Sticks",
      dinner: "Vegetable Stir-Fry, Rice",
    },
    Tuesday: {
      breakfast: "Scrambled Eggs, Toast",
      lunch: "Quinoa Salad, Avocado Wrap",
      snacks: "Cheese and Crackers, Apple Slices",
      dinner: "Baked Salmon, Steamed Vegetables",
    },
    Wednesday: {
      breakfast: "Smoothie, Granola",
      lunch: "Caprese Sandwich, Minestrone Soup,sdfsdf, sdfdsf, dsfsdf, dsfs",
      snacks: "Nuts, Rice Cakes",
      dinner: "Tacos, Guacamole",
    },
    Thursday: {
      breakfast: "French Toast, Sausages",
      lunch: "Soup and Sandwich Combo, Garden Salad",
      snacks: "Vegetable Sticks with Hummus, Popcorn",
      dinner: "Chicken Curry, Naan Bread",
    },
    Friday: {
      breakfast: "Bagel with Cream Cheese, Fruit Smoothie",
      lunch: "Caesar Salad, Grilled Cheese Sandwich",
      snacks: "Popcorn, Pretzels",
      dinner: "Grilled Steak with Roasted Potatoes, Green Beans",
    },
    Saturday: {
      breakfast: "Waffles, Breakfast Burrito",
      lunch: "Greek Salad, Falafel Wrap",
      snacks: "Granola Bar, Fruit",
      dinner: "Pizza, Garlic Knots",
    },
  };
  const currentDate = new Date();
  const options = { weekday: 'long' };
  const currentDayName = new Intl.DateTimeFormat('en-US', options).format(currentDate);


  const [day,setDay] = useState(currentDayName);
  const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

  return (
    <div>
      <div>
        {days.map((dayName) => (
          <Day key={dayName} dayName={dayName} setDay={setDay} />
        ))}
      </div>
      <h1>{day}'s Schedule</h1>
      <h3>Breakfast: {scheduleData[day].breakfast}</h3>
      <h3>Lunch: {scheduleData[day].lunch}</h3>
      <h3>Snacks: {scheduleData[day].snacks}</h3>
      <h3>Dinner: {scheduleData[day].dinner}</h3>
    </div>
  );
};


const Day = ({dayName,setDay}) => {
  return (
    <div className="border px-2 rounded-lg bg-indigo-300  py-1" onClick={()=> setDay(dayName)} >{dayName}</div>
  )
}
export default Schedule;
