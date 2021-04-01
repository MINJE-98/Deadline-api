const DB = require('../service/DB.connect');
const create = require('../service/response_json');
const { today } = require('../service/today.js');
const error_code = require('../service/errorcode.json');


/**
 * POST /api/teams/members?teamuid=:temauid&state=:state
 * 팀에 가입합니다.
 * 
 * 1. 토큰의 유저정보를 가져옵니다.
 * 2. 이미 등록된 팀인지 확인합니다.
 * 2. 해당 유저를 받은 상태코드와 함께 등록합니다.
 * 
 * ERROR:
 * ER_NO_REFERENCED_ROW_2: 팀을 찾을 수 없습니다.
 */
module.exports.join_team = async(req, res, next) =>{
    try { 
        
        // 1. 토큰의 유저정보를 가져옵니다.
        const id = req.userinfo.id;
        const teamuid = req.param('teamuid');
        const state = req.param('state');
        const result = await DB.pool.query(`SELECT * FROM deadline.teamembers WHERE tuid = '${teamuid}' AND uuid = '${id}'`);
        //2. 이미 가입된 팀인지 확인합니다.
        if(result[0] != undefined) return res.status(200).json(create.error(error_code.error.EXSIT_MEMBER, null));

        // 3. 유저id와 멤버 상태코드를 등록합니다.
        else {
            await DB.pool.query(`INSERT INTO deadline.teamembers (\`uuid\`, \`tuid\`, \`state\`) VALUES('${id}', '${teamuid}', '${state}')`);
            return res.status(200).json(create.success(error_code.success.join_team, null));
        }
    } catch (e) {
        switch (e.code) {
            case "ER_NO_REFERENCED_ROW_2":
                return res.status(404).json(create.error(error_code.error.NOT_FOUND_TEAM));
            default:
                next(e)
        }
    }
}

/**
 * GET /api/teams/members?teamuid=:temauid
 * 팀에 가입된 유저를 가져옵니다.
 * 
 * 1. 팀 UID를 가져옵니다.
 * 2. 팀에 소속된 유저들을 가져옵니다.
 * ERROR:
 * 
 */
module.exports.get_members = async(req, res, next) =>{
    try {
        // 1. 팀 UID를 가져옵니다.
        const teamuid = req.param('teamuid');
        // 2. 팀에 소속된 유저들을 가져옵니다.
        const result = await DB.pool.query(`SELECT u.uuid, u.name, u.profileURL , t.state FROM teamembers t, users u WHERE tuid ='${teamuid}'`);
        return res.status(200).json(create.success(error_code.success.get_members, result[0]));
    } catch (e) {
        next(e)
    }
}

/**
 * GET /api/teams/members?teamuid=:temauid?
 * 팀에 가입된 유저를 가져옵니다.
 * 1. 유저 id를 가져옵니다.
 * 2. 팀 UID를 가져옵니다.
 * 3. 팀에 소속된 유저들을 가져옵니다.
 * ERROR:
 * 
 */
 module.exports.get_members = async(req, res, next) =>{
    try {
        const userid = req.userinfo.id;
        // 2. 팀 UID를 가져옵니다.
        const teamuid = req.param('teamuid');
        // 2. 팀에 소속된 유저들을 가져옵니다.
        const result = await DB.pool.query(`SELECT u.uuid, u.name, u.profileURL , t.state FROM teamembers t, users u WHERE t.tuid ='${teamuid}' AND u.uuid = '${userid}'`);
        return res.status(200).json(create.success(error_code.success.get_members, result[0]));
    } catch (e) {
        next(e)
    }
}
/**
 * GET /api/teams/members/teamlist
 * 한 유저가 가입한 팀리스트를 가져옵니다.
 * 
 * 1. userid를 가져옵니다.
 * 2. 소속된 팀리스트를 가져옵니다.
 * 
 * ERROR:
 */

module.exports.get_user_teamlist = async(req, res, next) =>{
    try {
        //1. userid를 가져옵니다.
        const id = req.userinfo.id;
        const result = await DB.pool.query(`SELECT t.tuid, ts.name, t.state FROM teamembers t, teams  ts WHERE t.tuid = ts.tuid AND t.uuid = '${id}'`);
        return res.status(200).json(create.success(error_code.success.get_user_teamlist, result));
    } catch (e) {
        next(e)
    }
}