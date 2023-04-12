const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");

const accountRouter = require("./routes/account");
const pictureRouter = require("./routes/picture");
const loginRouter = require("./routes/login");

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {}).then(() => {
  console.log("connected");
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.use("/account", accountRouter);
app.use("/picture", pictureRouter);
app.use("/login", loginRouter);

app.listen(8000, () => {
  console.log("Server is running...");
});
