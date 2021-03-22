const DB = require('../../service/DB.connect');
const create = require('../../service/response_json');
const { today } = require('../../service/today.js');


// POST /api/teams
module.exports.create_team = (req, res, next) =>{
    const id = req.userinfo.id;
    const teamuid = req.param('teamuid');
    const teamname = req.param('teamname');
    // 1. useruid가 DB에 있는지 확인
    // 2. teamuid로 팀 등록
    // 3. useruid로 팀멤버에 팀 상태 등록
    //팀 생성
    const sql = `SELECT * FROM \`users\` WHERE \`uuid\` = '${id}'`

    DB.get_query(sql)
        .then(()=>{
            const sql2 = `INSERT INTO deadline.teams (\`tuid\`, \`name\`, \`makedate\`) values('${teamuid}','${teamname}', '${today()}')`
            const sql3 = `INSERT INTO deadline.teamembers (\`uuid\`, \`tuid\`, \`state\`) values('${id}', '${teamuid}', '0')`
            return DB.isnullcreate(sql2, sql3)
        })
        .then(() =>{
            return res.status(200).json(create.success("teams", "팀 생성에 성공하였습니다.",  "0004"));
        })
        .catch(e =>{
            switch (e) {
    // DB에 유저가 없을 시
                case null:
                    return res.status(404).json(create.error("auth", "NOT_FOUND_USER", `유저를 찾을 수 없습니다.`, "1001"));
                default:
                    return next(e);
            }
        })

    
}

// GET /api/teams
module.exports.get_userTeamsList = (req, res, next) =>{
    const id = req.userinfo.id;

    const sql = `select * from teamembers \`tb\`, teams \`t\` where tb.tuid = t.tuid and tb.uuid = '${id}'`;

    DB.get_query(sql)
        .then( result =>{
            return res.status(200).json(create.success_getdata("teams", `${id}가 포함되어있는 팀리스트를 불러오는데 성공하였습니다.`,  "0005", result));
        })
        .catch(e =>{
            switch (e) {
                case null:
                    return res.status(200).json(create.error("teams", "MySQL_ER_BAD_FIELD_ERROR", `팀을 찾을 수 없습니다.`, "1004"));
                default:
                    return next(e);
            }
        })
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