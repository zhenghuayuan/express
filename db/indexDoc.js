var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port	   : 3306, 
  user     : 'root',
  password : '',
  database : 'test',
});
connection.connect();

// mac 先关闭mysql
// cd /usr/local/mysql-5.7.10-osx10.9-x86_64/bin
// sudo su
// ./mysqld_safe --skip-grant-tables & (会启动mysql)
// ./mysql

// 查询
// connection.query('SELECT * FROM userInfo WHERE userid = ?',1, function(err, res, fields) {
// 	if (err){
// 		console.log(`error:${err}`);
// 		return;
// 	}
//  //查询结果 res（数组）
// 	console.log(`res: ${JSON.stringify(res[0])}`);
// });

//增加
// connection.query('INSERT INTO userInfo(userid,age,sex,job,email,name) VALUES(?,?,?,?,?,?)', [3,5,1,"记者","990183318@qq.com", "wangqing"], function(err, fields) {
// 	if (err){
// 		console.log(`error:${err}`);
// 		return;
// 	}
// 	// 没有res 只有fields
// 	console.log(`res: ${JSON.stringify(fields)}`);
// });

// 修改
// connection.query('UPDATE userInfo SET job = ?,age = ? WHERE userid = 2', ['有工作',99], function(err, fields) {
// 	if (err){
// 		console.log(`error:${err}`);
// 		return;
// 	}
// 	// 没有res 只有fields
// 	console.log(`res: ${JSON.stringify(fields)}`);
// });

// 删除
// connection.query('DELETE FROM userInfo WHERE userid = ?', [3], function(err, fields) {
// 	if (err){
// 		console.log(`error:${err}`);
// 		return;
// 	}
// 	// 没有res 只有fields
// 	console.log(`res: ${JSON.stringify(fields)}`);
// });

//创建数据库
// connection.query('create dbname '+TEST_DATABASE, function(err) {
// 	if (err && err.number != mysql.ERROR_DB_CREATE_EXISTS) {
// 		throw err;
// 	}
// });

// connection.query('USE '+TEST_DATABASE);//使用该数据库

// //创建表
// connection.query(
// 	'CREATE TABLE '+"表名"+
// 	'(id INT(11) AUTO_INCREMENT, '+
// 	'username VARCHAR(255), '+
// 	'password VARCHAR(255), '+
// 	'created DATETIME, '+
// 	'PRIMARY KEY (id))'
// );
// connection.end();


/*******************router************************/
var express = require('express');
var router = express.Router();
 
var userDao = require('../dao/userDao');
 
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
 
// 增加用户
//TODO 同时支持get,post
router.get('/addUser', function(req, res, next) {
	userDao.add(req, res, next);
});
 
router.get('/queryAll', function(req, res, next) {
	userDao.queryAll(req, res, next);
});
 
router.get('/query', function(req, res, next) {
	userDao.queryById(req, res, next);
});
 
router.get('/deleteUser', function(req, res, next) {
	userDao.delete(req, res, next);
});
 
router.post('/updateUser', function(req, res, next) {
	userDao.update(req, res, next);
});
 
module.exports = router;


/*******************完整的userDao.js为************************/
// var user = {
// 	insert:'INSERT INTO user(id, name, age) VALUES(0,?,?)',
// 	update:'update user set name=?, age=? where id=?',
// 	delete: 'delete from user where id=?',
// 	queryById: 'select * from user where id=?',
// 	queryAll: 'select * from user'
// };
 

// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');
 
// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));
 
// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};
 
module.exports = {
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.query || req.params;
 
			// 建立连接，向表中插入值
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
			connection.query($sql.insert, [param.name, param.age], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'增加成功'
					};    
				}
 
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);
 
				// 释放连接 
				connection.release();
			});
		});
	},
	delete: function (req, res, next) {
		// delete by Id
		pool.getConnection(function(err, connection) {
			var id = +req.query.id;
			connection.query($sql.delete, id, function(err, result) {
				if(result.affectedRows > 0) {
					result = {
						code: 200,
						msg:'删除成功'
					};
				} else {
					result = void 0;
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	update: function (req, res, next) {
		// update by id
		// 为了简单，要求同时传name和age两个参数
		var param = req.body;
		if(param.name == null || param.age == null || param.id == null) {
			jsonWrite(res, undefined);
			return;
		}
 
		pool.getConnection(function(err, connection) {
			connection.query($sql.update, [param.name, param.age, +param.id], function(err, result) {
				// 使用页面进行跳转提示
				if(result.affectedRows > 0) {
					res.render('suc', {
						result: result
					}); // 第二个参数可以直接在jade中使用
				} else {
					res.render('fail',  {
						result: result
					});
				}
 
				connection.release();
			});
		});
 
	},
	queryById: function (req, res, next) {
		var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryById, id, function(err, result) {
				jsonWrite(res, result);
				connection.release();
 
			});
		});
	},
	queryAll: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll, function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	}
 
};