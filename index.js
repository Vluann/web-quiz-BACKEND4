const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();

const port = process.env.PORT || 3002;
const routeUsers = require("./routes/users/index.route");
const database = require("./config/database");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Trang Chủ")
});

routeUsers(app);
app.use(express.urlencoded({ extended: true }));

database.connect();
app.listen(port, () => {
    console.log(`Connection Success On Port ${port}`)
});