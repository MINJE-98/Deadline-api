const DB = require('../service/DB.connect');
const create = require('../service/response_json');
const { today } = require('../service/today.js');
const error_code = require('../service/errorcode.json');


/**
 * POST /api/teams
 * 팀을 생성합니다.
 * 1. 팀정보를 받아옵니다.
 * 2. 팀정보를 저장합니다.
 * 
 * ERROR:
 * 'ER_DUP_ENTRY': 이미 존재하는 팀입니다.
 */ 
module.exports.create_team = async(req, res, next) =>{
    try {
        // 1. 팀정보를 받아옵니다.
        const teamuid = req.param('teamuid');
        const teamname = req.param('teamname');
        
        // 2. 팀정보를 저장합니다.
        await DB.pool.query(`INSERT INTO deadline.teams (\`tuid\`, \`name\`, \`makedate\`) values('${teamuid}','${teamname}', '${today()}')`);
        return res.status(200).json(create.success(error_code.success.set_team));
    } catch (e) {
        switch (e.code) {
            case 'ER_DUP_ENTRY':
                return res.status(404).json(create.error(error_code.error.EXIST_TEAM));
            default:
                return next(e);
        }
    }
}

/**
 * GET /api/teams
 * 팀 정보를 가져옵니다.
 * 1. 
 * 2. 
 * 
 */ 
module.exports.get_team = async(req, res, next) =>{
    try {
        const teamuid = req.param('teamuid');
        const result = await DB.pool.query(`SELECT * FROM deadline.teams WHERE tuid = '${teamuid}'`)
        return res.status(200).json(create.success(error_code.success.get_team, result[0]));
    } catch (e) {
        next(e)
    }
}

// // PUT /api/teams
// module.exports.update_team = (req, res, next) =>{
//     const id = req.userinfo.id;
//     const teamuid = req.param('teamuid');
//     const teamname = req.param('teamname');
//     // 1. useruid가 DB에 있는지 확인
//     // 2. teamuid로 팀 등록
//     // 3. useruid로 팀멤버에 팀 상태 등록
//     //팀 생성
//     const sql = `SELECT * FROM \`users\` WHERE \`uuid\` = '${id}'`

//     DB.get_query(sql)
//         .then(()=>{
//             const sql2 = `INSERT INTO deadline.teams (\`tuid\`, \`name\`, \`makedate\`) values('${teamuid}','${teamname}', '${today()}')`
//             const sql3 = `INSERT INTO deadline.teamembers (\`uuid\`, \`tuid\`, \`state\`) values('${id}', '${teamuid}', '0')`
//             return DB.isnullcreate(sql2, sql3)
//         })
//         .then(() =>{
//             return res.status(200).json(create.success("teams", "팀 생성에 성공하였습니다.",  "0004"));
//         })
//         .catch(e =>{
//             switch (e) {
//     // DB에 유저가 없을 시
//                 case null:
//                     return res.status(404).json(create.error("auth", "NOT_FOUND_USER", `유저를 찾을 수 없습니다.`, "1001"));
//                 default:
//                     return next(e);
//             }
//         })

    
// }