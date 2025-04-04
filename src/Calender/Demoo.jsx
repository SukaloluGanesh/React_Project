// import * as React from "react";
// import PropTypes from "prop-types";
// import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton";
// import Stack from "@mui/material/Stack";
// import Chip from "@mui/material/Chip";
// import TextField from "@mui/material/TextField";
// import Tooltip from "@mui/material/Tooltip";
// import Typography from "@mui/material/Typography";
// import { createTheme } from "@mui/material/styles";
// import CloudCircleIcon from "@mui/icons-material/CloudCircle";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import SearchIcon from "@mui/icons-material/Search";
// import { AppProvider } from "@toolpad/core/AppProvider";
// import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
// import { useDemoRouter } from "@toolpad/core/internal";
// import EventsModal from "./EventsModal";
// import SmallCalender from "./SmallCalender";
// import CreateEventButton from "./CreateEventButton";
// import GlobalContext from "../Context/GlobalContext";
// import EventSideBar from "./EventSideBar";
// import Event from "./Event";
// import "./demoo.css";

// import { useNavigate } from "react-router-dom";
// import { useEffect, useState, useContext } from "react";
// import CalenderHeader from "./CalenderHeader";
// import axios from "axios";
// import ColorToggleButton from "./ToggleButton";
// import { signOut } from 'firebase/auth';
// import { Button } from "@mui/material";
// import { auth, provider } from '../firebase/Firebase';
// import AccountDemoSignedIn from "../firebase/Account";

// const demoTheme = createTheme({
//   cssVariables: {
//     colorSchemeSelector: "data-toolpad-color-scheme",
//   },
//   colorSchemes: { light: true, dark: true },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// function DemoPageContent({ pathname }) {
//   const { change } = React.useContext(GlobalContext);
//   return (
//     <Box
//       sx={{
//         py: 4,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         textAlign: "center",
//       }}
//     >
//       {<Event />}
//     </Box>
//   );
// }

// DemoPageContent.propTypes = {
//   pathname: PropTypes.string.isRequired,
// };

// function ToolbarActionsSearch() {
//   const [events, setEvents] = useState([]);
//   const [searchData, setSearchData] = useState("");
//   const { setSearchedEvents } = useContext(GlobalContext);

//   const navigate = useNavigate();


//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       localStorage.clear();
//       navigate("/");
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get("https://react-project-backend-tbs6.onrender.com");
//       setEvents(response.data);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const searchTerm = e.target.value;
//     setSearchData(searchTerm);
//   };

//   useEffect(() => {
//     if (searchData.trim() !== "") {
//       const filteredEvents = events.filter((event) =>
//         event.title.toLowerCase().includes(searchData.toLowerCase())
//       );
//       setSearchedEvents(filteredEvents);
//     } else {
//       setSearchedEvents([]);
//     }
//   }, [searchData, events, setSearchedEvents]);

//   useEffect(() => {
//     if (searchData.trim() !== "") {
//       fetchEvents();
//     }
//   }, [searchData]);

//   return (
//     <Stack direction="row" alignItems="center" spacing={1}>
//       <Tooltip title="Search" enterDelay={1000}>
//         <IconButton
//           type="button"
//           aria-label="search"
//           sx={{
//             display: { xs: "inline", md: "none" },
//           }}
//         >
//           <SearchIcon />
//         </IconButton>
//       </Tooltip>

//       <TextField
//         label="Search"
//         variant="outlined"
//         size="small"
//         value={searchData}
//         onChange={handleChange}
//         InputProps={{
//           endAdornment: (
//             <IconButton type="button" aria-label="search" size="small">
//               <SearchIcon />
//             </IconButton>
//           ),
//         }}
//         sx={{
//           display: { xs: "none", md: "inline-block" },
//           mr: 1,
//         }}
//       />

//       <ThemeSwitcher />
//          <AccountDemoSignedIn/>
    
//     </Stack>
//   );
// }

// function SidebarFooter({ mini }) {
//   const { change } = React.useContext(GlobalContext);
//   return (
//     <Typography
//       variant="caption"
//       sx={{ m: 1, whiteSpace: "nowrap", overflow: "hidden" }}
//     >
//       {<EventSideBar />}
//     </Typography>
//   );
// }

// SidebarFooter.propTypes = {
//   mini: PropTypes.bool.isRequired,
// };

// function CustomAppTitle() {
//   return (
//     <Stack direction="row" alignItems="center" spacing={2}>
//       <Typography variant="h6"   sx={{
//         fontFamily: "cursive",
//         fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem", lg: "1.5rem" },
//       }}>
//         scheduleMe
//       </Typography>
//       <div className="hidden md:block">
     
//       <CalenderHeader />
//       </div>
//       <ColorToggleButton/>
//     </Stack>
//   );
// }

// function DashboardLayoutSlotss(props) {
//   const { window } = props;

//   const router = useDemoRouter("/dashboard");

//   const demoWindow = window !== undefined ? window() : undefined;

//   return (
//     <AppProvider router={router} theme={demoTheme} window={demoWindow}>
//       <DashboardLayout
//         slots={{
//           appTitle: CustomAppTitle,
//           toolbarActions: ToolbarActionsSearch,
//           sidebarFooter: SidebarFooter,
//         }}
//       >
//         <DemoPageContent pathname={router.pathname} />
//       </DashboardLayout>
//     </AppProvider>
//   );
// }

// DashboardLayoutSlotss.propTypes = {
//   window: PropTypes.func,
// };

// export default DashboardLayoutSlotss;



import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu"; // Added for toggle functionality
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import EventsModal from "./EventsModal";
import SmallCalender from "./SmallCalender";
import CreateEventButton from "./CreateEventButton";
import GlobalContext from "../Context/GlobalContext";
import EventSideBar from "./EventSideBar";
import Event from "./Event";
import "./demoo.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import CalenderHeader from "./CalenderHeader";
import axios from "axios";
import ColorToggleButton from "./ToggleButton";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/Firebase';
import AccountDemoSignedIn from "../firebase/Account";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  const { change } = React.useContext(GlobalContext);
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {<Event />}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function ToolbarActionsSearch() {
  const [events, setEvents] = useState([]);
  const [searchData, setSearchData] = useState("");
  const { setSearchedEvents } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("https://react-project-backend-tbs6.onrender.com");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setSearchData(searchTerm);
  };

  useEffect(() => {
    if (searchData.trim() !== "") {
      const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchData.toLowerCase())
      );
      setSearchedEvents(filteredEvents);
    } else {
      setSearchedEvents([]);
    }
  }, [searchData, events, setSearchedEvents]);

  useEffect(() => {
    if (searchData.trim() !== "") {
      fetchEvents();
    }
  }, [searchData]);

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Tooltip title="Search" enterDelay={1000}>
        <IconButton
          type="button"
          aria-label="search"
          sx={{
            display: { xs: "inline", md: "none" },
          }}
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>

      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchData}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <IconButton type="button" aria-label="search" size="small">
              <SearchIcon />
            </IconButton>
          ),
        }}
        sx={{
          display: { xs: "none", md: "inline-block" },
          mr: 1,
        }}
      />

      <ThemeSwitcher />
      <AccountDemoSignedIn/>
    </Stack>
  );
}

function SidebarFooter({ mini }) {
  const { change } = React.useContext(GlobalContext);
  return (
    <Typography
      variant="caption"
      sx={{ m: 1, whiteSpace: "nowrap", overflow: "hidden" }}
    >
      {<EventSideBar />}
    </Typography>
  );
}

SidebarFooter.propTypes = {
  mini: PropTypes.bool.isRequired,
};

function CustomAppTitle() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  
  // Direct DOM manipulation to toggle drawer
  const toggleDrawer = () => {
    const newState = !isDrawerOpen;
    setIsDrawerOpen(newState);
    
    const drawerElements = document.querySelectorAll('.MuiDrawer-root, .MuiDrawer-paper');
    drawerElements.forEach(el => {
      if (newState) {
        el.classList.remove('closed');
        el.style.width = '250px';
      } else {
        el.classList.add('closed');
        el.style.width = '0px';
      }
    });
    
    // Force layout recalculation
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <IconButton 
        onClick={toggleDrawer}
        sx={{ mr: 1 }}
        aria-label="toggle drawer"
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" sx={{
        fontFamily: "cursive",
        fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem", lg: "1.5rem" },
      }}>
        scheduleMe
      </Typography>
      <div className="hidden md:block">
        <CalenderHeader />
      </div>
      <ColorToggleButton />
    </Stack>
  );
}

function DashboardLayoutSlotss(props) {
  const { window } = props;
  const router = useDemoRouter("/dashboard");
  const demoWindow = window !== undefined ? window() : undefined;
  const dashboardRef = useRef(null);

  // Apply initial styles after component mounts
  useEffect(() => {
    // Add a class to make our CSS targeting easier
    const container = document.querySelector('.dashboard-container');
    if (container) {
      // Optional: initialize any classes or styles here
    }
  }, []);

  return (
    <div className="dashboard-container" ref={dashboardRef}>
      <AppProvider router={router} theme={demoTheme} window={demoWindow}>
        <DashboardLayout
          slots={{
            appTitle: CustomAppTitle,
            toolbarActions: ToolbarActionsSearch,
            sidebarFooter: SidebarFooter,
          }}
        >
          <DemoPageContent pathname={router.pathname} />
        </DashboardLayout>
      </AppProvider>
    </div>
  );
}

DashboardLayoutSlotss.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutSlotss;
