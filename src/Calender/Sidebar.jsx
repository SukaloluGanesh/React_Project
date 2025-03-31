import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalender from "./SmallCalender";
import Labels from "./Labels";
import CalenderHeader from "./CalenderHeader";

const Sidebar = () => {
  return (
    <div className="p-5 w-64">
      <CreateEventButton />
      <SmallCalender />
      <Labels />
    </div>
  );
};

export default Sidebar;
