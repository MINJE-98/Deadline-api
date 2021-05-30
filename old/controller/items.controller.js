const DB = require('../service/DB.connect');
const create = require('../service/response_json');
const error_code = require('../service/errorcode.json');

/**
 * POST /api/items?barcode={barcode}&prodname={prodname}&teamuid={teamuid}&imageURL={imageURL}
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
        const teamuid = req.headers.teamuid;
        const prodname = req.param('prodname');
        const imageURL = req.param('imageURL');
        
        // 2. 팀UID에 같은 바코드의 상품이 있는지 확인합니다.
        const result = await DB.pool.query(`SELECT * FROM deadline.goods WHERE tuid = '${teamuid}' AND barcode=${barcode}`);
        if (!result[0]) {
            // 3. 받아온 상품 정보를 등록합니다.
            await DB.pool.query(`INSERT INTO deadline.goods(tuid, barcode, name, imageURL) VALUES('${teamuid}', '${barcode}', '${prodname}', '${imageURL}')`);
            const result = await DB.pool.query(`SELECT * FROM deadline.goods WHERE tuid = '${teamuid}' AND barcode=${barcode}`);
            console.log(result);
            return res.status(200).json(create.success(error_code.success.set_item, result));
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
 * POST /api/items/fork?barcode={barcode}&prodname={prodname}&teamuid={teamuid}&imageURL={imageURL}&goodsid={goodsid}
 * 아이템 복사
 * 
 * 1. 바코드, 제품명, 팀UID, 이미지, 상품uid 받아옵니다.
 * 2. 해당팀이 바코드의 정보가 있는지 체크
 * 3. 
 */
module.exports.fork_items = async(req, res, next) =>{
    try {
        // 1. 바코드, 제품명, 팀UID을 받아옵니다.
        const barcode = req.param('barcode');
        const teamuid = req.headers.teamuid;
        const prodname = req.param('prodname');
        const imageURL = req.param('imageURL');
        const goodsid = req.param('goodsid');
        
        // 2. 팀UID에 같은 바코드의 상품이 있는지 확인합니다.
        const result = await DB.pool.query(`SELECT * FROM deadline.goods WHERE tuid = '${teamuid}' AND barcode=${barcode}`);
        if (!result[0]) {
            // 3. 받아온 상품 정보를 등록합니다.
            await DB.pool.query(`update deadline.goods set usecount = usecount + 1 where goodsid = '${goodsid}'`);
            await DB.pool.query(`INSERT INTO deadline.goods(tuid, barcode, name, imageURL) VALUES('${teamuid}', '${barcode}', '${prodname}', '${imageURL}')`);
            const result = await DB.pool.query(`SELECT * FROM deadline.goods WHERE tuid = '${teamuid}' AND barcode=${barcode}`);
            return res.status(200).json(create.success(error_code.success.set_item, result));
        }
        // 이미 같은 상품이 등록되어 있습니다.
        else {
            return res.status(200).json(create.error(error_code.error.EXSIT_ITEM));
        }
    } catch (e) {
        next(e)
    }
}


// /**
//  * GET /api/items?barcode={barcode}&teamuid={teamuid}
//  * 팀에 상품에 있는지 확인합니다.
//  * 
//  * 1. 바코드, 팀UID을 받아옵니다.
//  * 2. 팀이 등록한 바코드가 있는지 확인합니다.
//  */
// module.exports.get_items = async(req, res, next) =>{
//     try {
//         // 1. 바코드, 팀UID을 받아옵니다.
//         const barcode = req.param('barcode');
//         const teamuid = req.teamuid;
//         console.log(teamuid);
        
//         // 2. 팀이 등록한 바코드가 있는지 확인합니다.
//         const result = await DB.pool.query(`SELECT * FROM goods WHERE tuid = '${teamuid}' AND barcode=${barcode}`);
//         return res.status(200).json(create.success(error_code.success.get_items, result));
//     } catch (e) {
//         next(e)
//     }
// }

/**
 * GET /api/items?barcode={barcode}&teamuid={teamuid}
 * 특정팀에 상품에 있는지 확인합니다.
 * 
 * 1. 바코드, 팀UID을 받아옵니다.
 * 2. 특정팀 uid에 바코드를 검색합니다.
 */
module.exports.team_search_item = async(req, res, next) =>{
    try {
        const barcode = req.param('barcode');
        const teamuid = req.headers.teamuid;
        console.log(teamuid);
        
        const result = await DB.pool.query(`SELECT * FROM deadline.goods WHERE tuid = '${teamuid}' AND barcode=${barcode}`);
        if (result[0] != undefined) return res.status(200).json(create.success(error_code.success.team_search_item, result));
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
module.exports.total_search_item = async(req, res, next) =>{
    try {
        // 1. 바코드를 받아옵니다.
        const barcode = req.param('barcode');

        // 2. 아이템 리스트를 받옵니다.
        const result = await DB.pool.query(`SELECT go.goodsid, go.barcode, go.name as goodsname, go.imageURL, go.usecount, te.name as teamname FROM deadline.goods go, deadline.teams te WHERE go.tuid = te.tuid AND barcode = ${barcode} order by go.usecount desc`);
        return res.status(200).json(create.success(error_code.success.total_search_item, result));
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

/**
 * POST /api/items/fork?barcode={barcode}&teamuid={teamuid}&imageurl={imageurl}&goodsid={goodsid}
 * 1. 바코드, 팀uid, imageurl, goodsid을 받습니다.
 * 2. 포크할 goodsid에 사용횟수를 +1 합니다.
 * 2. 아이템정보를 포크합니다.
 */
 module.exports.get_itemlist = async(req, res, next) =>{
    const id = req.userinfo.id;
    const barcode = req.param('barcode');
 }