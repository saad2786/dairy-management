const config = require("../dbConfig");
const sql = require("mssql");

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
    console.log(res);
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
module.exports = {
  getTransactions,
  createTransaction,
};
