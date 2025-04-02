
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const env = require("dotenv");
const axios = require("axios");
env.config();
app.use(cors());
app.use(express.json());

const monogoDB_Uri = process.env.MONGO_ID;

mongoose
  .connect(monogoDB_Uri)
  .then((res) => (res))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  location: String,
  description: String,
  email: String,
  username: String,
  notifyBefore: Number,
});
const Event = mongoose.model("Event", userSchema);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmailForNewEvent = (event, type) => {
  if (type == "post") {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: event.email,
      subject: `New Event Added: ${event.title}`,
      text: `Hello ${event.username},  \n\nYou have successfully added a new event:\n\n
      🔹 Title: ${event.title}
      📅 Date: ${event.date}
      ⏰ Time: ${event.time}
      📍 Location: ${event.location}
      📝 Description: ${event.description}
      
      Thank you for using SchedulMe! 🎉`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`Error sending email to ${event.email}:`, error);
      } else {
        console.log(` Email sent to ${event.email}:`, info.response);
      }
    });
  } else if (type == "put") {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: event.email,
      subject: ` Event Updated: ${event.title}`,
      text: `Hello ${event.username},  \n\nYou have successfully Updated the event:\n\n
      🔹 Title: ${event.title}
      📅 Date: ${event.date}
      ⏰ Time: ${event.time}
      📍 Location: ${event.location}
      📝 Description: ${event.description}
      
      Thank you for using SchedulMe! 🎉`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`Error sending email to ${event.email}:`, error);
      } else {
        console.log(` Email sent to ${event.email}:`, info.response);
      }
    });
  } else if (type == "delete") {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: event.email,
      subject: ` Event Deleted: ${event.title}`,
      text: `Hello ${event.username}, \n\nYou have Deleted the event:\n\n
      🔹 Title: ${event.title}
      📅 Date: ${event.date}
      ⏰ Time: ${event.time}
      📍 Location: ${event.location}
      📝 Description: ${event.description}
      
      Thank you for using SchedulMe! 🎉`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`Error sending email to ${event.email}:`, error);
      } else {
        console.log(` Email sent to ${event.email}:`, info.response);
      }
    });
  }
};


app.post("/", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    console.log(savedEvent,"saved event")
    if (savedEvent) {
      console.log('sendEmailfornewEvent')
      sendEmailForNewEvent(savedEvent, "post");
    }

    res.send(savedEvent);
  } catch (err) {
    console.log(err);
  }
});

app.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (err) {
    console.log(err);
  }
});

app.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    sendEmailForNewEvent(updatedEvent, "put");
    res.send(updatedEvent);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const deleteEvent = await Event.findByIdAndDelete(req.params.id);
    sendEmailForNewEvent(deleteEvent, "delete");
    res.send(deleteEvent);
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});

// nodemailer


