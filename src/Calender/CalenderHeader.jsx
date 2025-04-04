import React, { useContext } from "react";
import GlobalContext from "../Context/GlobalContext";
import dayjs from "dayjs";
import ColorToggleButton from "./ToggleButton";


const CalenderHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleResetToToday() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  return (
    <div className="px-4 py-2 flex items-center">
      <button
        className="border rounded py-2 px-4 mr-5"
        onClick={handleResetToToday}
      >
        Today
      </button>

      <button onClick={handlePrevMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_left
        </span>
      </button>

      <button onClick={handleNextMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_right
        </span>
      </button>

      <h3 className="ml-4 text-xl  font-bold whitespace-nowrap">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h3>
    
    </div>
  );
};

export default CalenderHeader;
