import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


export const orderAllowedDetailsQuery = async (resp) => {

    // console.log("resp length", resp[0]);


    const mapped = resp?.map(item => ({
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
        ISCOMPLETE: item.ISCOMPLETE ? Boolean( item.ISCOMPLETE) : null,
    }));

    const result = await prisma.OrderAllowDetInt.createMany({
        data: mapped,
    });

    return result;
};



export const FabricDetailsQuery = async (resp) => {


    const mapped = resp?.map(item => ({



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

    const result = await prisma.FabricINT.createMany({
        data: mapped,
    });

    return result;
};