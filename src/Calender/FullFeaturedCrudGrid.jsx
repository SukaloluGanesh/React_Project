import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Edit2, Trash2 } from "lucide-react";
import GlobalContext from "../Context/GlobalContext";
import "./EventGrid.css";

const FullFeaturedCrudGrid = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { searchedEvents, setSearchedEvents } = useContext(GlobalContext);

  const eventsPerPage = 6;

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (searchedEvents && searchedEvents.length > 0) {
      setEvents(searchedEvents);
    } else {
      fetchEvents();
    }
  }, [searchedEvents]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const nextPage = () => {
    if (currentPage < Math.ceil(events.length / eventsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent({ ...event });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    // e.preventDefault()
    try {
      if (editingEvent._id) {
        const response = await axios.put(
          `http://localhost:3000/${editingEvent._id}`,
          editingEvent
        );

        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === editingEvent._id ? response.data : event
          )
        );
      } else {
        const response = await axios.post(
          "http://localhost:3000/",
          editingEvent
        );

        setEvents((prevEvents) => [...prevEvents, response.data]);
      }

      setIsModalOpen(false);
      setEditingEvent(null);
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/${_id}`);

      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== _id)
      );
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setEditingEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="event-grid-container container p-6  h-90vh w-100%">
      <div className="event-grid grid grid-cols-3 grid-rows-2 gap-6 h-70vh">
        {currentEvents.map((event) => (
          <div
            key={event.id}
            className="cards    bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl p-5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3 truncate">
              {event.title}
            </h3>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-semibold">Date:</span> {event.date}
              </p>
              <p>
                <span className="font-semibold">Time:</span> {event.time}
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {event.location}
              </p>
            </div>

            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={() => handleEdit(event)}
                className="text-blue-500 hover:text-blue-700 bg-blue-100 p-2 rounded-full transition-all duration-300 hover:bg-blue-200"
              >
                <Edit2 size={20} />
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                className="text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-full transition-all duration-300 hover:bg-red-200"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-300 transition-colors"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {Math.ceil(events.length / eventsPerPage)}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage >= Math.ceil(events.length / eventsPerPage)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-300 transition-colors"
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-96 p-6 relative">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {editingEvent.id ? "Edit Event" : "Create Event"}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={editingEvent.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="date"
                value={editingEvent.date}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                name="time"
                value={editingEvent.time}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={editingEvent.location}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="notifyBefore"
                placeholder="Notify Before (minutes)"
                value={editingEvent.notifyBefore}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={editingEvent.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullFeaturedCrudGrid;
