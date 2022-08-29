const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const route = require("./routes/route");

const port = process.env.PORT || 4000;

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//cors
app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type" });
  next();
});

mongoose
  .connect(
    "mongodb+srv://DeepakGunpal:hdg5NWwcvf2wUDTN@deepakcluster0.hynna.mongodb.net/urlShortner",
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongo is connected"))
  .catch((error) => console.log(error));

app.use("/", route);

app.listen(port, function () {
  console.log(`Express app runnig on port ${port}`);
});
