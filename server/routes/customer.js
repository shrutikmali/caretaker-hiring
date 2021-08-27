const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.send("Customer").status(200));

module.exports = router;