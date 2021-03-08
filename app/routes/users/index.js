const express = require('express');
const router = express.Router();
const user_controller = require('./users.controller');

/////////////////////////
///////////유저//////////
/////////////////////////

router.get('/user', (req, res) => res.send("로그인 성공"))


module.exports = router;