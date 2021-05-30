const express = require('express');
const router = express.Router();

const deadline = require('../../controller/deadline.controller');

// 유통기한 생성
// POST /api/deadline?teamuid={teamuid}&goodsid={goodsid}&expdate={expdate}
router.post('/', deadline.setdeadline);

// 등록된 유통기한 가져오기
// GET /api/deadline
router.get('/', deadline.getdeadline);


module.exports = router;