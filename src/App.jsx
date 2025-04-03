// import React, { useState, useContext } from "react";
// import "./App.css";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import DashboardLayoutSlots from "./Components/Home";
// import LandingPage from "./Components/LandingPage";
// import ScheduleMeLanding from "./Components/LandingPage";
// import {
//   createBrowserRouter,
//   Navigate,
//   Outlet,
//   Route,
//   Router,
//   Routes,
// } from "react-router-dom";
// // import { useAuth } from "@clerk/clerk-react";
// import { Box, CircularProgress } from "@mui/material";
// import Event from "./Calender/Event";
// import DashboardLayoutSlotss from "./Calender/Demoo";
// import PageNotFound from "./Calender/PageNotFound";
// import Login from "./firebase/Login";
// import {auth,provider} from './firebase/Firebase';
// function App() {
//   const { isSignedIn, isLoaded } = auth;

//   if (!isLoaded) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             isSignedIn ? <Navigate to="/home" replace /> : <ScheduleMeLanding />
//           }
//         />
//         {/* <Route path="/" element = {<ScheduleMeLanding/>} /> */}
//         <Route path="/home" element={<DashboardLayoutSlots />} />

//         {/* <Route path='/events' element = {<Event/>} /> */}
//         <Route path="*" element={<PageNotFound />} />
//         <Route path="/events" element={<DashboardLayoutSlotss />} />
//         <Route path="/Login" element = {<Login/>}/>
//       </Routes>
//     </>
//   );
// }

// export default App;


import React from "react";
import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DashboardLayoutSlots from "./Components/Home";
import ScheduleMeLanding from "./Components/LandingPage";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import DashboardLayoutSlotss from "./Calender/Demoo";
import PageNotFound from "./Calender/PageNotFound";
import Login from "./firebase/Login";
import { auth } from './firebase/Firebase';
import Register from './firebase/Register';

function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
   
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    
    return () => unsubscribe();
  }, []);

 
  if (loading) {
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/home" /> : <ScheduleMeLanding />} 
        />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/home" /> : <Login />} 
        />
        <Route 
          path="/home" 
          element={user ? <DashboardLayoutSlots /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/events" 
          element={user ? <DashboardLayoutSlotss /> : <Navigate to="/login" />} 
        />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/register" element = {<Register/>} />
      </Routes>
    </LocalizationProvider>
  );
}

export default App;