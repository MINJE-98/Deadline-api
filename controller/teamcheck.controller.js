const DB = require('../service/DB.connect');
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
  try{
    // 1. 헤더에서 토큰과 팀 UID 받습니다.
    const id = req.userinfo.id;
    const teamuid = req.headers.teamuid;
    const result = await DB.get_query(`SELECT t.tuid FROM teamembers t, users u WHERE t.uuid = ${id} AND  u.uuid = ${id}`)
    let isexist = false
    result.forEach(element => {
      if(element.tuid == teamuid) isexist = true
    })
    isexist ? next() : res.status(404).json(create.error(error_code.error.UNJOINED_TEAM));
  }catch(e){
    console.log(e);
    res.status(404).json(create.error(error_code.error.UNJOINED_TEAM));
  }
};