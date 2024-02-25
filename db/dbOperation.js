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

    return res;
  } catch (err) {
    console.log(err);
  }
};
const getRates = async (dairyId) => {
  try {
    const pool = await sql.connect(config);
    const res = await pool.request().query(
      `SELECT  [RATE_ID]
        ,[CATTLE_TYPE]
        ,[FAT]
        ,[PRICE/LTR] AS RATE
        ,[DAIRY_ID]
        ,[DATE_CURRENT]
        ,[DATE_LAST]
    FROM [DAIRY].[dbo].[RATE] WHERE DAIRY_ID = ${dairyId} AND DATE_LAST IS NULL;`,
    );
    console.log(res);

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

module.exports = {
  getCustomers,
  createCustomers,
  deleteCustomer,
  getTransactions,
  createTransaction,
  getRates,
  changeRate,
};
