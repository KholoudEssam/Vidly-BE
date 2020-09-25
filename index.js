const express = require("express");
const home = require('./routes/home');
const genres = require('./routes/genres');
const app = express();

app.use(express.json());

app.use("/api/genres",genres);
app.use("/", home);

app.listen(3000, () => console.log("Server is running..."));


