const express = require('express');
const router = express.Router();
const checkToken = require('../common/checkToken')

const guessFoodInfo = require("./guessFoodInfo.js");
const register = require("./register.js");
const login = require("./login.js");
const userInfo = require("./userInfo.js");
const confirmOrder = require("./confirm-order.js");



// 需要登录较验
router.all('*', function(res, req, next){
	var path = res.path;
	console.log(path);
	if (path == '/userInfo' || 
		path == '/guessFoodInfo' ||
		path == '/confirm-order') {
		checkToken(res, req, next);
		return;
	}
	next();
})
router.get('/guessFoodInfo', guessFoodInfo);
router.get('/userInfo', userInfo);
router.post('/confirm-order', confirmOrder);
router.post('/register', register);
router.post('/login', login);
module.exports = router;
