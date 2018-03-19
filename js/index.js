/**
 * Created by bjwsl-001 on 2016/11/4.
 */
var app = angular.module('myApp', ['ng','ngRoute','ngAnimate']);
app.config(function($routeProvider){
    $routeProvider.when('/start',{templateUrl:'code/start.html'})
        .when('/main',{templateUrl:'code/main.html',controller:'mainCtrl'})
        .when('/detail',{templateUrl:'code/detail.html',controller:'detailCtrl'})
        .when('/detail/:did',{templateUrl:'code/detail.html',controller:'detailCtrl'})
        .when('/myOrder',{templateUrl:'code/myOrder.html',controller:'myorderCtrl'})
        .when('/order',{templateUrl:'code/order.html',controller:'orderCtrl'})
        .when('/order/:did',{templateUrl:'code/order.html',controller:'orderCtrl'})
        .otherwise({redirectTo:'/start'});
});
//声明父控制器
app.controller('myCtrl',['$scope','$location',function($scope,$location){
    $scope.jump = function (path) {
        $location.path(path);
    }
}]);
//异步加载菜单详情
app.controller('mainCtrl',['$scope','$http',function($scope,$http){
    $scope.hasMore=true;
    $http.get('php/product.php?pageNum=0')
                .success(function(data){
                //console.log(data);
                $scope.list=data;
        });
    $scope.loadMore = function () {
        $http.get('php/product.php?pageNum='+$scope.list.length)
            .success(function (data) {
                //console.log(data);
                $scope.list = $scope.list.concat(data);
                if(data.length < 5){
                    $scope.hasMore = false;
                }
            });
    };
    $scope.$watch('kw',function(){
        //console.log($scope.kw);
        if($scope.kw) {
            $http.get('php/dish_getbykw.php?kw='+$scope.kw)
                .success(function (data) {
                    $scope.list = data;
                });
        }
    })
}]);
//声明一个DetailCtrl控制器
app.controller('detailCtrl', function ($scope,$http,$routeParams) {
    $http.get('php/dish.php?id='+$routeParams.did)
        .success(function (data) {
            console.log(data);
            $scope.dish = data[0];
        })
});
//声明一个orderCtrl控制器
app.controller('orderCtrl', ['$scope','$rootScope','$http','$routeParams',
    function ($scope,$rootScope,$http,$routeParams) {
        console.log($routeParams.did);
        $scope.order = {"did":$routeParams.did};
        $scope.submitOrder = function () {
            var str = jQuery.param($scope.order);
            console.log(str);
            $http.get('php/order_add.php?'+str)
                .success(function (data) {
                    if(data[0].msg == 'succ') {
                        $rootScope.phone = $scope.order.phone;
                        console.log($rootScope.phone);
                        $scope.succMsg = "订餐成功！您的订单编号为："+data[0].oid+"您可以在用户中心查看订单状态";
                    } else {
                        $scope.errMsg = "下单失败！原因："+data[0].reason;
                    }
                })
        }
    }
]);
//声明myorderCtr控制器
app.controller('myorderCtrl',['$scope','$http','$rootScope',function ($scope,$http,$rootScope) {
    console.log($rootScope.phone);
    $http.get('php/getbyphone.php?phone='+$rootScope.phone)
        .success(function (data) {
            $scope.orderList = data;
        })

}]);
/*//ajax异步加载菜单
$(function(){
    loadlist();
});
function loadlist(){
    $.ajax({
        url:'php/product_page.php',
        success:function(data){
            //console.log("开始处理相应数据了");
            //console.log(arguments);
            var html='';
            $.each(data,function(i,kf_dish){
                html+=`<li class="list-group-item">
            <div class="media">
                <div class="media-left">
                    <a href="">
                        <img class="media-object" src="${kf_dish.img_sm}" alt=""/>
                    </a>
                </div>
                <div class="media-body">
                    <h3 class="media-heading">${kf_dish.name}</h3>
                    ${kf_dish.material}
                    <hr/>
                    <span>￥${kf_dish.price}</span>
                </div>
            </div>
        </li>`;
            });
            $('ul.list-group').html(html);
        },
        error:function(){
            console.log("未找到相关数据");
        }
    })
}*/
