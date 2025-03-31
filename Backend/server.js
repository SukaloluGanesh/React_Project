// const express = require("express");
// const fs = require("fs");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());

// const readDataFromFile = () => {
//   try {
//     return JSON.parse(fs.readFileSync('data.json', "utf-8"));
//   } catch (error) {
//     console.error("Error reading file:", error);
//     return [];
//   }
// };

// const writeDataToFile = (data) => {
//   try {
//     fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
//   } catch (error) {
//     console.error("Error writing file:", error);
//   }
// };

// app.post('/', (req, res) => {
//   try {
//     const readData = readDataFromFile();
//     req.body.id = readData.length ? readData[readData.length - 1].id + 1 : 1;

//     readData.push(req.body);
//     writeDataToFile(readData);

//     res.status(201).json(req.body);
//   } catch (error) {
//     console.error("Error processing request:", error);
//     res.status(500).send("Error processing your request");
//   }
// });

// app.get('/', (req, res) => {
//   try {
//     const readData = readDataFromFile();
//     res.json(readData);
//   } catch (error) {
//     console.error("Error reading data:", error);
//     res.status(500).send("Error retrieving data");
//   }
// });

// app.put('/:id', (req, res) => {
//   try {
//     const readData = readDataFromFile();
//     const id = parseInt(req.params.id);

//     const itemIndex = readData.findIndex(item => item.id === id);

//     if (itemIndex === -1) {
//       return res.status(404).send("Item not found");
//     }

//     readData[itemIndex] = { ...readData[itemIndex], ...req.body, id };

//     writeDataToFile(readData);

//     res.json(readData[itemIndex]);
//   } catch (error) {
//     console.error("Error updating item:", error);
//     res.status(500).send("Error updating item");
//   }
// });

// app.delete('/:id', (req, res) => {
//   try {
//     const readData = readDataFromFile();
//     const id = parseInt(req.params.id);

//     const filteredData = readData.filter(item => item.id !== id);

//     if (filteredData.length === readData.length) {
//       return res.status(404).send("Item not found");
//     }

//     writeDataToFile(filteredData);

//     res.status(200).send("Item deleted successfully");
//   } catch (error) {
//     console.error("Error deleting item:", error);
//     res.status(500).send("Error deleting item");
//   }
// });

// app.listen(3000, () => {
//   console.log("Server running at http://localhost:3000/");
// });

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
  .then((res) => console.log(res))
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

app.post("/", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    if (savedEvent) {
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
