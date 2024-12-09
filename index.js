import moment from "moment";
import { dbGetDatabase, dbPushDataBase, getConnect } from "./db.connection.js";
import { getSubscriptionDetails } from "./utils/subscriptionCall.js";
import fs from 'fs'
const getQuery = `SELECT AA.BONUS, AA.COMPCODE, AA.DEPARTMENT, AA.DESIGNATION, AA.DOCDATE, AA.ESIPF, AA.EXOT, AA.IDCARD, AA.INDT, AA.INTIME, 
AA.MONTHLY, AA.NETAMT, AA.OT, AA.OTHERSS, AA.OUTDT, AA.OUTTIME, AA.PAYPERIOD, 
AA.SALARY, AA.SHIFT, AA.SHIFTCNT, AA.STATUS, AA.TOTOT, AA.TYPE FROM ERPDATATEMP AA `;

const deleteQuery = `delete from ERPDATATEMP`

const formatValue = (value, index, metaData) => {
    // console.log(metaData, 'metaData');

    if (metaData[index]?.dbTypeName == "DATE") {
        if (!value || !moment(value).isValid()) {
            return 'null';
        }
        return `TO_DATE('${moment(value).format("DD/MM/YYYY")}', 'DD/MM/YYYY')`;
    } else if (metaData[index]?.dbTypeName == "NUMBER") {
        if (value === null) {
            return 'null';
        }
        return value;
    } else {

        return value !== undefined ? `'${value}'` : 'null';
    }
}


const constructPushQuery = (res) => `
INSERT All   
${res.rows.map(row => `INTO ERPDATA (${res.metaData.map(i => i?.name).join(",")}) VALUES (${row.map((value, index) =>
    formatValue(value, index, res.metaData)
).join(',')}) `).join(" ")} SELECT * FROM DUAL`;

async function getRes(connection, sqlQuery) {
    try {

        const result = await connection.execute(sqlQuery)
        console.log(result, 'res');

        return result
    } catch (error) {
        console.log(error);
        return false
    }
}
async function main() {
    let connection1;
    let connection2;
    const returnData = await getSubscriptionDetails();
    if (returnData) {
        return returnData;
    }
    try {
        connection1 = await getConnect(dbGetDatabase)
        let res = await getRes(connection1, getQuery);
        // console.log(new Set(res.rows.map(i => i.length)), res.metaData.length, 'data');

        let pushQuery = constructPushQuery(res);
        console.log(pushQuery, 'getQuery');
        connection2 = await getConnect(dbPushDataBase)

        // await getRes(connection1, deleteQuery);

        await getRes(connection2, pushQuery);
        await connection2.commit();
        await connection1.commit();
    } catch (error) {
        console.log(error)
        if (connection1) {
            await connection1.rollback();
        }
        if (connection2) {
            await connection2.rollback();
        }
    } finally {
        if (connection1) {
            await connection1.close()
        }
        if (connection2) {
            await connection2.close()
        }
    }
}

main()