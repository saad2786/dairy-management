const config = require("../dbConfig");
const sql = require("mssql");

const login = async ({ username, password }) => {
  try {
    const pool = await sql.connect(config);
    const res = await pool.request().query(`SELECT [DAIRY_ID]
    ,[DAIRY_NAME]
    ,[OWNER]
    ,[USER_ID]
    ,[PASSWORD]
  FROM [DAIRY].[dbo].[DAIRY_AUTH] WHERE USER_ID = '${username}' AND PASSWORD = '${password}' `);
    return res;
  } catch (err) {
    console.log(first);
  }
};

const signup = async ({ dairyName, owner, userId, password }) => {
  try {
    const pool = await sql.connect(config);
    const res = await pool.request()
      .query(`INSERT INTO [DAIRY].[dbo].[DAIRY_AUTH] ([DAIRY_NAME]
            ,[OWNER]
            ,[USER_ID]
            ,[PASSWORD]) VALUES('${dairyName}','${owner}','${userId}', '${password}' )`);
    return res;
  } catch (err) {
    console.log(err);
  }
};
module.exports = { login, signup };
