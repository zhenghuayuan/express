const express = require('express');
const router = express.Router();
const checkToken = require('../common/checkToken')

const guessinfo = require("./guessinfo.js");
const register = require("./register.js");
const login = require("./login.js");
const userinfo = require("./userinfo.js");
const confirmOrder = require("./confirm-order.js");
const openlotteryResult = require("./openlottery-result.js");
const lotteryRecord = require("./lottery-record.js");
const historyLottery = require("./history-lottery.js");

// 需要登录较验
router.all('*', function(res, req, next){
	var path = res.path;
	console.log(path);
	// if (path == '/userinfo' || 
	// 	path == '/guessinfo' ||
	// 	path == '/confirmOrder' ||
	// 	path == '/lotteryRecord' ||
	// 	path == '/historyLottery') {
	// 	checkToken(res, req, next);
	// 	return;
	// }
	checkToken(res, req, next);
	// next();
})

router.get('/guessinfo', guessinfo);
router.get('/userinfo', userinfo);
router.post('/confirmOrder', confirmOrder);
router.get('/openlotteryResult', openlotteryResult);
router.get('/lotteryRecord', lotteryRecord);
router.get('/historyLottery', historyLottery);

router.post('/register', register);
router.post('/login', login);
module.exports = router;
