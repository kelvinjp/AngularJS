'use strict';

/**
 * @ngdoc function
 * @name angularv1App.controller:PedidocompletoCtrl
 * @description
 * # PedidocompletoCtrl
 * Controller of the angularv1App
 */
angular.module('angularv1App')
  .controller('pedidocompletoCtrl', function ($scope, $cookieStore, $location) {
        $scope.idorden = $cookieStore.get('idOrden');
        $scope.pedidoCompleto = false;

        if ($scope.idorden === parseInt($scope.idorden)){
            $scope.pedidoCompleto = true;}

        else{
        }

        $scope.seguirOrden = function(){
            $location.path('/seguirorden');
        }



  });
