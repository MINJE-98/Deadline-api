const DB = require('../service/DB.connect');
const create = require('../service/response_json');
const { today } = require('../service/today.js');
const error_code = require('../service/errorcode.json');



// /**
//  * 유통기한 생성
//  * 1. goodsid를 가져옵니다.
//  * 2. expdate를 가져옵니다.
//  * 3. teamuid를 가져옵니다.
//  * 4. 
//  */
//  module.exports.setdeadline = async(req, res, next) =>{
//     const teamuid = req.param('teamuid');
//     const goodsid = req.param('goodsid');
//     const expdate = req.param('expdate');
//     try {
//         console.log(`${teamuid}', '0', '${goodsid}', '${expdate}', '${today()}`);
//         await DB.pool.query(`INSERT INTO deadline.deadline(tuid, tagid, goodsid, expdate, uploaddate) VALUES('${teamuid}', '1', '${goodsid}', '${expdate}', '${today()}')`);
//         return res.status(200).json(create.success(error_code.success.set_deadline));
//     } catch (e) {
//         next(e)
//     }

// }
/**
 * 유통기한 및 상품 정보 등록
 * 1. 정보를 받아옵니다.
 */
module.exports.setdeadline = async(req, res, next) =>{
    const teamuid = req.headers.teamuid;
    let goodsid = req.param('goodsid');
    const expdate = req.param('expdate');
    const barcode = req.param('barcode');
    const prodname = req.param('prodname');
    const imageURL = req.param('imageURL');
    try {
        // 팀UID에 같은 바코드의 상품이 있는지 확인합니다.
        const result = await DB.pool.query(`SELECT * FROM deadline.goods WHERE tuid = '${teamuid}' AND barcode=${barcode}`);
        if (!result[0]) {
            // 받아온 상품 정보를 등록합니다.
            await DB.pool.query(`INSERT INTO deadline.goods(tuid, barcode, name, imageURL) VALUES('${teamuid}', '${barcode}', '${prodname}', '${imageURL}')`);
            const newgoods = await DB.pool.query(`SELECT * FROM deadline.goods WHERE tuid = '${teamuid}' AND barcode=${barcode}`);
            console.log(newgoods);
            goodsid = newgoods[0].goodsid
            // return res.status(200).json(create.success(error_code.success.set_item, null));
        }
        // 이미 같은 상품이 등록되어 있습니다.
        if(result[0]) {
            console.log("업데이트 완료");
            await DB.pool.query(`UPDATE deadline.goods SET barcode = '${barcode}', name = '${prodname}', imageURL = '${imageURL}' WHERE goodsid = ${goodsid}`);
            // return res.status(200).json(create.error(error_code.success.update_iteminfo));
        }
        console.log(goodsid);
        // 유통기한을 등록합니다.
        console.log(`INSERT INTO deadline.deadline(tuid, tagid, goodsid, expdate, uploaddate) VALUES('${teamuid}', '2', '${goodsid}', '${expdate}', '${today()}')`);
        await DB.pool.query(`INSERT INTO deadline.deadline(tuid, tagid, goodsid, expdate, uploaddate) VALUES('${teamuid}', '2', '${goodsid}', '${expdate}', '${today()}')`);
        return res.status(200).json(create.success(error_code.success.set_deadline));
    } catch (e) {
        next(e)
    }
}

/**
 * 등록된 유통기한을 가져옵니다.
 * 1. goodsid를 가져옵니다.
 * 2. expdate를 가져옵니다.
 * 3. teamuid를 가져옵니다.
 * 4. 
 */
 module.exports.getdeadline = async(req, res, next) =>{
    const teamuid = req.headers.teamuid;
    try {
        const result = await DB.pool.query(`select 
        deadline.id, deadline.tuid, deadline.goodsid, deadline.expdate, deadline.uploaddate, 
        goods.barcode, goods.name as goodsname, goods.imageURL,
        tags.name as tagname
        from deadline, goods, tags where goods.goodsid = deadline.goodsid AND tags.tagid = deadline.tagid AND deadline.tuid = '${teamuid}' order by deadline.expdate asc`);
        return res.status(200).json(create.success(error_code.success.get_deadline, result));
    } catch (e) {
        next(e)
    }
}
