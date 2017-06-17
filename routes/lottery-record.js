const pool = require('../db/index')
module.exports = function(res, req, next){
	var page = res.query.page
	var size = res.query.size
	var userid = res.userid
	console.log(userid)
	var sql = 'select * from lotteryorder where userid = ' + userid + ' order by createTime DESC limit '+ page*size + ',' + size // order by createTime DESC 正序查找 ASC 倒序查找 DESC
	pool(sql, [])
	.then(data=>{
		let jsonBody = data
		jsonBody.forEach(item=>{
			item['lotteryOptions'] = JSON.parse(item['lotteryOptions'])
			item['betOptions'] = JSON.parse(item['betOptions'])
		})
		req.json({
			code: 0,
			body: jsonBody,
			msg: "",
		}) 
	})
	.catch(e=>{
		console.log(e)
	})
}

