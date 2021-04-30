const express = require('express');
const router = express.Router();

const items = require('../../controller/items.controller');

// 아이템 생성을 할 때 선택된 팀이 있어야합니다.

// 아이템 생성
// POST /api/items?barcode={barcode}&prodname={prodname}&teamuid={teamuid}
router.post('/', items.set_items);

// 팀이 가진 바코드의 아이템 정보 읽기
// GET /api/items?barcode={barcode}&teamuid={teamuid}
router.get('/', items.get_items);


// 바코드의 아이템 정보리스트 읽기
// GET /api/items/list?barcode={barcode}
router.get('/list', items.get_itemlist);

module.exports = router;