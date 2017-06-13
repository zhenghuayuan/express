const pool = require('../db/index')
const util = require('../common/util')
console.log("游戏运行中...")

function statistics(){
	let preiods =  util.createPreiods() // 创建本期期数
	let lotteryOptions = createLotteryOptions() // 本期随机开奖结果
	let lotteryPool = 999 // 本期奖池
	let allBetGrounp = 50 // 本期组数
	let luckyOrderArr = [] // 本期中奖订单
	
	// pool('insert into historylottery(preiods, lotteryOptions, lotteryPool, allBetGrounp) values(?,?,?,?)', [preiods, lotteryOptions, lotteryPool, allBetGrounp])
	// .then((data)=>{
	// 	return 
	// })
	pool('select * from lotteryorder where preiods=?', [preiods])
	// 查找中奖者
	.then(data=>{
		if (data.length == 0) {
			return Promise.reject("本期暂无订单")
		}
		luckyOrderArr = findLucky(lotteryOptions, data)
		return 
	})
	// 本期订单状态置为 2(未中奖)
	.then(data=>{
		return pool('update lotteryorder set status = ?, lotteryOptions = ?  where preiods=?', [2, lotteryOptions, preiods])
	})
	// 中奖者状态修改
	.then(data=>{
		if (luckyOrderArr.length == 0) {
			return Promise.reject("本期无人中奖")
		}
		
		// 中奖人订单置为 3(已中奖)
		let sql1 = 'update lotteryorder set status = 3 where orderId in ($values)'
		let orderIdArr = []
		// 中奖订单添加到中奖列表
		let sql2 = 'insert into luckyuser(preiods, lotteryOptions, userid, orderId, betOptions) values$values'
		let luckyuserArr = []
		// 增加一条历史开奖记录
		let sql3 = 'insert into historylottery(preiods, lotteryOptions, lotteryPool, allBetGrounp, lotteryUser) values(?,?,?,?,?)'
		let lotteryUser = []

		luckyOrderArr.forEach(item=>{
			for(let key in item){
				if (typeof item[key] == 'string'){
					item[key] = JSON.stringify(item[key])
				}
			}
			orderIdArr.push(item.orderId) // values 如果是字符串类型 必须手动加上 \' (引号) 或者 JSON.stringify()
			luckyuserArr.push('('+item.preiods+','+JSON.stringify(lotteryOptions)+','+item.userid+','+item.orderId+','+item.betOptions+')')
			lotteryUser.push(item.userid)
		})
		sql1 = sql1.replace(/\$values/g, orderIdArr.join(','))
		sql2 = sql2.replace(/\$values/g, luckyuserArr.join(','))
		return Promise.all([
			pool(sql1, []),
			pool(sql2, []),
			pool(sql3, [preiods, lotteryOptions, lotteryPool, allBetGrounp, JSON.stringify(lotteryUser)])
		])
	})
	.then(data=>{
		console.log('本期开奖操作成功')
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

