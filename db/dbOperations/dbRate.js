const config = require("../dbConfig");
const sql = require("mssql");

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
module.exports = {
  getRates,
  changeRate,
};
