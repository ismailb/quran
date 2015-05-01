angular.module('starter.controllers', ['starter.services', 'starter.utils'])

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

  .controller('SurahCtrl', function($scope, $stateParams, QuranService, LocalStorage) {
    console.log('SurahCtrl');
    console.log($stateParams.surahId);    
    var surah = QuranService.getSurah($stateParams.surahId);
    surah.then(function(response){
      $scope.surah = response;

    });
    $scope.onSwipeRight = function(item){
      console.log('right');
      item.className = "item item-energized";
      LocalStorage.set(item.ar, null);
    };
    $scope.onSwipeLeft = function(item){
      console.log('left');
      item.className = "item item-balanced";
      LocalStorage.set(item.ar, item.en);
    };
  });