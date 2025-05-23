import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { getMonth } from "./Utlis";
import GlobalContext from "../Context/GlobalContext";

const SmallCalender = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());

  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);

  function handleNextMonth() {
    setCurrentMonthIndex(currentMonthIndex + 1);
  }

  function handleprevMonth() {
    setCurrentMonthIndex(currentMonthIndex - 1);
  }

  const { monthIndex, setSmallCalenderMonth, setDaySelected, daySelected } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIndex(monthIndex);
  }, [monthIndex]);
  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay == currDay) {
      return "bg-blue-500 rounded-full text-white";
    } else if (currDay == slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
      return "";
    }
  }

  return (
    <div className="mt-9 p-2">
      <div className="flex justify-between ">
        <p className="text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIndex)).format(
            "MMMM YYYY"
          )}
        </p>
        <div>
          <button onClick={handleprevMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_left
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_right
            </span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => {
          return (
            <span key={i} className="text-sm py-1 text-center">
              {day.format("dd").charAt(0)}
            </span>
          );
        })}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSmallCalenderMonth(currentMonthIndex);
                  setDaySelected(day);
                }}
                className={`py-1 w-full ${getDayClass(day)}`}
              >
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SmallCalender;
