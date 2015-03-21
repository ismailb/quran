angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.surahs = _.range(1, 115);

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
  })
  .controller('SurahCtrl', function($scope, $stateParams, QuranService) {
    console.log('SurahCtrl');
    var q = QuranService.get({
      surahId: $stateParams.surahId
    });
    q.$promise.then(function(response) {
      var surahObj = response.quran['quran-wordbyword'];
      var surah = [];
      $.each(surahObj, function(key, value) {
        var fullVerse = value.verse;
        var words = [];
        var ayah = {};
        $.each(fullVerse.split('$'), function(idx, verse) {
          if (verse) {
            var word = {};
            var wordByLang = verse.split('|');
            word["ar"] = wordByLang[0];
            word["en"] = wordByLang[1];
            words.push(word);
          }
        });
        ayah.number = key;
        ayah.words = words;
        surah.push(ayah); //[value.ayah] 
      });
      console.log(surah);
      $scope.surah = surah;
    });
  })
  .controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [{
      title: 'Reggae',
      id: 1
    }, {
      title: 'Chill',
      id: 2
    }, {
      title: 'Dubstep',
      id: 3
    }, {
      title: 'Indie',
      id: 4
    }, {
      title: 'Rap',
      id: 5
    }, {
      title: 'Cowbell',
      id: 6
    }];
  })

.controller('PlaylistCtrl', function($scope, $stateParams) {});