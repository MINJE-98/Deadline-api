const express = require('express');

const router = express.Router();


const auth = require('./auth.controller');
/**
 * client와의 로그인 흐름정의
 * 1. 로그인 시도
 * 2. 토큰을 받아 유저가 있는지 확인 (GET api/auth/:token)
 *  2-1. 유저가 없는 경우 유저 생성 (POST api/auth/:token)
 * 3. 유저가 있을경우 토큰이 만료 되었는지 확인(GET api/auth/:token)
 *  3-1 토큰이 만료 되었으면, 토큰을 갱신 해준다.(PUT api/auth/:token)
 * 4.로그인 완료.(200, 'login succes')
 * 
 * 유저를 삭제 합니다.(DELETE api/auth/:token)
 * 
 */
// POST api/auth/:token
// 토큰값을 받아 유저 데이터를 저장
router.post('/:token', auth.create_user);

// GET api/auth/:token
// 유저를 읽음
router.get('/:token', auth.get_user);

// PUT api/auth/:token
// 유저를 업데이트
router.put('/:token', auth.update_user);

// DELETE api/auth/:token
//유저를 삭제 
router.delete('/:token')




module.exports = router;