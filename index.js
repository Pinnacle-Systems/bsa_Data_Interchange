import moment from "moment";
import { dbGetDatabase, dbPushDataBase, getConnect } from "./db.connection.js";
import { getSubscriptionDetails } from "./utils/subscriptionCall.js";
import fs from 'fs'
import "dotenv/config";
import { FabricDetailsQuery, orderAllowedDetailsQuery } from "./services/dataInterChange.js";





// const getorderallowdetintQuery = `SELECT * FROM orderallowdetint WHERE ISCOMPLETE = 1 `

// const getFabricIntQuery = ` SELECT * FROM FabricINT WHERE ISCOMPLETE = 1 `


export async function getRes(connection, sqlQuery) {
    try {
        const result = await connection.execute(sqlQuery)
        return result
    } catch (error) {
        console.log(error);
        return false
    }
}

export async function updateIsCompleteFlag(connection, sqlQuery, values) {
    try {

        // console.log(sqlQuery, "sqlQuery");
        // console.log(values, "values");

        const result = await connection.execute(sqlQuery);
        await connection.commit();
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}


export async function constructUpdateQuery1(resp, field) {
    const ids = [
        ...new Set(
            resp
                .map(item => item[field])
                .filter(v => v !== undefined && v !== null)
        )
    ];
    const inClause = ids.map(id => `'${id}'`).join(', ');
    console.log(ids, "unique orderallowdetint");

    if (!ids.length) return null;

    const updateQuery = `
    UPDATE orderallowdetint
    SET ISCOMPLETE = 1
    WHERE "erp_no" IN (${inClause})
  `;
    return { query: updateQuery, values: ids };
}


export async function constructUpdateQuery2(resp, field) {
    const ids = [
        ...new Set(
            resp
                .map(item => item[field])
                .filter(v => v !== undefined && v !== null)
        )
    ];

    if (!ids.length) return null;
    console.log(ids, "unique FabricINT");


    const inClause = ids.map(id => `'${id}'`).join(', ');




    const updateQuery = `
    UPDATE FabricINT
    SET ISCOMPLETE = 1 
    WHERE "srno" IN (${inClause})
  `;

    return { query: updateQuery, values: ids };
}




const formatValue = (value, index, metaData) => {

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











async function main() {


    let connection1;
    connection1 = await getConnect(dbGetDatabase)

    try {
        


        await orderAllowedDetailsQuery(connection1)
        await FabricDetailsQuery(connection1)











    } catch (error) {
        console.log(error)
        if (connection1) {
            await connection1.rollback();
        }

    } finally {
        if (connection1) {
            await connection1.close()
        }

    }

}

main()