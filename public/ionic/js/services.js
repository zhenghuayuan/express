/**
 * 服务
 */
angular.module('starter.services', [])
    // Ionic
    .service('ApiService', ['$http', '$q', 'ConfigService', function ($http, $q, ConfigService) {
        return {
            // get接口
            get: function (data,url) {
                var deferred = $q.defer();
                var url = ConfigService.getHost()+url;
                $http({
                    method: 'GET',
                    url: url,
                    params: data,
                }).success(
                    function (data, status, header, config) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
            // post接口
            post: function (data,url) {
                var deferred = $q.defer();
                var url = ConfigService.getHost() + url;
                $http({
                    method: 'POST',
                    url: url,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: data
                }).success(
                    function (data, status, header, config) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
      
      // 微信支付接口
            wxPost: function (data) {
                var deferred = $q.defer();
                var url = ConfigService.getWxhost();
                $http({
                    method: 'POST',
                    url: url,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: data
                }).success(
                    function (data, status, header, config) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
      
        }
    }])
    .service('ConfigService', [function () {
        // var hostURL = "https://dcyouxi.com/index.php/";
        var hostURL = "http://192.168.1.55/dcxcx/index.php/";

        var wxPayURL = "http://dcpay.youjianmj.com/dcmjpay/wxpay.php";
        var service = {
            getHost: function () {
                var localhost = window.location.host;
                if(localhost == 'localhost'){
                    hostURL = 'http://localhost/dcxcx/index.php/';
                }
                return hostURL;
            },
            getWxhost: function () {
                return wxPayURL;
            }
        }
        return service;
    }])
    .service('Highcharts', function () {
        return {
            get: function (name,type,data,x) {
                return {
                    title:{
                        text:null
                    },
                    xAxis: {
                        categories: x,
                        labels: {
                            enabled: false
                        },
                        tickWidth:0,
                    },
                    yAxis: {
                        title: {
                            text: null
                        },
                        labels: {
                            enabled: false
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            },
                            enableMouseTracking: true
                        }
                    },
                    series: [{
                        name: name,
                        type: type,
                        data: data,
                        color:'#49b6f5',
                        showInLegend:false,
                        marker: {
                            enabled: false
                        },
                        tooltip: {
                        }
                    }],
                    legend: {
                        enabled: false,
                    },
                    
                }
            },
        }
    })


