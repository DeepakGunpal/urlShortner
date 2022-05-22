const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const route = require("./routes/route");

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

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
