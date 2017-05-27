var express = require('express');
var router = express.Router();

// router.use(require("./check"));
// router.get('/users', require("./users"));
// router.get('/fetch-resources', require("./fetch-resources"));
// router.get('/fetch-baidu', require("./fetch-baidu"));
// router.post('/register', require("./register"));
// router.post('/login', require("./login"));
// router.post('/check', require("./check"));


const guessFoodInfo = require("./guessFoodInfo.js");
const register = require("./register.js");

router.get('/guessFoodInfo', guessFoodInfo);
router.post('/register', register);




module.exports = router;
