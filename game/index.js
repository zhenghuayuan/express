const pool = require('../db/index')
const util = require('../common/util')
console.log("游戏运行中...")


function statistics(){
	let preiods =  util.createPreiods() // 创建当前期数
	let lotteryOptions = createLotteryOptions() // 随机开奖结果
	let lotteryPool = 999
	let allBetGrounp = 999

	pool('insert into historylottery(preiods, lotteryOptions, lotteryPool, allBetGrounp) values(?,?,?,?)', [preiods, lotteryOptions, lotteryPool, allBetGrounp])
	.then((data)=>{
		return pool('select * from lotteryorder where preiods=?', [preiods])
	})
	.then((data)=>{
		if (data.length == 0) {
			Promise.reject("本期暂无订单")
			return; 
		}
		return findLucky(lotteryOptions, data)
		
	})
	.then(luckyOrderArr=>{
		if (luckyOrderArr.length == 0) {
			Promise.reject("本期无人中奖")
			return; 
		}
		let sql = 'insert into luckyuser(preiods, lotteryOptions, userid, orderId, betOptions) values'
		let values = []
		luckyOrderArr.forEach(item=>{
			// sql+= '(?,?,?,?,?),'
			sql+= '('+item.preiods+','+lotteryOptions+','+item.orderId+','+item.userid+','+item.betOptions+'),'

			// let arr = [item.preiods, lotteryOptions, item.orderId, item.userid, item.betOptions]
			// values = values.concat(arr)
		})
		sql = sql.slice(0, sql.length-1)
		console.log(sql)
		return pool(sql, '')
	})
	.then((data)=>{
		console.log(data)
	})
	.catch(e=>{
		console.log(e)
	})
}
statistics()
// 随机开奖
function createLotteryOptions(){
	let arr = util.randomNoRepeat(3, 0, 15)
	let res = arr.map(item=>{
		return util.config.foodItems[item]['classname']
	})
	return JSON.stringify(res)
}
// 查找吧本期中奖者
function findLucky(lotteryOptions, allOrder){
	let luckyArr = [] // 中奖订单号
	lotteryOptions = JSON.parse(lotteryOptions) // lotteryOptions:开奖列表  allOrder:所有订单
	allOrder.forEach(item=>{
		let userOption = JSON.parse(item['betOptions']) // 每条订单
		let i = 0;
		lotteryOptions.forEach(luckyItem=>{
			userOption.indexOf(luckyItem) > -1 && i++
		})
		if (i >= 3) luckyArr.push(item)
	})
	return luckyArr
}

module.exports = {}

// (2017060921,["xg","hb","pj"],87479421372ec781a3973dcf34f83ad5,100001,["zj","mf","gz","yrc","ss","lm","kl","xlx","xg","hg","sb","pj","ps","hb","nn","xj"]),
// (2017060921,["xg","hb","pj"],9bf05d6f400cc7f318b2c8a8854d4c29,100001,["zj","mf","gz","yrc","ss","lm","kl","xlx","xg","hg","sb","pj","ps","hb","nn","xj"]),
// (2017060921,["xg","hb","pj"],283171a44d9ad4c818035aa96d1e8434,100001,["zj","mf","gz","yrc","ss","lm","kl","xlx","xg","hg","sb","pj","ps","hb","nn","xj"])
