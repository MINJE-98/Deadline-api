const DB = require('../service/DB.connect');
const create = require('../service/response_json');
const { today } = require('../service/today.js');
const error_code = require('../service/errorcode.json');


/**
 * POST api/auth
 * 유저를 생성합니다.
 * 1. 토큰의 유저정보를 가져옵니다.
 * 2. DB에 유저 정보를 등록합니다.
 * ERROR:
 * 'ER_DUP_ENTRY' : 이미 해당 유저가 등록되어있습니다.
 */
module.exports.create_user = async(req, res, next) =>{
    try{
        // 1. 토큰의 유저정보를 가져옵니다.
        const id = req.userinfo.id;
        const name = req.userinfo.name;
        const email = req.userinfo.email;
        const picture = req.userinfo.picture.data.url;

        // 2. DB에 유저 정보를 등록합니다.
        await DB.pool.query(`INSERT INTO deadline.users 
        (\`uuid\`, \`profileURL\`, \`email\`, \`name\`, \`lastlogindate\`, \`registerdate\`) 
        values('${id}','${picture}','${email}','${name}', '${today()}', '${today()}')`);
        return res.status(200).json(create.success(error_code.success.set_user, req.userinfo));
    }
    catch(e){
        switch (e.code) {
            case 'ER_DUP_ENTRY':
                return res.status(404).json(create.error(error_code.error.EXIST_USER));
            default:
                return next(e);
        }
    }
}

/**
 * GET api/auth
 * 데이터 베이스에 유저가 있는지 확인합니다.
 * 1. 토큰으로 부터 유저 정보를 받아옵니다.
 * 2. 데이터베이스에 유저 정보가 있는지 확인합니다.
 * 
 * Error:
 * 
 */
 module.exports.get_user = async(req, res, next) =>{
    try{
        // 1. 토큰으로 부터 유저 정보를 받아옵니다.
        const id = req.userinfo.id;

        // 2. 데이터베이스에 유저 정보가 있는지 확인합니다.
        const result = await DB.pool.query(`SELECT * FROM \`users\` WHERE \`uuid\` = '${id}'`);
        return res.status(200).json(create.success(error_code.success.get_user, result[0]));
    }
    catch(e){
        return next(e);
    }
}