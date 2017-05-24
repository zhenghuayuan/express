var express = require('express');
var router = express.Router();

/* GET home page. */
// res.render('index', { title: 'Express' });
// res.sendfile("../public/index.html");
router.get('/users', require("./users"));
router.get('/fetch-resources', require("./fetch-resources"));
router.get('/fetch-baidu', require("./fetch-baidu"));
router.post('/login', require("./login"));

module.exports = router;
