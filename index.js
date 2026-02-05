import moment from "moment";
import { dbGetDatabase, dbPushDataBase, getConnect } from "./db.connection.js";
import { getSubscriptionDetails } from "./utils/subscriptionCall.js";
import fs from 'fs'
import "dotenv/config";
import { FabricDetailsQuery, orderAllowedDetailsQuery } from "./services/dataInterChange.js";





const getorderallowdetintQuery = `SELECT * FROM orderallowdetint WHERE ISCOMPLETE = 0 `

const getFabricIntQuery = ` SELECT * FROM FabricINT WHERE ISCOMPLETE = 0 `


// const getorderallowdetintQuery = `SELECT * FROM orderallowdetint WHERE ISCOMPLETE = 1 `

// const getFabricIntQuery = ` SELECT * FROM FabricINT WHERE ISCOMPLETE = 1 `


async function getRes(connection, sqlQuery) {
    try {
        // console.log("executing query: ", sqlQuery)
        const result = await connection.execute(sqlQuery)
        // console.log("result is: ", result)
        return result
    } catch (error) {
        console.log(error);
        return false
    }
}

async function getResNew(connection, sqlQuery, values) {
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


async function constructUpdateQuery1(resp, field) {
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


async function constructUpdateQuery2(resp, field) {
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
    let connection2;

    try {


        connection1 = await getConnect(dbGetDatabase)


        let getDataorderallowdetintQuery = await getRes(connection1, getorderallowdetintQuery);


        let getDatagetFabricIntQuery = await getRes(connection1, getFabricIntQuery);






        let response1 = getDataorderallowdetintQuery?.rows?.map((po) => ({
            srnNo: po[0],
            erp_no: po[1],
            orderdate: po[2],
            product_type: po[3],
            style_no: po[4],
            colour: po[5],
            sizes: po[6],
            po_no: po[7],
            po_date: po[8],
            unit_of_measure: po[9],
            confirm_qty: po[10],
            extrapolation: po[11],
            order_qty: po[12],
            customer_name: po[13],
            delivery_date: po[14],
            season: po[15],
            product_desc: po[16],
            ordertime: po[17],
            item_no: po[18],
            articlecode: po[19],
            INSEAM: po[20],
            description: po[21],
            country_desc: po[22],
            sam: po[23],
            Recd_Date: po[24],
            ISCOMPLETE: po[25],

        }));



        let response2 = getDatagetFabricIntQuery?.rows?.map((po) => ({
            srnNo: po[0],
            unit_code1: po[1],
            material_dc: po[2],
            item_no: po[3],
            color: po[4],
            posting_date: po[5],
            entry_date: po[6],
            entry_time: po[7],
            user_id: BigInt(po[8]),
            qty: po[9],
            uom: po[10],
            roll_no: po[11],
            material: po[12],
            material_desc: po[13],
            movement_type: po[14],
            unit_code: po[15],
            location: po[16],
            Supplier_code: po[17],
            supplier_name: po[18],
            Recd_Date: po[19],
            shade: po[20],
            gsm: po[21],
            roll_length: po[22],
            length_mtrs: po[23],
            actual_width: po[24],
            sh_length: po[25],
            sh_width: po[26],
            grouping: po[27],
            customer_name: po[28],
            style_no: po[29],

        }));


        // console.log(response1.length, "getDataorderallowdetintQuery")
        // console.log(response2, "response2.length")


        const pushQuery1 = await orderAllowedDetailsQuery(response1);

        const pushQuery2 = await FabricDetailsQuery(response2);




        const updateQuery1 = await constructUpdateQuery1(response1, "erp_no");

        const updateQuery2 = await constructUpdateQuery2(response2, "srnNo");


        if (updateQuery1) {
            const { query } = updateQuery1;




            await getResNew(connection1, query);
        }


        if (updateQuery2) {
            const { query } = updateQuery2;



            await getResNew(connection1, query);
        }






        // connection2 = await getConnectionForSql(dbPushDataBase)

        // a;

        // await getRes(connection2, pushQuery);
        // await connection2.commit();
        // await connection1.commit();



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