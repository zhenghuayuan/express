var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var http = require('http');
var https = require('https');

var iconv = require('iconv-lite');
// var url = 'https://ee331.com/';
var url = 'http://www.hoomic.com/';


router.get('/', function(req, res, next) {

	start(function(data) {
		res.json({
			code: 0,
			body: {
				message: data
			},
			msg: "",
		});
	})
});


function start(cb) {
	http.get(url, function(sres) {
		console.log("开始")
		var chunks = [];
		var size = 0;
		sres.on('data', function(chunk) {
			chunks.push(chunk);
		});
		// chunks里面存储着网页的 html 内容，将它zhuan ma传给 cheerio.load 之后
		// 就可以得到一个实现了 jQuery 接口的变量，将它命名为 `$`
		// 剩下就都是 jQuery 的内容了
		sres.on('end', function() {
			// var buff = Buffer.concat(chunks);  
			// var result = iconv.decode(buff, "utf8");//转码//var result = buff.toString();//不需要转编码,直接tostring  
			console.log("结束")
			// var html = iconv.decode(Buffer.concat(chunks), 'uft8');
			cb(chunks.toString().replace(/^\s+|\s+$/g, ""));
			// var titles = [];
			// 由于咱们发现此网页的编码格式为gb2312，所以需要对其进行转码，否则乱码
			// 依据：“<meta http-equiv="Content-Type" content="text/html; charset=gb2312">”
			// var $ = cheerio.load(html, {
			// 	decodeEntities: false
			// });
			// $('.co_content8 .ulink').each(function(idx, element) {
			// 	var $element = $(element);
			// 	titles.push({
			// 		title: $element.text()
			// 	})
			// })
			// console.log(titles);

		});
	});
}


module.exports = router;