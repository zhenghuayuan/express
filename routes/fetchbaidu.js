var express = require('express');
var router = express.Router();
var request = require('request');
var querystring = require('querystring');
var axios = require('axios');
var http = require('http');

var postData = querystring.stringify({
	'content': '一起学习学习吧',
	'mid': 8837,
})
var options = {
    hostname: 'http://www.imooc.com',
    port: 80, //端口号 https默认端口 443， http默认的端口号是80
    path: '/course/docomment',
    method: 'POST',
    //伪造请求头
    headers: {
        'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Cache-Control':'no-cache',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'PHPSESSID=ss0phnm488lcmgliki3asplsg1; imooc_uuid=3eb03f92-6aac-42cd-871b-2c9b18d83f23; imooc_isnew=1; imooc_isnew_ct=1495193886; loginstate=1; apsid=ViYWU4MjcwYTVmYmRhZGJiODZhODI2YTFhMDY3NWYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjA5MjAyNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1MjY1NjY5NjZAcXEuY29tAAAAAAAAAAAAAAAAAAAAADczYzRiODRkNjdjNjcyODAxMzQ2NGYxNGZjOTNhNjNis9keWbPZHlk%3DZW; last_login_username=526566966%40qq.com; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1495193863,1495196874; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1495198196; cvde=591ed91e1b385-166',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'Pragma':'no-cache',
		'Referer':'http://www.imooc.com/video/8837',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest',
    }
};
router.post('/', function(req, res, next) {
	var REQ = http.request(options, function(RES){
		var arr = [];
		RES.on("data", function(chunk){
			arr.push(chunk);
			console.log(arr.length);
		})
		RES.on("end", function(){
			arr = arr.toString();
			res.json({
				content: arr
			})
		})
	});
	REQ.on("error", function(e){
		console.log(`error:${e}`)
	})
	REQ.write(postData); 
	REQ.end();
});

module.exports = router;

// router.post('/', function(req, res, next) {
	//post req.body
	//get req.query
	// res.json({
		// content: req.param.content,
		// age: req.param.age,
	// })
	// axios.get('https://www.ngrok.cc/', {})
	// .then(function (response) {
	// 	res.json({
	// 		content: response.data
	// 	})
	// })
	// .catch(function (error) {
	// 	console.log("error");
	// });
// });