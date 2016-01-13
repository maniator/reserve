var reserveApp = angular.module('reserveApp', []);
var defaultHeader = 'Book a Reservation';

reserveApp.controller('ReservationCtrl', ['$scope', '$interval', '$timeout',
  function ($scope, $interval, $timeout) {
  var timerInterval;
  var startTimer = function () {
    $scope.timer = {
      minutes: 5,
      seconds: 0,
    };
    $scope.reservation = {};

    timerInterval = $interval(function () {
      if ($scope.timer.seconds === 0) {
        if ($scope.timer.minutes >= 1) {
          $scope.timer.seconds = 59;
          $scope.timer.minutes--;
        } else {
          alert('Time up!');
          $interval.cancel(timerInterval);
          startTimer();
        }
      } else {
        $scope.timer.seconds--;
      }
    }, 1000);
  };
  $scope.header = defaultHeader;
  $scope.timer = {};
  $scope.reservation = {};
  $scope.formSubmitted = false;
  $scope.showResults = false;

  $scope.submit = function () {
    $interval.cancel(timerInterval);
    console.log($scope.reserveForm);
    $scope.formSubmitted = true;

    $timeout(function () {
      $scope.showResults = true;
      $scope.header = 'Your Reservation';
    }, 3000);
  };

  startTimer();
}]);