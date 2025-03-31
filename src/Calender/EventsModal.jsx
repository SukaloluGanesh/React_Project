import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import GlobalContext from "../Context/GlobalContext";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const EventsModal = () => {
  const { modalForEvents, setModalForEvents, setChange } =
    useContext(GlobalContext);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    date: null,
    time: null,
    location: "",
    notifyBefore: "30",
    description: "",
  });
  const { isSignedIn, user } = useUser();

  const handleInputChange = (name) => (value) => {
    setEventDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 

  const handleSubmit = async (e) => {
    const formattedDate = eventDetails.date
      ? dayjs(eventDetails.date).format("YYYY-MM-DD")
      : null;

    const formattedTime = eventDetails.time
      ? dayjs(eventDetails.time).format("HH:mm")
      : null;

    const data = {
      ...eventDetails,
      date: formattedDate,
      time: formattedTime,
      email: user.primaryEmailAddress.emailAddress,
      username: user.username,
    };

    try {
      const response = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.tokenIdentifier}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      setEventDetails({
        title: "",
        date: null,
        time: null,
        location: "",
        notifyBefore: "30",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };

  const handleCancel = () => {
    setModalForEvents(false);
    setEventDetails({
      title: "",
      date: null,
      time: null,
      location: "",
      notifyBefore: "30",
      description: "",
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          maxWidth: 400,
          margin: "auto",
          position: "absolute",
          zIndex: 3,
          // left: "30rem",
          top: "5rem",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Create New Event
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Title"
                variant="outlined"
                value={eventDetails.title}
                onChange={(e) => handleInputChange("title")(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <DatePicker
                label="Event Date"
                value={eventDetails.date}
                onChange={handleInputChange("date")}
                slotProps={{ textField: { fullWidth: true } }}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TimePicker
                label="Event Time"
                value={eventDetails.time}
                onChange={handleInputChange("time")}
                slotProps={{ textField: { fullWidth: true } }}
                required
              />
            </Grid>

            {/* Location */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                value={eventDetails.location}
                onChange={(e) => handleInputChange("location")(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Notify Before"
                value={eventDetails.notifyBefore}
                onChange={(e) =>
                  handleInputChange("notifyBefore")(e.target.value)
                }
              >
                <MenuItem value="15">15 Minutes</MenuItem>
                <MenuItem value="30">30 Minutes</MenuItem>
                <MenuItem value="60">1 Hour</MenuItem>
                <MenuItem value="120">2 Hours</MenuItem>
              </TextField>
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                value={eventDetails.description}
                onChange={(e) =>
                  handleInputChange("description")(e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Create Event
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </LocalizationProvider>
  );
};

export default EventsModal;
