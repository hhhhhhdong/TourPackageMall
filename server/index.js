const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/key.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/users", require("./routes/users"));
app.use("/api/product", require("./routes/product"));

const port = 5000;
app.listen(port, () => console.log(`Server Listening on ${port}`));
