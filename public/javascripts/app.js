var queuedApp = angular.module('queuedApp', [
  'ngRoute',
  'queuedControllers'
  ])

queuedApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/welcome.ejs',
        controller: 'WelcomeCtrl'
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
        redirectTo: '/home'
      })

    $locationProvider.html5Mode(true)
}])