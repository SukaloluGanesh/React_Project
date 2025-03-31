import dayjs from "dayjs";
import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../Context/GlobalContext";

const Day = ({ day, rowIdx }) => {
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);
  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  function getLabelBgClass(label) {
    switch (label) {
      case "indigo":
        return "bg-indigo-200";
      case "gray":
        return "bg-gray-200";
      case "green":
        return "bg-green-200";
      case "blue":
        return "bg-blue-200";
      case "red":
        return "bg-red-200";
      case "purple":
        return "bg-purple-200";
      default:
        return "bg-gray-200";
    }
  }

  return (
    <div
      className="border border-gray-200 flex flex-col"
      onClick={() => {
        setDaySelected(day);
        setShowEventModal(true);
      }}
    >
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1 font-bold">
            {day && day.format ? day.format("ddd").toUpperCase() : "N/A"}
          </p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day && day.format ? day.format("D") : ""}
        </p>
      </header>
      <div className="flex-1 cursor-pointer">
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`${getLabelBgClass(evt.label)} p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
