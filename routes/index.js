const express = require('express');
const router = express.Router();
const checkToken = require('../common/checkToken')

const guessFoodInfo = require("./guessFoodInfo.js");
const register = require("./register.js");
const login = require("./login.js");
const userInfo = require("./userInfo.js");


// 需要登录较验
router.all('*', function(res, req, next){
	var path = res.path;
	console.log(path);
	if (path == '/userInfo' || 
		path == '/guessFoodInfo') {
		checkToken(res, req, next);
		return;
	}
	next();
})
router.get('/guessFoodInfo', guessFoodInfo);
router.get('/userInfo', userInfo);
router.post('/register', register);
router.post('/login', login);
module.exports = router;
