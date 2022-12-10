const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./routes/route");
require('dotenv').config();

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "*"
}));

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => console.log("mongo is connected"))
  .catch((error) => console.log(error));

app.use("/url", route);

app.listen(port, function () {
  console.log(`Express app runnig on port ${port}`);
});
