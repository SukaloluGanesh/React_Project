import React, { useState, useContext } from "react";
import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DashboardLayoutSlots from "./Components/Home";
import LandingPage from "./Components/LandingPage";
import ScheduleMeLanding from "./Components/LandingPage";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Box, CircularProgress } from "@mui/material";
import Event from "./Calender/Event";
import DashboardLayoutSlotss from "./Calender/Demoo";
import PageNotFound from "./Calender/PageNotFound";

function App() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isSignedIn ? <Navigate to="/home" replace /> : <ScheduleMeLanding />
          }
        />
        <Route path="/home" element={<DashboardLayoutSlots />} />

        {/* <Route path='/events' element = {<Event/>} /> */}
        <Route path="*" element={<PageNotFound />} />
        <Route path="/events" element={<DashboardLayoutSlotss />} />
      </Routes>
    </>
  );
}

export default App;
