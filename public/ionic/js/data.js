'use strict';
angular.module('data.controller', [])  
	.controller('dataCtrl', function ($scope, $http, $state, $ionicPopup, $timeout, ApiService, Highcharts) {
        $scope.data = {
            registerTotal:0,
            newPlayer:[0,0,0],//新增玩家
            gamePlayer:[0,0,0],//活跃玩家
            income:[0,0,0],//充值
            card:[0,0,0],//房卡
            playerStatistics:[],//折线图
            gameStatistics:[],
            incomeStatistics:[],
            cardStatistics:[],
        };
        ApiService.post(this.user,'Ionic/statistics').then(function (data) {
            if(data){
                if(data.code == 1){
                    console.log(data)
                    $scope.data.registerTotal = data.registerTotal;
                    $scope.data.newPlayer = data.newPlayer;
                    $scope.data.gamePlayer = data.gamePlayer;
                    $scope.data.income = data.income;
                    $scope.data.card = data.card;
                    $scope.data.playerStatistics = data.playerStatistics;
                    $scope.data.gameStatistics = data.gameStatistics;
                    $scope.data.incomeStatistics = data.incomeStatistics;
                    $scope.data.cardStatistics = data.cardStatistics;

                    //新增玩家折线图
                    $scope.chartUser = Highcharts.get('新增玩家','line',$scope.data.playerStatistics,data.date);
                    //活跃玩家折线图
                    $scope.chartActive = Highcharts.get('活跃玩家','line',$scope.data.gameStatistics,data.date);
                    //充值金额折线图
                    $scope.chartIncome = Highcharts.get('充值金额','line',$scope.data.incomeStatistics,data.date);
                    //房卡消耗折线图
                    $scope.chartCard = Highcharts.get('房卡消耗','line',$scope.data.cardStatistics,data.date);

                    //各游戏房卡消耗柱状图
                    $scope.columnConfig = Highcharts.get('各游戏房卡消耗','column',[1,5,6,7,2,9,3],data.date);
                }else{
                    // $scope.Popup(data.message,'',function(){
                    //     $state.go('login');
                    // });
                }
            }else{
                $scope.Popup('请检查网络重试',1);
            }
        })

        //弹出框
        $scope.Popup = function(content,timeout,fun){
            var alertPopup = $ionicPopup.alert({
                title: '提醒',
                template: content
            });

            alertPopup.then(function(res) {
                if(fun){
                    fun();
                }
            });
            if(timeout == 1){
                $timeout(function() {
                    alertPopup.close(); //由于某种原因3秒后关闭弹出
                }, 1000);
            }
        }
        
	}  
);