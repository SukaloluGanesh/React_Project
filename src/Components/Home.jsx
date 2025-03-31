import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
// import App from './Calender';
import { useUser } from "@clerk/clerk-react";

import { DateCalendar } from "@mui/x-date-pickers";
import "./home.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { getMonth } from "../Calender/Utlis";
import Month from "../Calender/Month";
import Sidebar from "../Calender/Sidebar";
import CalenderHeader from "../Calender/CalenderHeader";
import Modal from "../Calender/Modal";
import GlobalContext from "../Context/GlobalContext";
import Event from "../Calender/Event";
import EventSideBar from "../Calender/EventSideBar";
import ColorToggleButton from "../Calender/ToggleButton";

console.table(getMonth(5));
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
function SidebarHeader() {
  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <DateCalendar />
    </Box>
  );
}

const UserProfile = () => {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return <p>Please sign in</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.fullName}</h2>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
      <img src={user.imageUrl} alt="User Profile" width={50} />
    </div>
  );
};

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
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, navigate]);

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
      <SignedIn>
        <UserButton />
      </SignedIn>
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

function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
     <Typography variant="h6"   sx={{
        fontFamily: "cursive",
        fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem", lg: "1.5rem" },
      }}   >
        scheduleMe
      </Typography>
      <div className="hidden md:block">
     
      <CalenderHeader />
      </div>
      <ColorToggleButton/>
    </Stack>
  );
}

function DashboardLayoutSlots(props) {
  const { window } = props;

  const router = useDemoRouter("/dashboard");

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider router={router} theme={demoTheme} window={demoWindow}>
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
          toolbarActions: ToolbarActionsSearch,
          // sidebarHeader: SidebarHeader,
          sidebarFooter: SidebarFooter,
        }}
      >
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutSlots.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutSlots;
