var router = require("express").Router();
var dbAuth = require("../../db/dbOperations/dbAuth");
router.post("/login", async function (req, res) {
  console.log(req.body);
  try {
    const result = await dbAuth.login(req.body);
    console.log(result);
    if (result && result.recordset.length > 0)
      res.status(200).json(result.recordset);
    else res.status(400).send("User not found");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});
router.post("/signup", async function (req, res) {
  try {
    const result = await dbAuth.signup(req.body);
    if (result && result.rowsAffected.length > 0)
      res.status(200).json("Succeessfully signed up ");
    else
      res
        .status(400)
        .json(
          "Already exists a user with this userId, try with different userId ",
        );
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
