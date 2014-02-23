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
        controller: HomeCtrl
      }).
      when('/join', {
        templateUrl: 'partials/join.ejs',
        controller: 'JoinCtrl'
      }).
      when('/party/:url', {
        controller: 'PartyCtrl',
        templateUrl: '/partials/parties.ejs'
      }).
      when('/party/undefined', {
        redirectTo: '/'
        // maybe a ctrl to handle this specific error?
        // render a template with the error message to the screen?
        // error handling, what?
      }).
      otherwise({
        redirectTo: '/'
      })

    $locationProvider.html5Mode(true)
}])