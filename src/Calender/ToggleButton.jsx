import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useNavigate, useLocation, Link } from "react-router-dom";
import GlobalContext from "../Context/GlobalContext";

export default function ColorToggleButton({ isDarkMode = false }) {
  const { setChange } = React.useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  const getInitialAlignment = () => {
    const path = location.pathname;
    return path === "/home" ? "web" : path === "/events" ? "android" : "web";
  };

  const [alignment, setAlignment] = React.useState(getInitialAlignment());

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);

      if (newAlignment === "web") {
        navigate("/home");
        // setChange(true);
      } else {
        navigate("/events");
        // setChange(false);
      }
    }
  };

  const buttonStyles = {
    padding: "8px",
    fontSize: "10px",
    color: isDarkMode ? "#90caf9" : "#1976d2",
    backgroundColor: "transparent",
    "&.Mui-selected": {
      backgroundColor: "transparent",
      color: isDarkMode ? "#ffffff" : "#1976d2",
      borderBottom: `2px solid ${isDarkMode ? "#90caf9" : "#1976d2"}`,
    },
    "&:hover": {
      backgroundColor: isDarkMode
        ? "rgba(211, 202, 202, 0.08)"
        : "rgba(25,118,210,0.04)",
    },
  };

  return (
    <ToggleButtonGroup
      color={isDarkMode ? "info" : "primary"}
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{
        marginLeft: "50px",
        backgroundColor: "transparent",
        border: `1px solid ${isDarkMode ? "#616161" : "#e0e0e0"}`,
        borderRadius: "8px",
      }}
    >
      <ToggleButton value="web" sx={buttonStyles} aria-label="Calendar View">
        <CalendarMonthIcon />
      </ToggleButton>
      <ToggleButton value="android" sx={buttonStyles} aria-label="Add Task">
        <AddTaskIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
