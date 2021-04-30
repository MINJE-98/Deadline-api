const DB = require('../service/DB.connect');
const create = require('../service/response_json');
const error_code = require('../service/errorcode.json');

/**
 * POST /api/items?barcode={barcode}&prodname={prodname}&teamuid={teamuid}
 * 바코드를 등록합니다.
 * 
 * 1. 바코드, 제품명, 팀UID을 받아옵니다.
 * 2. 팀UID에 같은 바코드의 상품이 있는지 확인합니다.
 * 3. 받아온 상품 정보를 등록합니다.
 */
module.exports.set_items = async(req, res, next) =>{
    try {
        // 1. 바코드, 제품명, 팀UID을 받아옵니다.
        const barcode = req.param('barcode');
        const teamuid = req.param('teamuid');
        const prodname = req.param('prodname');
        
        // 2. 팀UID에 같은 바코드의 상품이 있는지 확인합니다.
        const result = await DB.pool.query(`SELECT * FROM deadline.goods WHERE tuid = '${teamuid}' AND barcode=${barcode}`);
        console.log(result);
        if (result[0] == undefined) {
            // 3. 받아온 상품 정보를 등록합니다.
            await DB.pool.query(`INSERT INTO deadline.goods(tuid, barcode, name, imageURL) VALUES('${teamuid}', '${barcode}', '${prodname}', '')`);
            return res.status(200).json(create.success(error_code.success.set_item, null));
        }
        // 이미 같은 상품이 등록되어 있습니다.
        else {
            await DB.pool.query(`UPDATE deadline.goods SET barcode = '${barcode}', name = '${prodname}' WHERE goodsid = ${result[0].goodsid}`);
            return res.status(200).json(create.error(error_code.success.update_iteminfo));
        }
    } catch (e) {
        next(e)
    }
}
/**
 * GET /api/items?barcode={barcode}&teamuid={teamuid}
 * 팀에 상품에 있는지 확인합니다.
 * 
 * 1. 바코드, 팀UID을 받아옵니다.
 * 2. 팀이 등록한 바코드가 있는지 확인합니다.
 */
module.exports.get_items = async(req, res, next) =>{
    try {
        // 1. 바코드, 팀UID을 받아옵니다.
        const barcode = req.param('barcode');
        const teamuid = req.param('teamuid');
        
        // 2. 팀이 등록한 바코드가 있는지 확인합니다.
        const result = await DB.pool.query(`SELECT * FROM goods WHERE tuid = '${teamuid}' AND barcode=${barcode}`);
        return res.status(200).json(create.success(error_code.success.get_items, result));
    } catch (e) {
        next(e)
    }
}

/**
 * GET /api/items?barcode={barcode}&teamuid={teamuid}
 * 팀에 상품에 있는지 확인합니다.
 * 
 * 1. 바코드, 팀UID을 받아옵니다.
 * 2. 
 */
module.exports.get_items = async(req, res, next) =>{
    try {
        const barcode = req.param('barcode');
        const teamuid = req.param('teamuid');
        
        const result = await DB.pool.query(`SELECT * FROM deadline.goods WHERE tuid = '${teamuid}' AND barcode=${barcode}`);
        if (result[0] != undefined) return res.status(200).json(create.success(error_code.success.get_items, result));
        else return res.status(200).json(create.success(error_code.error.NOT_FOUND_ITEM, result));
    } catch (e) {
        next(e)
    }
}
/**
 * GET /api/items/list?barcode={barcode}
 * 아이템 리스트를 받습니다.
 * 
 * 1. 바코드를 받아옵니다.
 * 2. 아이템 리스트를 받옵니다.
 */
module.exports.get_itemlist = async(req, res, next) =>{
    try {
        // 1. 바코드를 받아옵니다.
        const barcode = req.param('barcode');

        // 2. 아이템 리스트를 받옵니다.
        const result = await DB.pool.query(`SELECT * FROM deadline.goods WHERE barcode = ${barcode}`);
        return res.status(200).json(create.success(error_code.success.get_itemlist, result));
    } catch (e) {
        next(e)
    }
    // // 1. 바코드를 받아옵니다.
    // const barcode = req.param('barcode');
    // const sql = `SELECT * FROM deadline.goods WHERE = ${barcode}`;

    // DB.get_query(sql)
    //     .then(()=>{
    //         return res.status(200).json(create.success("items", "아이템을 불러오는데 성공하였습니다.",  "0007"));
    //     })
    //     .catch(e =>{
    //         console.log(e);
    //         switch (e) {
    //             case null:
    //                 return res.status(404).json(create.success("items", "등록된 아이템이 없습니다.",  "1006"));
    //             default:
    //                 return next();
    //         }
    //     })
}