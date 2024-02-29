const config = require("./dbConfig");
const sql = require("mssql");

const getCustomers = async (dairyId) => {
  try {
    let pool = await sql.connect(config);
    let customers = await pool.request().query(`SELECT  [CUSTOMER_ID]
      ,[CUSTOMER_NAME]
      ,[DAIRY_ID]
      ,[CATTLE_TYPE]
      ,[PHONE_NO]
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
        `INSERT INTO CUSTOMER_MASTER VALUES ('${name}',${dairyId}, ${cattle}, '${phone}')`,
      );

    return res;
  } catch (err) {
    console.log(err);
  }
};
const deleteCustomer = async (customerId) => {
  try {
    let pool = await sql.connect(config);
    let res = await pool
      .request()
      .query(`DELETE FROM CUSTOMER_MASTER WHERE CUSTOMER_ID = ${customerId}`);

    return res;
  } catch (err) {
    return { message: err.message };
  }
};

const getTransactions = async (dairyId) => {
  try {
    const pool = await sql.connect(config);
    const res = await pool.request().query(`SELECT  [ID]
    ,[CUSTOMER_ID]
    ,[CATTLE_TYPE]
    ,[FAT]
    ,[QTY]
    ,[DATE]
    ,[PRICE]
FROM [DAIRY].[dbo].[DAIRY_TRANSACTION] WHERE DAIRY_ID = ${dairyId}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const createTransaction = async ({
  customerId,
  dairyId,
  cattle,
  fat,
  quantity,
}) => {
  try {
    let pool = await sql.connect(config);
    let res = await pool
      .request()
      .query(
        `EXEC usp_InsertDairyTransaction ${customerId}, ${dairyId},'${cattle}',${fat},${quantity}`,
      );

    return res.rowsAffected.length;
  } catch (err) {
    return err;
  }
};
const getRates = async (dairyId) => {
  try {
    const pool = await sql.connect(config);
    const res = await pool
      .request()
      .query(
        `SELECT  * FROM [DAIRY].[dbo].[RATE] WHERE DAIRY_ID = ${dairyId} AND DATE_LAST IS NULL;`,
      );

    return res;
  } catch (err) {
    console.log(err);
  }
};
const changeRate = async ({ dairyId, cattle, fat, rate }) => {
  try {
    let pool = await sql.connect(config);
    let res = await pool
      .request()
      .query(
        `EXEC usp_InsertRatemaster '${cattle}', ${fat}, ${rate}, ${dairyId};`,
      );

    return res;
  } catch (err) {
    console.log(err);
  }
};
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
  getCustomers,
  createCustomers,
  deleteCustomer,
  getTransactions,
  createTransaction,
  getRates,
  changeRate,
  createBill,
  updateBill,
};
