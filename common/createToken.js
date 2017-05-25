var jwt = require('jsonwebtoken');
module.exports = function(userid){
    var token = jwt.sign({
        userid: userid
    }, "zheng", {
        expiresIn: 1000*30 + "ms" //字符串 默认单位ms 那么decode这个token的时候得到的过期时间为 创建token的时间 +　设置的值
    });
    return token;	
}