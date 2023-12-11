// This will file serve as an entry point for the application

// Dependency
// Include the module / packages to be used in the application
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/course");
const bcrypt = require("bcrypt");

// Environment setup
const port = 4000;

// Cross Origin Resource Sharing
// Enables our server to be accesed by any frontend application even with different domain
const cors = require("cors");
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("", // Add connection string
  {
    useNewUrlParser: true, // For parsing/reading connection string
    useUnifiedTopology: true, // Assures that our application uses mongodb latest servers when connecting with mongo database
  }
);
mongoose.connection.once("open", () =>
  console.log("Now connected to MongoDB Atlas")
);

app.use("/users", userRoutes);
app.use("/courses", courseRoutes);

// process.env.PORT - online environement port
app.listen(process.env.PORT || port, () => {
  console.log(`API is now online on port ${process.env.PORT || port}`);
});

//
