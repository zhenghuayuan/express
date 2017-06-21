angular.module('chats.controller', [])  
	.controller('chatsCtrl', function ($scope, $http, $state, $ionicPopup) {  
		$scope.chats = Chats.all();
		$scope.remove = function(chat) {
			Chats.remove(chat);
		}
	}  
);