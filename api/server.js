const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
const useCustomer = require("./routes/customer");
const useTransaction = require("./routes/transaction");
const useRate = require("./routes/rate");
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/customers", useCustomer);
app.use("/transactions", useTransaction);
app.use("/rates", useRate);
//* LISTEN
app.listen(8000, () => {
  console.log("running on port 8000");
});
