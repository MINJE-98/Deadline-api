const express = require('express');
const router = express.Router();

const items = require('../../controller/items.controller');

// POST /api/items?barcode={barcode}&prodname={prodname}&teamuid={teamuid}
router.post('', items.set_items);

// GET /api/items?barcode={barcode}&teamuid={teamuid}
router.get('', items.get_items);

// GET /api/items/list?barcode={barcode}
router.get('/list', items.get_itemlist);

module.exports = router;