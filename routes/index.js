var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
/* GET home page. */
// req.render('index', { title: 'Express' });
// req.sendfile("../public/index.html");
router.use(require("./check"));
router.get('/users', require("./users"));
router.get('/fetch-resources', require("./fetch-resources"));
router.get('/fetch-baidu', require("./fetch-baidu"));
router.post('/register', require("./register"));
router.post('/login', require("./login"));
router.post('/check', require("./check"));
module.exports = router;
