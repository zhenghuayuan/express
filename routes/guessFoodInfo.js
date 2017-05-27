module.exports = function(res, req, next){
	req.json({
		serverCurrentTime: +new Date(), //当前毫秒数
		newestOpenLotteryTime: +new Date()+1000*60*60,
		lotteryPool: 99999, // 当前奖池
		mizu: 888, // 当前觅钻
	}) 
}