'use strict'

var queuedControllers = angular.module('queuedControllers', [])

queuedControllers.controller('WelcomeCtrl', ['$scope', '$http', function($scope, $http) {
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
      if ($scope.party_name) {
        $http.post('/api/new_party/' + $scope.party_name).
          success(function(data) {
            console.log('success!!!')
            console.log('data: ' + data.party_url)
            $location.url('/party/' + data.party_url)
          })
        }
    }
    // some logic to create a new party page at the url: 'party/:url'
    // post it to the database
}])

queuedControllers.controller('PartyCtrl', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {
    $http.get('/api/party/' + $routeParams.url).
      success(function(data) {
        $scope.party = data.party
        // console.log('party: ' + data.party.name)
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
    }
}])

queuedControllers.controller('SocketCtrl', ['$scope', '$http',
  function($scope, $http) {
    socket.on('news', function (data) {
      console.log('socket data: ' + data.hello);
      socket.emit('my other event', { my: 'data' });
    });
}])

queuedControllers.controller('RdioCtrl', ['$scope', '$http',
  function($scope, $http) {
    // this is a valid playback token for localhost.
    // but you should go get your own for your own domain.
    // $('#api').rdio('GAlNi78J_____zlyYWs5ZG02N2pkaHlhcWsyOWJtYjkyN2xvY2FsaG9zdEbwl7EHvbylWSWFWYMZwfc=');
}])

queuedControllers.controller('PlayerCtrl', ['$scope', '$http',
  function($scope, $http) {

    $scope.play = function() {
      R.ready(function() {
        R.player.play({source: "t1249326"});
      });
    }

    // player logic here?
    // var key = 't1249326'
    // $('#api').bind('ready.rdio', function() {
    //   $(this).rdio().play(key);
    // });
    // $('#api').bind('playingTrackChanged.rdio', function(e, playingTrack, sourcePosition) {
    //   if (playingTrack) {
    //     duration = playingTrack.duration;
    //     $('#art').attr('src', playingTrack.icon);
    //     $('#track').text(playingTrack.name);
    //     $('#album').text(playingTrack.album);
    //     $('#artist').text(playingTrack.artist);
    //   }
    //   });
    // $('#api').bind('positionChanged.rdio', function(e, position) {
    //   $('#position').css('width', Math.floor(100*position/duration)+'%');
    // });
    // $('#api').bind('playStateChanged.rdio', function(e, playState) {
    //   if (playState == 0) { // paused
    //     $('#play').show();
    //     $('#pause').hide();
    //   } else {
    //     $('#play').hide();
    //     $('#pause').show();
    //   }
    // });
    // $('#previous').click(function() { $('#api').rdio().previous(); });
    // $('#play').click(function() { $('#api').rdio().play(); });
    // $('#pause').click(function() { $('#api').rdio().pause(); });
    // $('#next').click(function() { $('#api').rdio().next(); });
}])

queuedControllers.controller('SearchCtrl', ['$scope', '$http',
  function($scope, $http) {
    // the search should:
    // - make a call to rdio based on text input
    // - display results in a list
    //   - each song should have a link to add to queue
    //     - addToQueue should create new song object and add to DB
    //     - socket emit 'add song' with song info

    $scope.search = function() {
      var query = 'notorious'
      var self = this;
      R.request({
        method: "search",
        content: {
          query: query,
          types: "Album"
        },
        success: function(response) {
          debugger
          // self.showResults(response.result.results);
        },
        error: function(response) {
          // $(".error"1).text(response.message);
        }
      });
    },



    socket.emit('save song', { song: {
      name: "My Name Is Jonas"
      , album: "Weezer"
      , artist: "The Green Album"
      , key: "t2714517"
      , img_url: "http://rdio-d.cdn3.rdio.com/album/f/7/c/0000000000036c7f/square-200.jpg"
      , duration: 204
      , vote_count: 0
    }} )
}])

queuedControllers.controller('QueueCtrl', ['$scope', '$http',
  function($scope, $http) {
    // the queue should:
    // - accept songs from DB via sockets
    //   - socket on 'song added to DB'
    // - display queue in a list
    //   - each song in queue should have a button to vote
    //   - votes should be validated based on user -- one vote per user
    //     - sort the songs based on vote count
    //       - sort method that is called via sockets
    // - give the top song in queue to the player upon request
    socket.on('add song to queue', function(data) {
      console.log('gonna add this song to the queue now: ' + data.song.name)
      $http.get('/api/songs').
        success(function(data) {
          $scope.songs = data.songs
          $scope.orderProp = 'vote_count'
        })
    })
    $scope.upVote = function() {
      socket.emit('up vote', { songId: this.song._id })
    }
    socket.on('sort queue', function(data) {
      console.log('got it, sorting the queue now.')
      // ng two way data binding?
      $scope.songs = data
      $scope.orderProp = 'vote_count'
      $scope.$apply()
    })
}])







