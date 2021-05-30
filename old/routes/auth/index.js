const express = require('express');

const router = express.Router();

const auth = require('../../controller/auth.controller');

// POST api/auth
// 유저 생성
router.post('/', auth.create_user);

// GET api/auth/:token
// 유저를 읽음
router.get('/', auth.get_user);

module.exports = router;