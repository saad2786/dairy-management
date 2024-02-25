const router = require("express").Router();
const dbOperation = require("../../db/dbOperation");

router.post("/", async (req, res) => {
  const dairyId = req.body.dairyId;
  try {
    const result = await dbOperation.getTransactions(dairyId);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
});

//*Create Transaction
router.post("/new", async (req, res) => {
  try {
    const result = await dbOperation.createTransaction(req.body);
    console.log(result);
    if (result) {
      res.status(200).send("Successfully created customer");
    } else {
      res.status(400).send("Inputs are invalid!");
    }
  } catch (err) {
    res.status(500).send("Somthing went wrong!");
  }
});

module.exports = router;
