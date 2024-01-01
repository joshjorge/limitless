const express = require("express");
const router = express.Router();
const { Reserved } = require('../models/reserved')
const auth = require('../middleware/auth');
const connected = require('../middleware/connected');


router.get('/:id', [auth, connected], async(req, res) => {

})


module.exports = router