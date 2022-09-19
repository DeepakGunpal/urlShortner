const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/route");
require('dotenv').config();

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors
app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type" });
  next();
});

if (process.env.NODE_ENV == "production") {

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}


mongoose
  .connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongo is connected"))
  .catch((error) => console.log(error));

app.use("/url", route);

app.listen(port, function () {
  console.log(`Express app runnig on port ${port}`);
});
