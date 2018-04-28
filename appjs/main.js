(function() {

    var app = angular.module('AppChat',['ngRoute']);

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider, $location) {
        $routeProvider.when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'LoginController',
            controllerAs : 'logingCtrl'
        }).when('/chat', {
            templateUrl: 'pages/chat.html',
            controller: 'ChatController',
            controllerAs : 'chatCtrl'
        }).when('/messageDetails/:id', {
            templateUrl: 'pages/messagedetails.html',
            controller: 'MessageDetailsController',
            controllerAs: 'msgdetailsCtrl'
        }).otherwise({
            redirectTo: '/chat'
        });
    }]);
    console.log("Main");
})();