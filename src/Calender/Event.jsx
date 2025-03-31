import React, { useContext } from "react";
import GlobalContext from "../Context/GlobalContext";
import BasicModalDialog from "./EventsModal";
import FullFeaturedCrudGrid from "./FullFeaturedCrudGrid";

const Event = () => {
  const { modalForEvents, setModalForEvents } = useContext(GlobalContext);

  return (
    <>
      {modalForEvents && <BasicModalDialog />}
      <h5 style={{ fontFamily: "sans-serif", fontSize: "1.5em" }}>Events</h5>

      <FullFeaturedCrudGrid />
    </>
  );
};

export default Event;
