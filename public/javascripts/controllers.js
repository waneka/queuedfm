'use strict'

var queuedControllers = angular.module('queuedControllers', [])

queuedControllers.controller('WelcomeCtrl', ['$scope', function($scope) {
  // debugger
  console.log('welcome!')
}])

queuedControllers.controller('JoinCtrl', ['$scope', function($scope) {
  // debugger
  console.log('join')
}])

queuedControllers.controller('HomeCtrl', ['$scope', function($scope) {
  // debugger
  console.log('home')
}])

queuedControllers.controller('PartyCreateCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    // $scope.form = {}
    $scope.create = function() {
      $http.post('/api/new_party').
        success(function(data) {
          console.log('success!!!')
          console.log('data: ' + data.party_url)
          $location.url('/party/' + data.party_url)
        })
    }
    // some logic to create a new party page at the url: 'party/:url'
    // post it to the database
}])

queuedControllers.controller('PartyCtrl', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {
    $http.get('/api/party/' + $routeParams.url).
      success(function(data) {
        $scope.party = data.party
        console.log('party: ' + data.party.name)
      })
  // so, this should load the page that was created above ^^
  // give that page any info it may need. load the search, queue/vote, and player stuff
}])

queuedControllers.controller('PartyJoinCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    $scope.submit = function() {
      if ($scope.name) {
        $http.get('/api/join_party/' + $scope.name).
          success(function(data) {
            debugger
            console.log('Party ' + data.party.name + ' exists!')
            $location.url('/party/' + data.party.party_url)
          }).error(function(data, status) {
            console.log('Error: ' + data)
            debugger
          })
      }
      // $http.get('/api/join_party/' + )
    }
}])

queuedControllers.controller('PartiesCtrl', ['$scope', '$http',
  function($scope, $http) {
}])







