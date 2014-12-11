'use strict';

/**
 * @ngdoc function
 * @name angularv1App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularv1App
 */
angular.module('angularv1App')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
