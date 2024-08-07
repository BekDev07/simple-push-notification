const webpush = require("web-push");
require("dotenv").config();
// console.log(process.env.PUBLIC_VAPID_KEY);

webpush.setVapidDetails(
  "mailto:peterparker0609@protonmail.com",
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);
