const express = require("express");
const db = require("./db/models");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./api/middleware/passport");
const cors = require("cors");
const thingRoutes = require("./api/things/routes");
const userRoutes = require("./api/users/routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// Routes
app.use("/things", thingRoutes);
app.use(userRoutes);

// NOT FOUND PATH MIDDLEWARE
app.use((req, res, next) => {
  console.log("PATH DOESN'T EXIST");
  res.status(404).json({ message: "PATH NOT FOUND!" });
});

app.use((err, req, res, next) => {
  console.log("🚀 ~ file: app.js ~ line 31 ~ app.use ~ err", err);
  res.status(err.status || 500);
  res.json({ message: err.message || "Internal Server Error" });
});

const run = async () => {
  try {
    await db.sequelize.sync();
    // await db.sequelize.sync({ alter: true });
    // await db.sequelize.sync({ force: true });
    console.log("Connection to the database successful!");
    app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("error", error);
  }
};

run();
