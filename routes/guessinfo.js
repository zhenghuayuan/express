const util = require("../common/util")
const pool = require('../db/index')
module.exports = (req, res, next)=>{
	let currentPreiods = util.createPreiods() // 当前期数
	let lastPreiods = util.createLastPreiods() // 上一期数
	Promise.all([
		pool('select * from historylottery where preiods = ?', [lastPreiods]),
		pool('select sum(betMizu) as allMizu from lotteryorder where preiods = ?', [currentPreiods])
	])
	.then(data=>{
		let historylottery = data[0]
		let allMizu = data[1][0]['allMizu']
		let lotteryOptions = '[]'
		if (historylottery.length == 0) {
			lotteryOptions = '[]'
		}else{
			lotteryOptions = historylottery[0]['lotteryOptions']
		}
		res.json({
			code: 0,
			body: {
				serverCurrentTime: +new Date(), //当前毫秒数
				newestOpenLotteryTime: util.createTargetTime(), // 本期开奖时间
				lotteryPool: allMizu || 0, // 当前奖池
				currentPreiods: currentPreiods, // 当前期数
				lastPreiods: lastPreiods, // 上一期数
				lastResult: JSON.parse(lotteryOptions) // 上一期结果	
			},
			msg: "",
		}) 
		
	})
}


