const express = require("express");
const validate = require("./routes/validate.route");

const app = express();

app.use(express.json());
app.use(express.static("public"));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/authorize", validate);
app.listen(3000, () => {
  console.log("app runnig on port 3000");
});
