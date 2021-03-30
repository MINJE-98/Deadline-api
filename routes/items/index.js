const express = require('express');
const router = express.Router();

const items = require('../../controller/items.controller');

// POST /api/items
router.post('', items.set_items);

// GET /api/items
router.get('', items.get_items);

module.exports = router;