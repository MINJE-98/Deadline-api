const axios = require('axios')

module.exports.tokencheck = (req, res, next) =>{
    const token = req.headers.token;
    const userinfo = axios.get(`https://graph.facebook.com/me?fields=id%2Cname%2Cemail%2Cpicture.type(large)&access_token=${token}`);
    userinfo
        .then( response => req.userinfo = response.data)
        .then( ()=> next())
        .catch(e => {next(e)})
  };