'use strict';

/**
 * @ngdoc function
 * @name angularv1App.controller:PeidodosCtrl
 * @description
 * # PeidodosCtrl
 * Controller of the angularv1App
 */
angular.module('angularv1App')
  .controller('OtherController', function ($scope) {


    $scope.pageChangeHandler = function(num) {
      console.log('going to page ' + num);
    };

    }

);
