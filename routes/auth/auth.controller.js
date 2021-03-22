const DB = require('../../service/DB.connect');
const create = require('../../service/response_json');
const { today } = require('../../service/today.js');



// GET api/auth
// 유저를 읽음
module.exports.get_user = (req, res, next) =>{
    /**
     *  DB에 유저 존재 여부 확인
     */
    const id = req.userinfo.id;
    const sql = `SELECT * FROM \`users\` WHERE \`uuid\` = '${id}'`

    DB.get_query(sql)
    // 성공
        .then( result =>{
            return res.status(200).json(create.success_getdata("auth", "유저 정보를 가져오는데 성공하였습니다.", "0001", result));
        })
    // 에러
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

// POST api/auth
module.exports.create_user = (req, res, next) =>{
    /**
     * TODO
     * 1. 유저 토큰획득.
     * 2. 토큰을 이용해 사용자 정보를 받음
     * 3. 중복 체크
     * 4. db에 유저 등록
     */
    const id = req.userinfo.id;
    const name = req.userinfo.name;
    const email = req.userinfo.email;
    const picture = req.userinfo.picture.data.url;
    const sql = `SELECT * FROM \`users\` WHERE \`uuid\` = '${id}'`;
    const sql2 = `INSERT INTO deadline.users (\`uuid\`, \`profileURL\`, \`email\`, \`name\`, \`lastlogindate\`, \`registerdate\`) values('${id}','${picture}','${email}','${name}', '${today()}', '${today()}')`;

    DB.isnullcreate(sql, sql2)
    // 성공
        .then(() =>{
            return res.status(200).json(create.success("auth", '유저 생성 성공했습니다.', "0002"));
        })
    // 에러
        .catch(e =>{
            switch (e) {
                case true:
                    return res.status(200).json(create.success("auth", `해당 유저는 이미등록 되어있습니다.`, "0003"));
                default:
                    return next(e);
            }
        })
}