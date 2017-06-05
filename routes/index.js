const express = require('express');
const router = express.Router();
const checkToken = require('../common/checkToken')

const guessinfo = require("./guess-info.js");
const register = require("./register.js");
const login = require("./login.js");
const userinfo = require("./userinfo.js");
const confirmOrder = require("./confirm-order.js");



// 需要登录较验
router.all('*', function(res, req, next){
	var path = res.path;
	console.log(path);
	if (path == '/userinfo' || 
		path == '/guess-info' ||
		path == '/confirm-order') {
		checkToken(res, req, next);
		return;
	}
	next();
})
router.get('/guess-info', guessinfo);
router.get('/userinfo', userinfo);
router.post('/confirm-order', confirmOrder);
router.post('/register', register);
router.post('/login', login);
module.exports = router;
