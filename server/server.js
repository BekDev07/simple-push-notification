require("dotenv").config();
const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const subscriptions = {};
const users = [];

webpush.setVapidDetails(
  "mailto:peterparker0609@protonmail.com",
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

app.post("/subscribe", (req, res) => {
  const { subscription, username } = req.body;
  subscriptions[username] = subscription;
  res.status(201).json({});
});

app.post("/register", (req, res) => {
  const { username } = req.body;
  users.push({ username });

  const payload = JSON.stringify({ title: `User ${username} registered` });
  Object.values(subscriptions).forEach((subscription) => {
    webpush
      .sendNotification(subscription, payload)
      .catch((error) => console.error(error.stack));
  });

  res.status(201).json({ message: `User ${username} registered` });
});

app.post("/login", (req, res) => {
  const { username } = req.body;
  const userExists = users.find((user) => user.username === username);

  if (userExists) {
    const payload = JSON.stringify({ title: `User ${username} logged in` });
    Object.values(subscriptions).forEach((subscription) => {
      webpush
        .sendNotification(subscription, payload)
        .catch((error) => console.error(error.stack));
    });
    res.status(200).json({ message: `User ${username} logged in` });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.listen(5000, () => console.log("Server started on port 5000"));
