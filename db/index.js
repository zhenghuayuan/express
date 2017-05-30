var mysql = require('mysql');
var pool= mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	port: '3306',
	database: 'guessFood',
	// 最大连接数，默认为10
	connectionLimit: 10,
});
module.exports = function(sql, values){
	return new Promise(function(resolve, rejcet){
		pool.getConnection(function(err, connection){
			if(err){
				rejcet(err);
				return;
			}
			connection.query(sql, values, function(err, result){
				connection.release();
				if(err){
					rejcet(err);
					return;
				};
				resolve(result);
			})
		});
	})
};

// 连接池使用
// pool.getConnection(function(err, connection){
// 	if(err){
// 		console.log(err);
// 		return;
// 	}
// 	connection.query('SELECT 1 + 1 AS solution', function(err,result){
// 		connection.release();
// 		if(err){
// 		  console.log(err);
// 		  return;
// 		}
// 		console.log('The solution is: ', result[0].solution);
// 	})
// })