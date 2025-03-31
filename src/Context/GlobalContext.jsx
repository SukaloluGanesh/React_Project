import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  smallCalenderMonth: 0,
  setSmallCalenderMonth: (index) => {},
  daySelected: null,
  setDaySelected: (day) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispatchCalEvent: ({ type, payload }) => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
  setlabels: () => {},
  labels: [],
  filteredEvents: [],
  change: true,
  setChange: () => {},
  setModalForEvents: () => {},
  modalForEvents: false,
  searchedEvents: [],
  setSearchedEvents: () => {},
});

export default GlobalContext;
