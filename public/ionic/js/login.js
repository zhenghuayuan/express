angular.module('login.controller', [])  
	.controller('loginCtrl', function ($scope, $http, $state, $ionicPopup,ApiService) {
	    var handlerEmbed =  function (captchaObj) {
	    	$scope.signIn = function(){
	    		var validate = captchaObj.getValidate();
	    		if(validate){
	    			page.login();
	    		}else{
	    			document.getElementById('tips_error').innerHTML = "请先拖动验证码到相应位置";
	    		}
	    	}
	        // 将验证码加到id为captcha的元素里，同时会有三个input的值：geetest_challenge, geetest_validate, geetest_seccode
	        captchaObj.appendTo("#embed-captcha");
	        captchaObj.onReady(function () {
            	document.getElementById('wait').className = "hide";
	        });
	    };
		var page = $scope.page = {
	        user: {
	            username: '',
	            password: '',
	        },
	        init: function () {
	            this.vercode();
	        },
	        login : function(){
	        	ApiService.post(this.user,'Ionic/dologin').then(function (data) {
	        		if(data){
	        			if(data.status == 1){
	        				$state.go('tab.data');
	        			}else{
	        				document.getElementById('tips_error').innerHTML = data.message;
	        			}
	        		}else{
	        			document.getElementById('tips_error').innerHTML == '请重试';
	        		}
				})
			},
			vercode: function (){
				ApiService.get({type:'pc',t:(new Date()).getTime()},'Ionic/verify').then(function (data) {
					initGeetest({
		                gt: data.gt,
		                challenge: data.challenge,
		                product: "embed", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
		                offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
		                // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
		            },handlerEmbed);
				})
			}
	    }
	    page.init();
	}  
);