const DB = require('../../service/DB.connect');
const axios = require('axios');
const create = require('../../service/response_json');
const { today } = require('../../service/today.js');

module.exports.createTeam = (req, res, next) =>{
    //팀 UID, 팀 이름


    //팀 생성
    const teamuid = req.param('tuid');
    const teamname = req.param('teamname');
    const useruid = req.param('uuid');
    const state = req.param('state');

    const sql = `INSERT INTO deadline.teams (\`tuid\`, \`name\`, \`makedate\`) values('${teamuid}','${teamname}', '${today()}')`
    const sql2 = `INSERT INTO deadline.teamembers (\`uuid\`, \`tuid\`, \`state\`) values('${useruid}', '${teamuid}', '${state}')`
    DB.set_query(sql)
        .then(()=>{
            DB.set_query(sql2)
                .then(()=>{
                    return res.status(404).json(create.success("teams", "팀 생성에 성공하였습니다.",  "0003"));
                })
        })
        .catch(e =>{
            console.log(e);
            switch (e.code) {
                case 'ER_DUP_ENTRY':
                    return res.status(404).json(create.error("teams", "MySQL_ER_DUP_ENTRY", `해당 팀는 이미등록 되어있습니다.`, "1004"));
                default:
                    return next(e);
            }
        })
}