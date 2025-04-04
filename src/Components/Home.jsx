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


// import { DateCalendar } from "@mui/x-date-pickers";
// import "./home.css";


// import { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";

// import { getMonth } from "../Calender/Utlis";
// import Month from "../Calender/Month";
// import Sidebar from "../Calender/Sidebar";
// import CalenderHeader from "../Calender/CalenderHeader";
// import Modal from "../Calender/Modal";
// import GlobalContext from "../Context/GlobalContext";
// import Event from "../Calender/Event";
// import EventSideBar from "../Calender/EventSideBar";
// import ColorToggleButton from "../Calender/ToggleButton";
// import { signOut } from 'firebase/auth';
// import { Button } from "@mui/material";
// import { auth, provider } from '../firebase/Firebase';
// import AccountDemoSignedIn from "../firebase/Account";
// console.table(getMonth(5));
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
// function SidebarHeader() {
//   return (
//     <Box sx={{ p: 2, textAlign: "center" }}>
//       <DateCalendar />
//     </Box>
//   );
// }


// function DemoPageContent({ pathname }) {
//   const { monthIndex, showEventModal, change } = useContext(GlobalContext);
//   const [currentMonth, SetCurrentMonth] = useState(getMonth());

//   useEffect(() => {
//     SetCurrentMonth(getMonth(monthIndex));
//   }, [monthIndex]);
//   return (
//     <Box
//       sx={{
//         py: 0,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         textAlign: "center",
//       }}
//     >
//       <Typography
//         component="div"
//         sx={{
//           overflowY: "hidden",
//           height: "90vh",
//         }}
//       >
//         {change && (
//           <>
//             <Month month={currentMonth} />
//             {showEventModal && <Modal />}
//           </>
//         )}
//       </Typography>
//     </Box>
//   );
// }

// DemoPageContent.propTypes = {
//   pathname: PropTypes.string.isRequired,
// };

// function ToolbarActionsSearch() {
 
//   const navigate = useNavigate();

 
// const handleLogout = async () => {
//   try {
//     await signOut(auth);
//     localStorage.clear();
//     navigate("/");
//   } catch (error) {
//     console.error("Error signing out:", error);
//   }
// };
//   return (
//     <Stack direction="row">
//       <Tooltip title="Search" enterDelay={1000}>
//         <div>
//           <IconButton
//             type="button"
//             aria-label="search"
//             sx={{
//               display: { xs: "inline", md: "none" },
//             }}
//           >
//             <SearchIcon />
//           </IconButton>
//         </div>
//       </Tooltip>

//       <ThemeSwitcher />
   


// <AccountDemoSignedIn/>

//     </Stack>
//   );
// }

// function SidebarFooter({ mini }) {
//   const { change } = useContext(GlobalContext);
//   return (
//     <Typography
//       variant="caption"
//       sx={{ m: 1, whiteSpace: "nowrap", overflow: "hidden" }}
//     >
//       {change && <Sidebar />}
//     </Typography>
//   );
// }

// SidebarFooter.propTypes = {
//   mini: PropTypes.bool.isRequired,
// };

// function CustomAppTitle() {
//   return (
//     <Stack direction="row" alignItems="center" spacing={2}>
//      <Typography variant="h6"   sx={{
//         fontFamily: "cursive",
//         fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem", lg: "1.5rem" },
//       }}   >
//         scheduleMe
//       </Typography>
//       <div className="hidden md:block">
     
//       <CalenderHeader />
//       </div>
//       <ColorToggleButton/>
//     </Stack>
//   );
// }

// function DashboardLayoutSlots(props) {
//   const { window } = props;

//   const router = useDemoRouter("/dashboard");

//   const demoWindow = window !== undefined ? window() : undefined;

//   return (
//     <div className="dashboard-container">
//     <AppProvider router={router} theme={demoTheme} window={demoWindow}>
//       <DashboardLayout
//         slots={{
//           appTitle: CustomAppTitle,
//           toolbarActions: ToolbarActionsSearch,
//           // sidebarHeader: SidebarHeader,
//           sidebarFooter: SidebarFooter,
//         }}
//       >
//         <DemoPageContent pathname={router.pathname} />
//       </DashboardLayout>
//     </AppProvider>
//     </div>
//   );
// }

// DashboardLayoutSlots.propTypes = {
//   window: PropTypes.func,
// };

// export default DashboardLayoutSlots;


import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu"; // Added menu icon for toggle
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { DateCalendar } from "@mui/x-date-pickers";
import "./home.css";

import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { getMonth } from "../Calender/Utlis";
import Month from "../Calender/Month";
import Sidebar from "../Calender/Sidebar";
import CalenderHeader from "../Calender/CalenderHeader";
import Modal from "../Calender/Modal";
import GlobalContext from "../Context/GlobalContext";
import ColorToggleButton from "../Calender/ToggleButton";
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
  const { monthIndex, showEventModal, change } = useContext(GlobalContext);
  const [currentMonth, SetCurrentMonth] = useState(getMonth());

  useEffect(() => {
    SetCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  
  return (
    <Box
      sx={{
        py: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        component="div"
        sx={{
          overflowY: "hidden",
          height: "90vh",
        }}
      >
        {change && (
          <>
            <Month month={currentMonth} />
            {showEventModal && <Modal />}
          </>
        )}
      </Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function ToolbarActionsSearch() {
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
  
  return (
    <Stack direction="row">
      <Tooltip title="Search" enterDelay={1000}>
        <div>
          <IconButton
            type="button"
            aria-label="search"
            sx={{
              display: { xs: "inline", md: "none" },
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>

      <ThemeSwitcher />
      <AccountDemoSignedIn />
    </Stack>
  );
}

function SidebarFooter({ mini }) {
  const { change } = useContext(GlobalContext);
  return (
    <Typography
      variant="caption"
      sx={{ m: 1, whiteSpace: "nowrap", overflow: "hidden" }}
    >
      {change && <Sidebar />}
    </Typography>
  );
}

SidebarFooter.propTypes = {
  mini: PropTypes.bool.isRequired,
};

function SidebarHeader() {
  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <DateCalendar />
    </Box>
  );
}

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
        sx={{ mr:7, mt :3 }}
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

function DashboardLayoutSlots(props) {
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
            sidebarHeader: SidebarHeader,
            sidebarFooter: SidebarFooter,
          }}
        >
          <DemoPageContent pathname={router.pathname} />
        </DashboardLayout>
      </AppProvider>
    </div>
  );
}

DashboardLayoutSlots.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutSlots;