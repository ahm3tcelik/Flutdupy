const express = require('express');
const router = express.Router();
const templates = require('../modules/templates');
const verify = require('./verifyToken');

router.use(verify);

router.get('/', (req, res) => {
    res.send(templates.getTemplates());
});

router.post('/', (req, res) => {
    res.send(templates.getTemplates());
});

module.exports = router;