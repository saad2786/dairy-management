const router = require("express").Router();
const dbOperation = require("../../db/dbOperation");

router.post("/", async (req, res) => {
  const dairyId = req.body.dairyId;
  try {
    const result = await dbOperation.getRates(dairyId);
    console.log(result);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json("Somthing went wrong");
  }
});

//*Change Rate
router.post("/new", async (req, res) => {
  try {
    const result = await dbOperation.changeRate(req.body);
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
