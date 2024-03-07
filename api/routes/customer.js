const router = require("express").Router();
const dbOperation = require("../../db/dbOperations/dbCustomer");

//GET CUSTOMER
router.post("/", async (req, res) => {
  const dairyId = req.body.dairyId;
  try {
    const result = await dbOperation.getCustomers(dairyId);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

//* CREATE NEW CUSTOMER
router.post("/new", async (req, res) => {
  try {
    console.log(req.body);
    const result = await dbOperation.createCustomers(req.body);
    if (result) {
      res.status(200).send("Successfully created customer");
    } else {
      res.status(500).send("somthing went wrong");
    }
  } catch (err) {
    console.log(err);
  }
});

//*DECTIVATE CUSTOMER
router.delete("/:customerId", async (req, res) => {
  const customerId = req.params.customerId;
  try {
    const result = await dbOperation.deleteCustomer(customerId);

    if (result.message) {
      const error = JSON.stringify(result.message);
      res.status(400).json(error);
    } else {
      res.status(200).send("Successfully Deleted");
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
