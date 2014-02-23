var queuedApp = angular.module('queuedApp', [
  'ngRoute',
  'queuedControllers'
  ])

queuedApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/welcome.ejs',
        controller: 'WelcomeCtrl'
      }).
      when('/home', {
        templateUrl: 'partials/home.ejs',
        controller: 'HomeCtrl'
      }).
      when('/join', {
        templateUrl: 'partials/join.ejs',
        controller: 'JoinCtrl'
      }).
      when('/party/:url', {
        controller: 'PartyCtrl',
        templateUrl: '/partials/parties.ejs'
      }).
      otherwise({
        redirectTo: '/'
      })

    $locationProvider.html5Mode(true)
}])