require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);

const port = process.env.PORT || 3005;
app.listen(port, console.log(`Listening on port ${port}...`));
