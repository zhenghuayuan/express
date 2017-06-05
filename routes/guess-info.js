module.exports = function(res, req, next){
	
	req.json({
		code: 0,
		body: {
			serverCurrentTime: +new Date(), //当前毫秒数
			newestOpenLotteryTime: target(),
			lotteryPool: 99999, // 当前奖池
			mizu: 888, // 当前觅钻
		},
		msg: "",
		
	}) 
}
function target(){
	var d = new Date(+new Date()+1000*60*60)
	var str = `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()} ${d.getHours()}:0:0`
	return +new Date(str)
	// return format(new Date( str), 'yyyy-MM-dd hh:mm:ss')
}