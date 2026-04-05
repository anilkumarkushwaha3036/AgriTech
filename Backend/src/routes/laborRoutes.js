const express = require('express');
const router = express.Router();
const { getLaborers } = require('../controllers/laborController');

router.get('/', getLaborers);

module.exports = router;
