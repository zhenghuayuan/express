let util = require("../common/util")
module.exports = (res, req, next)=>{
	req.json({
		code: 0,
		body: {
			serverCurrentTime: +new Date(), //当前毫秒数
			newestOpenLotteryTime: util.createTargetTime(),
			lotteryPool: 99999, // 当前奖池
			mizu: 888, // 当前觅钻
			currentPreiods: util.createPreiods() // 当前期数
		},
		msg: "",
	}) 
}