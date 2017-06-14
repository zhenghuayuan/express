let Sequelize = require('sequelize')
let seque = require('../seque')

// 创建模型
let UserInfo = seque.define('test', {
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
	createTime: {
		type: Sequelize.INTEGER,
	}
})
// 创建表
seque.sync()
.then(function() {
    UserInfo.create({
        userid : 12323,
        username: '',
        password: '',
        role: 1,
        userpic: '',
        sex: 1,
        age: 1,
        city: '',
        mobile: '',
        email: '',
        mizu: 1212,
        token: '',
        createTime: 1212,
    })
    .done(function (err, result){
        console.log(err)
        console.log(result)
    })
})
.catch(function (err){
	console.log(err);
})
module.exports = UserInfo

