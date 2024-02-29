const router = require("express").Router();
const dbOperation = require("../../db/dbOperation");

// Create Bill
router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const result = await dbOperation.createBill(req.body);

    if (result && result?.recordset?.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(500).send("Failed to create bill");
    }
  } catch (err) {
    console.error("Error creating bill:", err);
    res.status(500).send("Internal server error");
  }
});

// Update Bill
router.put("/:billId", async (req, res) => {
  const billId = req.params.billId;
  try {
    const result = await dbOperation.updateBill(billId);
    console.log(result);
    if (result) {
      res.status(200).send("Bill updated successfully");
    } else {
      res.status(404).send("Bill not found");
    }
  } catch (err) {
    console.error("Error updating bill:", err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
