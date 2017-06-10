const pool = require('../db/index')
const util = require('../common/util')
console.log("游戏运行中...")

function statistics(){
	let preiods =  util.createPreiods() // 创建当前期数
	let lotteryOptions = createLotteryOptions() //  本期随机开奖结果
	let lotteryPool = 999 // 本期奖池
	let allBetGrounp = 50 // 本期组数

	pool('insert into historylottery(preiods, lotteryOptions, lotteryPool, allBetGrounp) values(?,?,?,?)', [preiods, lotteryOptions, lotteryPool, allBetGrounp])
	.then((data)=>{
		return pool('select * from lotteryorder where preiods=?', [preiods])
	})
	.then((data)=>{
		if (data.length == 0) {
			return Promise.reject("本期暂无订单")
		}
		pool('update lotteryorder set status = 2 where preiods=?', [preiods])
		.then(data=>{
			console.log("订单更新完成")
		})
		.catch(e=>{
			console.log(e)
		})
		return findLucky(lotteryOptions, data)
	})
	.then(luckyOrderArr=>{
		if (luckyOrderArr.length == 0) {
			return Promise.reject("本期无人中奖")
		}
		let sql = 'insert into luckyuser(preiods, lotteryOptions, userid, orderId, betOptions) values'
		let values = []
		luckyOrderArr.forEach(item=>{
			sql += '(?,?,?,?,?),'
			// sql+= '('+item.preiods+','+lotteryOptions+','+item.userid+','+item.orderId+','+item.betOptions+'),'
			let arr = [item.preiods, lotteryOptions, item.userid, item.orderId, item.betOptions]
			values = values.concat(arr)
		})
		sql = sql.slice(0, sql.length-1)
		console.log(sql)
		return pool(sql, values)
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

