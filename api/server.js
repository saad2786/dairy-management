const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
const customerRouter = require("./routes/customer");
const transactionRouter = require("./routes/transaction");
const rateRouter = require("./routes/rate");
const billRouter = require("./routes/bill");
var authRouter = require("./routes/auth");
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/customers", customerRouter);
app.use("/transactions", transactionRouter);
app.use("/rates", rateRouter);
app.use("/bills", billRouter);
app.use("/auth", authRouter);

//* LISTEN
app.listen(8000, () => {
  console.log("running on port 8000");
});
