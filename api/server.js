const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
const useCustomer = require("./routes/customer");
const useTransaction = require("./routes/transaction");
const useRate = require("./routes/rate");
const useBill = require("./routes/bill");
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/customers", useCustomer);
app.use("/transactions", useTransaction);
app.use("/rates", useRate);
app.use("/bills", useBill);
//* LISTEN
app.listen(8000, () => {
  console.log("running on port 8000");
});
