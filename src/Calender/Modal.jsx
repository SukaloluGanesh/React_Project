import React, { useContext, useState } from "react";
import GlobalContext from "../Context/GlobalContext";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

const Modal = () => {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
    change,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calenderEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calenderEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calenderEvent });
    }

    setShowEventModal(false);

    setTitle("");
    setDescription("");
    setSelectedLabel(labelsClasses[0]);
  }

  const getLabelClass = (label) => {
    const labelClasses = {
      indigo: "bg-indigo-500",
      gray: "bg-gray-500",
      green: "bg-green-500",
      blue: "bg-blue-500",
      red: "bg-red-500",
      purple: "bg-purple-500",
    };
    return labelClasses[label] || "bg-indigo-500";
  };

  return (
    <div
      className="h-screen w-full fixed left-0 top-0 flex justify-center items-center"
      aria-hidden="true"
      role="dialog"
      aria-labelledby="modal-title"
      tabIndex={-1}
    >
      <form
        className="bg-white rounded-lg shadow-lg w-1/3 max-w-md p-6 max-h-screen overflow-y-auto w-full md:w-2/3 lg:w-1/3 max-w-md p-6 h-screen md:h-auto flex flex-col "
        onSubmit={handleSubmit}
        style={{
          height : "55vh"
        }}
      >
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center rounded-t-lg">
          <span className="material-icons-outlined text-gray-500">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <button
                type="button"
                className="material-icons-outlined text-gray-500 cursor-pointer"
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                }}
              >
                delete
              </button>
            )}
            <button
              type="button"
              className="material-icons-outlined text-gray-500 cursor-pointer"
              onClick={() => setShowEventModal(false)}
            >
              close
            </button>
          </div>
        </header>

        <div className="p-4">
          <div className="grid grid-cols-6 gap-y-6 items-center">
            <span className="material-icons-outlined text-gray-500 col-span-1">
              title
            </span>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-5 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-700 text-lg font-semibold"
            />

            <span className="material-icons-outlined text-gray-500 col-span-1">
              schedule
            </span>
            <p className="col-span-5 text-gray-600">
              {daySelected.format("dddd, MMMM DD")}
            </p>

            <span className="material-icons-outlined text-gray-500 col-span-1">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-5 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500 text-gray-700"
            />

            <span className="material-icons-outlined text-gray-400 col-span-1">
              bookmark_border
            </span>
            <div className="col-span-5 flex gap-x-3">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`${getLabelClass(lblClass)} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:opacity-75`}
                  aria-label={`Select ${lblClass} label`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <footer className="flex justify-end mt-4">
          <button
            type="button"
            onClick={() => setShowEventModal(false)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default Modal;
