import { PrismaClient } from '@prisma/client'
import { constructUpdateQuery1, constructUpdateQuery2, getRes, updateIsCompleteFlag } from '../index.js';
const prisma = new PrismaClient();





const getorderallowdetintQuery = `SELECT * FROM orderallowdetint WHERE ISCOMPLETE = 0 `

const getFabricIntQuery = ` SELECT * FROM FabricINT WHERE ISCOMPLETE = 0 `



export const orderAllowedDetailsQuery = async (connection) => {


    try {
        let getDataorderallowdetintQuery = await getRes(connection, getorderallowdetintQuery);


        let unFlateDataorderallowdetint = getDataorderallowdetintQuery?.rows?.map((po) => ({
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



        const mapped = unFlateDataorderallowdetint?.map(item => ({
            srnNo: item.srnNo ? parseInt(item.srnNo) : null,
            erp_no: item.erp_no ? item.erp_no : null,
            orderdate: item.orderdate ? new Date(item.orderdate) : null,
            product_type: item.product_type ? item.product_type : null,
            style_no: item.style_no ? item.style_no : null,
            colour: item.colour ? item.colour : null,
            sizes: item.sizes ? item.sizes : null,
            po_no: item.po_no ? item.po_no : null,
            po_date: item.po_date ? new Date(item.po_date) : null,
            unit_of_measure: item.unit_of_measure ? item.unit_of_measure : null,
            confirm_qty: item.confirm_qty ? parseFloat(item.confirm_qty) : null,
            extrapolation: item.extrapolation ? parseFloat(item.extrapolation) : null,
            order_qty: item.order_qty ? parseFloat(item.order_qty) : null,
            customer_name: item.customer_name ? item.customer_name : null,
            delivery_date: item.delivery_date ? new Date(item.delivery_date) : null,
            season: item.season ? item.season : null,
            product_desc: item.product_desc ? item.product_desc : null,
            ordertime: item.ordertime ? item.ordertime : null,
            item_no: item.item_no ? parseFloat(item.item_no) : null,
            articlecode: item.articlecode ? item.articlecode : null,
            INSEAM: item.INSEAM ? item.INSEAM : null,
            description: item.description ? item.description : null,
            country_desc: item.country_desc ? item.country_desc : null,
            sam: item.sam ? parseFloat(item.sam) : null,
            Recd_Date: item.Recd_Date ? new Date(item.Recd_Date) : null,
            ISCOMPLETE: item.ISCOMPLETE ? Boolean(item.ISCOMPLETE) : null,
        }));



        const updateQuery1 = await constructUpdateQuery1(unFlateDataorderallowdetint, "erp_no");
        if (updateQuery1) {
            const { query } = updateQuery1;



            const result = await prisma.$transaction(async (tx) => {
                const resut = await tx.OrderAllowDetInt.createMany({
                    data: mapped,
                })
                await updateIsCompleteFlag(connection, query);
            })


            return result;
        }

    } catch (e) {
        connection.rollback()
    }



};



export const FabricDetailsQuery = async (connection) => {


    let getDatagetFabricIntQuery = await getRes(connection, getFabricIntQuery);


    let unFlatDatagetFabricIntQuery = getDatagetFabricIntQuery?.rows?.map((po) => ({
        srnNo: po[0],
        unit_code1: po[1],
        material_dc: po[2],
        item_no: po[3],
        color: po[4],
        posting_date: po[5],
        entry_date: po[6],
        entry_time: po[7],
        user_id: (po[8]),
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

    const mapped = unFlatDatagetFabricIntQuery?.map(item => ({



        srnNo: item.srnNo ? parseInt(item.srnNo) : null,
        unit_code1: item.unit_code1 ? item.unit_code1 : null,
        material_dc: item.material_dc ? item.material_dc : null,
        item_no: item.item_no ? item.item_no : null,
        color: item.color ? item.color : null,
        posting_date: item.posting_date ? new Date(item.posting_date) : null,
        entry_date: item.entry_date ? new Date(item.entry_date) : null,
        entry_time: item.entry_time ? item.entry_time : null,
        user_id: item.user_id ? parseInt(item.user_id) : null,
        qty: item.qty ? parseFloat(item.qty) : null,
        uom: item.uom ? item.uom : null,
        roll_no: item.roll_no ? item.roll_no : null,
        material: item.material ? item.material : null,
        material_desc: item.material_desc ? item.material_desc : null,
        movement_type: item.movement_type ? item.movement_type : null,
        unit_code: item.unit_code ? item.unit_code : null,
        location: item.location ? item.location : null,
        Supplier_code: item.Supplier_code ? item.Supplier_code : null,
        supplier_name: item.supplier_name ? item.supplier_name : null,
        Recd_Date: item.Recd_Date ? new Date(item.Recd_Date) : null,
        shade: item.shade ? item.shade : null,
        gsm: item.gsm ? parseFloat(item.gsm) : null,
        roll_length: item.roll_length ? parseFloat(item.roll_length) : null,
        length_mtrs: item.length_mtrs ? parseFloat(item.length_mtrs) : null,
        actual_width: item.actual_width ? parseFloat(item.actual_width) : null,
        sh_length: item.sh_length ? parseFloat(item.sh_length) : null,
        sh_width: item.sh_width ? parseFloat(item.sh_width) : null,
        grouping: item.grouping ? item.grouping : null,
        customer_name: item.customer_name ? item.customer_name : null,
        style_no: item.style_no ? item.style_no : null,
    }));



    console.log(unFlatDatagetFabricIntQuery, "unFlatDatagetFabricIntQuery")
    const updateQuery2 = await constructUpdateQuery2(unFlatDatagetFabricIntQuery, "srnNo");
    if (updateQuery2) {
        const { query } = updateQuery2;


        const result = await prisma.$transaction(async (tx) => {
            const resut = await tx.FabricINT.createMany({
                data: mapped,
            })
            await updateIsCompleteFlag(connection, query);

        })
        return result;

    }




};