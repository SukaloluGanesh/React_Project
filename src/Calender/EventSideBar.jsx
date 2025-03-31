import React, { useContext } from "react";
import plusing from "../assets/plus.svg";
import GlobalContext from "../Context/GlobalContext";
import SmallCalender from "./SmallCalender";
const EventSideBar = () => {
  let { modalForEvents, setModalForEvents } = useContext(GlobalContext);
  return (
    <div>
      <button
        className="border p-2 rounded-full flex items-center shadow-md hover:shadow mt-5 ml-5"
        onClick={() => setModalForEvents(true)}
      >
        <img src={plusing} alt="Create Event" className="w-7 h-7" />
        <span className="pl-3 pr-7">Create Event</span>
      </button>

      <SmallCalender />
    </div>
  );
};

export default EventSideBar;
