const DB = require('../../../service/DB.connect');
const create = require('../../../service/response_json');
const { today } = require('../../../service/today.js');

module.exports.join_team = (req, res, next) =>{
    const id = req.userinfo.id;
    //팀 UID, 팀 이름

    const teamuid = req.param('teamuid');
    const sql = `SELECT * FROM \`users\` WHERE \`uuid\` = '${id}'`

    DB.get_query(sql)
        .then(()=>{
            const sql2 = `select * from deadline.teamembers where uuid = '${id}' and tuid = '${teamuid}';`
            const sql3 = `INSERT INTO deadline.teamembers (\`uuid\`, \`tuid\`, \`state\`) values('${id}', '${teamuid}', '2')`
            return DB.isnullcreate(sql2, sql3)
        })
        .then(() =>{
            return res.status(200).json(create.success("members", "팀 가입신청에 성공하였습니다.",  "0006"));
        })
        .catch(e =>{
            switch (e) {
    // DB에 유저가 없을 시
                case null:
                    return res.status(404).json(create.error("members", "NOT_FOUND_USER", `유저를 찾을 수 없습니다.`, "1001"));
                case true:
                    return res.status(404).json(create.error("members", "ALREADY_JOINED_THE_TEAM", `이미 팀에 가입되어 있습니다.`, "1005"));
                default:
                    return next(e);
            }
        })


}