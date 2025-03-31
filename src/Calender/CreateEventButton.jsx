import React, { useContext } from "react";
import plusing from "../assets/plus.svg";
import GlobalContext from "../Context/GlobalContext";
const CreateEventButton = () => {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <>
      <button
        className="border p-2 rounded-full flex items-center shadow-md hover:shadow"
        onClick={() => setShowEventModal(true)}
      >
        <img src={plusing} alt="Create Event" className="w-7 h-7" />
        <span className="pl-3 pr-7">Create</span>
      </button>
    </>
  );
};

export default CreateEventButton;
