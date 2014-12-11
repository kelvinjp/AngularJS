'use strict';

/**
 * @ngdoc function
 * @name angularv1App.controller:SeguirordenCtrl
 * @description
 * # SeguirordenCtrl
 * Controller of the angularv1App
 */
angular.module('angularv1App')
  .controller('SeguirordenCtrl', function ($scope,$http,$filter) {


        $scope.txtidseguimiento;
        $scope.estadopedido;
        $scope.cliente;
        $scope.max = 4;
        $scope.verBarra = false;
        $scope.pedido;
    $scope.encontrado ='';



  $scope.seguirOrden = function(){

            $http.post("http://104.131.121.228:8080/API4-0.1.0/verOrden/", $scope.txtidseguimiento).success(function(data){
                //Callback function here.
                //"data" is the response from the server.
                $scope.estadopedido = data.estado;
                $scope.cliente = data.nombre;

              if(data.idpedido !=-1){
                $scope.verBarra = true;

                $scope.encontrado ='';
              }else{

                $scope.encontrado ='Pedido no encontrado';
              }
                $scope.pedido = data;
              //$scope.estadopedido = $scope.pedido.estado;

            });
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });

    $scope.formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
      $scope.editar = false;

      $scope.estadoOrden = [
          {value: 1, text: 'Orden Recibida'},
          {value: 2, text: 'Procesando Orden'},
          {value: 3, text: 'Orden Enviada'},
          {value: 4, text: 'Orden Entregada'}
      ];


      $scope.showStatus = function() {
          var selected = [];
          if($scope.estadopedido) {
              selected = $filter('filter')($scope.estadoOrden, {value: $scope.estadopedido});

          }
          return selected.length ? selected[0].text : 'Not set';
      };

    $scope.verPedido = function(pedido) {
      $scope.selectedOrden = pedido;
      $scope.subTotal=0.00;
      $scope.itbis=0.00;
      $scope.total=0.00;


      var temp;
      for(var x in pedido){
        var temp = pedido[x].cantidad * pedido[x].precio;

        $scope.subTotal = $scope.subTotal + temp;
      }

      $scope.itbis = $scope.subTotal * 0.18;
      $scope.total = $scope.subTotal + $scope.itbis;

      $scope.fsubTotal=formatter.format($scope.subTotal);
      $scope.fitbis=formatter.format($scope.itbis);
      $scope.ftotal=formatter.format($scope.total);




    };



  }











    });
