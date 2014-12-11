'use strict';

/**
 * @ngdoc function
 * @name angularv1App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularv1App
 */
angular.module('angularv1App')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
