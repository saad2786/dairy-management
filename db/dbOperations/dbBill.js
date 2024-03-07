const config = require("../dbConfig");
const sql = require("mssql");

const createBill = async ({ fromDate, toDate, customerId, dairyId }) => {
  try {
    console.log(fromDate, toDate, customerId, dairyId);

    let pool = await sql.connect(config);
    await pool
      .request()
      .query(
        `EXEC usp_TotalPayingBill ${customerId},${dairyId},'${fromDate}','${toDate}'`,
      );
    const res = await pool.request().query(`SELECT *
      FROM [DAIRY].[dbo].[BILL] WHERE CUSTOMER_ID=${customerId} AND DAIRY_ID = ${dairyId}`);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};
const updateBill = async (billId) => {
  try {
    let pool = await sql.connect(config);
    let res = await pool
      .request()
      .query(`UPDATE BILL SET STATUS = ${1} WHERE BILL_ID = ${billId}`);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  createBill,
  updateBill,
};
