
module.exports = function(res, req, next){
	
	req.json({
		code: 0,
		body: {
			serverCurrentTime: +new Date(), //当前毫秒数
			newestOpenLotteryTime: createTarget(),
			lotteryPool: 99999, // 当前奖池
			mizu: 888, // 当前觅钻
			currentPreiods: createPreiods() // 当前期数
		},
		msg: "",
		
	}) 
}
function createTarget(){
	var d = new Date(+new Date()+1000*60*60)
	return +new Date(format(+d, 'yyyy/MM/dd hh:00'))
	// return format(new Date( str), 'yyyy-MM-dd hh:mm:ss')
}
function createPreiods(){
	var d = format(+new Date(), 'yyyy-MM-dd hh')
	return d.replace(/[^0-9]/g, '')
}

function format(ms, fmt) {
	var dateObj = new Date(Number(ms))
	// 时间格式化
	// format(+new Date(), 'yyyy-MM-dd hh:mm:ss') ==> 2006-07-02 08:09:04.423 
	// format(1202452662111, 'yyyy-M-d h:m:s.S')  ==> 2006-7-2 8:9:4.18 
	var obj = {
		"M+": dateObj.getMonth() + 1, //月份 
		"d+": dateObj.getDate(), //日 
		"h+": dateObj.getHours(), //小时 
		"m+": dateObj.getMinutes(), //分 
		"s+": dateObj.getSeconds(), //秒 
		"q+": Math.floor((dateObj.getMonth() + 3) / 3), //季度 
		"S": dateObj.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)){
		fmt = fmt.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var i in obj){
		if (new RegExp("(" + i + ")").test(fmt)){
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (obj[i]) : (("00" + obj[i]).substr(("" + obj[i]).length)))
		}
	}
	return fmt;
}