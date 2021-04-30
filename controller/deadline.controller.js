const DB = require('../service/DB.connect');
const create = require('../service/response_json');
const { today } = require('../service/today.js');
const error_code = require('../service/errorcode.json');


/**
 * 유통기한 생성
 * 1. goodsid를 가져옵니다.
 * 2. expdate를 가져옵니다.
 * 3. teamuid를 가져옵니다.
 * 4. 
 */
module.exports.setdeadline = async(req, res, next) =>{
    const teamuid = req.param('teamuid');
    const goodsid = req.param('goodsid');
    const expdate = req.param('expdate');
    try {
        console.log(`${teamuid}', '0', '${goodsid}', '${expdate}', '${today()}`);
        await DB.pool.query(`INSERT INTO deadline.deadline(tuid, tagid, goodsid, expdate, uploaddate) VALUES('${teamuid}', '1', '${goodsid}', '${expdate}', '${today()}')`);
        return res.status(200).json(create.success(error_code.success.set_deadline));
    } catch (e) {
        next(e)
    }

}
