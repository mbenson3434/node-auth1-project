const express = require("express");

const usersRouter = require("./users/users-router");

const server = express();

// const config = {
//   name: "sessionId",
//   secret: "keep it secret, keep it safe!",
//   cookie: {
//     maxAge: 1000 * 60 * 60,
//     secure: false,
//     httpOnly: true,
//   },
//   resave: false,
//   saveUninitialized: false,
//   store: new KnexSessionStore({
//     knex: require("../database/db-config.js"), 
//     tablename: "sessions", 
//     sidfieldname: "sid",
//     createtable: true, 
//     clearInterval: 1000 * 60 * 60, 
//   }),
// };

server.use(express.json());

server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;