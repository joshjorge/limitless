const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.cookie('jToken', '', { maxAge: 1 });
    res.redirect('/');
});

module.exports = router;