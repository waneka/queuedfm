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
  console.log('home!')
}])

queuedControllers.controller('PartyCreateCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    // need to send the user_id with the post
    // parties will have a host_id - based off of the user_id of the 'host'
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
  // this will also check to make sure the host_id of the party matches the user_id
  //    -if so, the user will have access to the player controls
}])

queuedControllers.controller('PartyJoinCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    // ** This ctrl can also be used by a host to enter an old party **
    // TODO: send over the user_id, if one is present
    // only the user with a user_id that matches the party's host_id will be able to play music
    $scope.submit = function() {
      if ($scope.name) {
        $http.get('/api/join_party/' + $scope.name).
          success(function(data) {
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







