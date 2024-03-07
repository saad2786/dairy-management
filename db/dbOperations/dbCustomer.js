const config = require("../dbConfig");
const sql = require("mssql");

const getCustomers = async (dairyId) => {
  try {
    let pool = await sql.connect(config);
    let customers = await pool.request().query(`SELECT  [CUSTOMER_ID]
        ,[CUSTOMER_NAME]
        ,[DAIRY_ID]
        ,[CATTLE_TYPE]
        ,[PHONE_NO]
        ,[STATUS]
    FROM [DAIRY].[dbo].[CUSTOMER_MASTER] WHERE DAIRY_ID = ${dairyId}`);
    return customers;
  } catch (err) {
    console.log(err);
  }
};
const createCustomers = async ({ name, dairyId, cattle, phone }) => {
  try {
    let pool = await sql.connect(config);

    let res = await pool
      .request()
      .query(
        `INSERT INTO CUSTOMER_MASTER VALUES ('${name}',${dairyId}, ${cattle}, '${phone}', 1)`,
      );
    return res;
  } catch (err) {
    console.log(err);
  }
};
const deleteCustomer = async (customerId) => {
  try {
    let pool = await sql.connect(config);
    let status = await pool.request().query(`SELECT
    [STATUS]
     FROM [DAIRY].[dbo].[CUSTOMER_MASTER] WHERE CUSTOMER_ID = ${customerId}`);

    status = await status?.recordset[0]?.STATUS;
    let res = await pool
      .request()
      .query(
        `UPDATE CUSTOMER_MASTER SET STATUS = ${status ? 0 : 1} WHERE CUSTOMER_ID = ${customerId}`,
      );

    return res;
  } catch (err) {
    return { message: err.message };
  }
};
module.exports = {
  getCustomers,
  createCustomers,
  deleteCustomer,
};
