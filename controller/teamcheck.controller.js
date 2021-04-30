const axios = require('axios')
const config = require('../service/facebook.config')
const create = require('../service/response_json');
const error_code = require('../service/errorcode.json');


/**
 * 1. 헤더에서 토큰과 팀 UID 받습니다.
 * 2. 유저 ID를 받습니다.
 * 3. 팀 ID를 받습니다.
 * . 유저가 가입된 팀리스트를 받습니다.
 * . 팀리스트 중 header에 포함된 팀이 있는지 확인합니다.
 */
module.exports.teamcheck = async(req, res, next) =>{
    // 1. 헤더에서 토큰과 팀 UID 받습니다.
    const { token, teamuid } = req.headers;
    // 2. 유저 ID를 받습니다.
    const userinfo = await axios.get(`https://graph.facebook.com/me?fields=id%2Cname%2Cemail%2Cpicture.type(large)&access_token=${token}`);
    
  };