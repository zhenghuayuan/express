let Sequelize = require('sequelize')
let seque = require('../seque')

// 创建模型
let UserInfo = seque.define('userinfo', {
    	userid: {
    		type: Sequelize.INTEGER,
            primaryKey: true, // 主键
            autoIncrement: true // 自曾
    	},
        username: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        role: {
            type: Sequelize.INTEGER,
        },
        userpic: {
            type: Sequelize.STRING,
        },
        sex: {
            type: Sequelize.INTEGER,
        },
        age: {
            type: Sequelize.INTEGER,
        },
        city: {
            type: Sequelize.STRING,
        },
        mobile: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        mizu: {
            type: Sequelize.INTEGER,
        },
        token: {
            type: Sequelize.STRING,
        },
    	createdAt: {
    		type: Sequelize.BIGINT,
    	},
        updatedAt: {
            type: Sequelize.BIGINT,
        },

    },{
        timestamps: false // 不添加时间戳 (updatedAt, createdAt)
})
// 创建表
// seque.sync()
// .then(function() {
//     UserInfo.create({
//         userid : 100001,
//         username: 'root',
//         password: '0000',
//         role: 1,
//         userpic: '',
//         sex: 1,
//         age: 18,
//         city: '',
//         mobile: '',
//         email: '',
//         mizu: 0,
//         token: '',
//         createdAt: +new Date(),
//         updatedAt: +new Date()
//     })
//     .done(function (err, result){
//         console.log(err)
//         console.log(result)
//     })
// })
// .catch(function (err){
// 	console.log(err);
// })
module.exports = UserInfo
// tinyint  -128 - 127
// smallint -32768 - 32767
// int      -2100000000 - 2100000000
// bingint  超大整数

// float(m,d)   单精度浮点型    8位精度(4字节)     m总个数，d小数位
// double(m,d)  双精度浮点型    16位精度(8字节)    m总个数，d小数位

// varchar      固定长度，最多65535个字符
// char         固定长度，最多255个字符固定长度
// tinytext     可变长度，最多255个字符
// text         可变长度，最多65535个字符
// mediumtext   可变长度，最多2的24次方-1个字符
// longtext     可变长度，最多2的32次方-1个字符