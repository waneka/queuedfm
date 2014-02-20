var queuedApp = angular.module('polls', [])

queuedApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/parties', { templateUrl: 'partials/parties.html', controller:
      PartiesCtrl }).
    // when('/poll/:pollId', { templateUrl: 'partials/item.html', controller:
    //   PollItemCtrl }).
    // when('/new', { templateUrl: 'partials/new.html', controller:
    //   PollNewCtrl }).
    otherwise({ redirectTo: '/polls' });
}]);