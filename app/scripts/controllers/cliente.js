'use strict';

/**
 * @ngdoc function
 * @name angularv1App.controller:ClienteCtrl
 * @description
 * # ClienteCtrl
 * Controller of the angularv1App
 */

angular.module('angularv1App')
  .controller('clienteCtrl', function($scope,$q, $filter, $http, $cookieStore, $location, TareasResourse) {

        $scope.clienteNombre ;
        $scope.clienteApellido;
        $scope.clienteDireccion;
        $scope.clienteEmail ;
        $scope.clienteTelfono;
        var inicioSesion = $q.defer();

        inicioSesion.promise.then(usrASesion);

        function usrASesion(usr){
           if(usr.correo==$scope.clienteEmail){
               $scope.clienteNombre = usr.nombre;
               $scope.clienteApellido = usr.apellido;
               $scope.clienteDireccion = usr.direccion;
               $scope.clienteTelfono = parseInt(usr.telefono);
           }else{
               $scope.errormsj = true;
           }
            $scope.hideButton =true;
        };

        $scope.errormsj =  false;
        $scope.hideButton = false;

        $scope.buscarEmail = function(){

            var usr =   TareasResourse.getCliente.bycorreo({correo:$scope.clienteEmail})
                .$promise.then(function(usr){
                    inicioSesion.resolve(usr);
                });
}
        $scope.altaCliente = function(){



            var orden = $cookieStore.get('orden');
            var pedido ={idpedido:-1, correo:$scope.clienteEmail, estado:1,orden:orden};


            /*
            Si no encontramos el cliente lo creamos
             */
            if($scope.errormsj==true){
                TareasResourse.addCliente.nuevoCliente({
                    nombre:$scope.clienteNombre,
                    apellido:$scope.clienteApellido,
                    correo:$scope.clienteEmail,
                    direccion:$scope.clienteDireccion,
                    telefono:$scope.clienteTelfono
                });

            }

           $http.post("http://104.131.121.228:8080/API4-0.1.0/rest/emp/create", pedido).success(function(data){
                //Callback function here.
                //"data" is the response from the server.


               $cookieStore.put('idOrden',data.idpedido);

              $location.path('/pedidocompleto');
            });
           /*
            if($scope.clienteEmail !=''){
            var orden2 = $cookieStore.get('orden');

            TareasResourse.addPedido.nuevoPedido({
            orden:orden2[0]//,
            // correo:$scope.clienteEmail
            });

            }else{
            alert("No hay cliente seleccionado");
            }
            */

        }




    });
