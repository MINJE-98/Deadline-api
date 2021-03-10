const DB = require('../../service/DB.connect');
const fetch = require('node-fetch');
const create = require('../../service/response_json');
const { today } = require('../../service/today.js');



// GET api/auth/:token
// 유저를 읽음
module.exports.get_user = (req, res, next) =>{
    /**
     * 1. 유저 토큰 획득.
     * 2. 토큰을 이용해 유저 id를 획득
     * 2. 유저 정보 가져옴
     * 3. DB에 유저가 있는지 확인
     * 
     * http state code
     * 200 : 유저정보를 가져오는데 성공
     * 404 : 존재하지않는 유저
     */
        // 1. 유저 토큰 획득.
        const token = req.params.token;
        // 2. 토큰을 이용해 유저id 획득
        const userinfo = fetch(`https://graph.facebook.com/me?fields=id%2Cname%2Cemail%2Cpicture.type(large)&access_token=${token}`);
        
        userinfo
        // body 텍스트를 json형식으로 가져옴
            .then( response => response.json())
        // 3. DB에 유저가 있는지 확인
            .then( data =>{
                const sql = `SELECT * FROM \`users\` WHERE \`uuid\` = ${data.id}`
                return DB.get_query(sql)
            })
        // 성공
            .then( result =>{
                return res.status(200).json(create.success_getdata("auth", "유저 정보를 가져오는데 성공하였습니다.", "0001", result));
            })
        // 에러
            .catch(e =>{
                switch (e.code) {
        // DB에 유저가 없을 시
                    case 'ER_BAD_FIELD_ERROR':
                        return res.status(404).json(create.error("auth", "MySQL_ER_BAD_FIELD_ERROR", `유저를 찾을 수 없습니다.`, "1001"));
                    default:
                        return next(e);
                }
            })


}

// POST api/auth/:token
module.exports.create_user = (req, res, next) =>{
    /**
     * TODO
     * 1. 유저 토큰획득.
     * 2. 토큰을 이용해 사용자 정보를 받음
     * 3. db에 저장
     */
    // 1. 유저 토큰획득.
    const token = req.params.token;
    // 2. 토큰을 이용해 사용자 정보를 받아온다.
    const userinfo = fetch(`https://graph.facebook.com/me?fields=id%2Cname%2Cemail%2Cpicture.type(large)&access_token=${token}`);
    userinfo
    // body 텍스트를 json형식으로 가져옴
        .then( response => response.json())
    // 토큰 검증
        .then( data =>{
            if(data.id == undefined){
                if(data.error.code == 190) return res.status(404).json(create.error('auth', 'FaceBook_OAuthException', '잘못된 형식의 토큰입니다.', '1002'));
            }
            return data
        })
        // 3. db에 저장
        .then( userinfo => {
            // 토큰 검증
            if (userinfo.id == undefined) return userinfo;
            const sql = `INSERT INTO \`users\` (\`uuid\`, \`profileURL\`, \`email\`, \`name\`, \`accesstoken\`, \`lastlogindate\`, \`registerdate\`) values('${userinfo.id}','${userinfo.picture.data.url}','${userinfo.email}','${userinfo.name}','${token}', '${today()}', '${today()}')`
            return DB.get_query(sql);
        })
        // 성공
        .then( result =>{
            // 토큰 검증
            if (result.id == undefined) return result;
            return res.status(200).json(create.success_getdata("auth", '유저 생성 성공했습니다.', "0002", result));
        })
        // 에러
        .catch(e =>{
            console.log(e);
            switch (e.code) {
                case 'ER_DUP_ENTRY':
                    return res.status(404).json(create.error("auth", "MySQL_ER_DUP_ENTRY", `해당 유저는 이미등록 되어있습니다.`, "1003"));
                default:
                    return next(e);
            }
        })
}
