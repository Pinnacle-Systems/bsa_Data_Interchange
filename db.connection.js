import { createRequire } from "module";

const require = createRequire(import.meta.url);
const oracledb = require('oracledb');
oracledb.initOracleClient({ libDir: "C:\\oracle\\instantclient_19_20" });

export const dbGetDatabase = {
    user: "PSSBSA",
    password: "PSSBSA_MAY2023",
    connectString: "203.95.216.155:1556/avt06p",

};



// export const dbPushDataBase = {
//     user: "PAYLNK",
//     password: "log",
//     connectString: "192.168.1.73:1521/xe1",
// };

export const dbPushDataBase = {
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "your_password",
  server: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "ERPDB",
  options: {
    encrypt: false,          // true for Azure
    trustServerCertificate: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};



export async function getConnect(dbConfig) {

    let connection;
    try {
        connection = await oracledb.getConnection({
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        });

        return connection
    } catch (err) {
        return console.log(err);

    }
}


export async function getConnectionForSql() {
  return await sql.connect(dbConfig);
}
