const jwt = require('jsonwebtoken')
const crypto = require('crypto')
let util = new Object()
util.config = {}
util.config.PRICE = 200 // 单价
util.config.foodItems = [
    {name: "炸鸡", classname: "zj", index: 1,  hot: 9.9, active: false,},
    {name: "米饭", classname: "mf", index: 2,  hot: 9.9, active: false,},
    {name: "果汁", classname: "gz", index: 3,  hot: 9.9, active: false,},
    {name: "羊肉串", classname: "yrc", index: 4,  hot: 9.9, active: false,},
    {name: "寿司", classname: "ss", index: 5,  hot: 9.9, active: false,},
    {name: "拉面", classname: "lm", index: 6,  hot: 9.9, active: false,},
    {name: "可乐", classname: "kl", index: 7,  hot: 9.9, active: false,},
    {name: "小龙虾", classname: "xlx", index: 8,  hot: 9.9, active: false,},
    {name: "西瓜", classname: "xg", index: 9,  hot: 9.9, active: false,},
    {name: "火锅", classname: "hg", index: 10,  hot: 9.9, active: false,},
    {name: "扇贝", classname: "sb", index: 11,  hot: 9.9, active: false,},
    {name: "啤酒", classname: "pj", index: 12,  hot: 9.9, active: false,},
    {name: "披萨", classname: "ps", index: 13,  hot: 9.9, active: false,},
    {name: "汉堡", classname: "hb", index: 14,  hot: 9.9, active: false,},
    {name: "牛奶", classname: "nn", index: 15,  hot: 9.9, active: false,},
    {name: "香蕉", classname: "xj", index: 16,  hot: 9.9, active: false,},
]

// 创建jwt
util.createToken = function(userid){
    var token = jwt.sign({
        userid: userid
    }, "zheng", {
        expiresIn: 1000*60*60*24*7 + "ms" //字符串 默认单位ms 那么decode这个token的时候得到的过期时间为 创建token的时间 +　设置的值
    })
    return token	
}
// 创建md5值
util.createMd5 = function(obj){
	let md5 = crypto.createHash('md5')
	let arr = []
	for(let key in obj){
		arr.push(obj[key])
	}
	let str = arr.sort().join('')
	let res = md5.update(str).digest('hex')
	return res
}
// 创建当前期号
util.createPreiods = function(){
	var d = util.format(+new Date(), 'yyyy-MM-dd hh')
	return d.replace(/[^0-9]/g, '')
}
// 创建本期开奖时间
util.createTargetTime = function (){
	var d = new Date(+new Date()+1000*60*60)
	return +new Date(util.format(+d, 'yyyy/MM/dd hh:00'))
	// return util.format(new Date( str), 'yyyy-MM-dd hh:mm:ss')
}
// 计算组数
util.calcuZu = function (n){
	// @param 选择的个数
	return (n-2)*(n-1)*n/6
}
util.randomNoRepeat = function(leng, start, end){
	/***
	* 随机不重复数字
	* @param 随机个数，起始值，终点值
	* 返回一个数组
	*/ 
	var arr = [];
	while(arr.length < leng){
		var i = rand(start, end)
		arr.indexOf(i) == -1 && arr.push(i)
	}
	return arr;
}
function rand(start, end){
	// @param 包括起始值 和 终点值
	// 返回一个数字
	// rand(end-start)+start 范围值随机加限定的最小值
	// 判断end是否大于start
	if (start > end) {var i = 0;i = start;start = end;end = i;}
	return Math.floor(Math.random()*(end-start+1))+start
}
util.format = function(ms, fmt) {
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
	}
	if (/(y+)/.test(fmt)){
		fmt = fmt.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length))
	}
	for (var i in obj){
		if (new RegExp("(" + i + ")").test(fmt)){
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (obj[i]) : (("00" + obj[i]).substr(("" + obj[i]).length)))
		}
	}
	return fmt
}
module.exports = util  
