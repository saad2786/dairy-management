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
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
