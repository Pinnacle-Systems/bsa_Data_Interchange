import moment from "moment";
import { dbGetDatabase, dbPushDataBase, getConnect } from "./db.connection.js";
import { getSubscriptionDetails } from "./utils/subscriptionCall.js";
import fs from 'fs'
import "dotenv/config";
import { BomIntcDetailsQuery, CmtIntcDetailsQuery, FabricDetailsQuery, orderAllowedDetailsQuery } from "./services/dataInterChange.js";





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
    console.log(ids.length, "unique orderallowdetint");

    if (!ids.length) return null;

    const queries = [];
    for (let i = 0; i < ids.length; i += 1000) {
        const inClause = ids.slice(i, i + 1000).map(id => `'${id}'`).join(', ');
        queries.push(`
    UPDATE orderallowdetint
    SET ISCOMPLETE = 1
    WHERE "erp_no" IN (${inClause})
  `);
    }

    return { queries, values: ids };
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
    console.log(ids.length, "unique FabricINT");

    const queries = [];
    for (let i = 0; i < ids.length; i += 1000) {
        const inClause = ids.slice(i, i + 1000).map(id => `'${id}'`).join(', ');
        queries.push(`
    UPDATE FabricINT
    SET ISCOMPLETE = 1 
    WHERE "srno" IN (${inClause})
  `);
    }

    return { queries, values: ids };
}



export async function constructUpdateQuery3(resp, field) {
    const ids = [
        ...new Set(
            resp
                .map(item => item[field])
                .filter(v => v !== undefined && v !== null)
        )
    ];

    if (!ids.length) return null;
    console.log(ids.length, "unique CMTINT");

    const queries = [];
    for (let i = 0; i < ids.length; i += 1000) {
        const inClause = ids.slice(i, i + 1000).map(id => `'${id}'`).join(', ');
        queries.push(`
    UPDATE CMTINT
    SET ISCOMPLETE = 1 
    WHERE "SR NO" IN (${inClause})
  `);
    }

    return { queries, values: ids };
}

export async function constructUpdateQuery4(resp, field) {
    const ids = [
        ...new Set(
            resp
                .map(item => item[field])
                .filter(v => v !== undefined && v !== null)
        )
    ];

    if (!ids.length) return null;
    console.log(ids.length, "unique BOMINT");

    const queries = [];
    for (let i = 0; i < ids.length; i += 1000) {
        const inClause = ids.slice(i, i + 1000).map(id => `'${id}'`).join(', ');
        queries.push(`
    UPDATE BOMINT
    SET ISCOMPLETE = 1 
    WHERE "SRNO" IN (${inClause})
  `);
    }

    return { queries, values: ids };
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


        await CmtIntcDetailsQuery(connection1)

        await BomIntcDetailsQuery(connection1)










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