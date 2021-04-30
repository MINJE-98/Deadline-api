const axios = require('axios')
const config = require('../service/facebook.config')
const create = require('../service/response_json');
const error_code = require('../service/errorcode.json');


/**
 * 1. 토큰 획득
 * 2. 우리 서비스 유저여부 확인합니다.
 * 3. 우리 서비스 유저입니다.
 * 4. 우리 서비스 유저가 아닙니다.
 */
module.exports.tokencheck = async(req, res, next) =>{

    //real MODAL
    // // 1. 유저 획득
    // const token = req.headers.token;
    // // 2. 우리 서비스 유저여부 확인합니다.
    // const business = await axios.get(`https://graph.facebook.com/me?fields=ids_for_business&access_token=${token}`)
    // // 3. 우리 서비스 유저입니다.
    // if(business.data.ids_for_business.data[0].app.id == config.appID) {
    //     const userinfo = await axios.get(`https://graph.facebook.com/me?fields=id%2Cname%2Cemail%2Cpicture.type(large)&access_token=${token}`);
    //     req.userinfo = userinfo.data
    //     next();
    // }
    // // 4. 우리 서비스 유저가 아닙니다.
    // else{
    //     return res.status(404).json(create.error(error_code.error.UNKNOWN_USER));
    // }

    // IOS TEST MODAL
    const token = req.headers.token;
    const userinfo = await axios.get(`https://graph.facebook.com/me?fields=id%2Cname%2Cemail%2Cpicture.type(large)&access_token=${token}`);
    req.userinfo = userinfo.data
    next();
  };