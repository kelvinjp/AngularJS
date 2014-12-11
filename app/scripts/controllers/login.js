'use strict';

/**
 * @ngdoc function
 * @name angularv1App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularv1App
 */
angular.module('angularv1App')
  .controller('LoginCtrl', function ($scope, $q, TareasResourse, $log, $cookieStore, $location, md5) {
        var inicioSesion = $q.defer();
        $scope.errormsj =false;

        inicioSesion.promise.then(usrASesion);
        //le propagamos estos valores al controlador padre para poder ocultar elmentos del menu ya que el menu tiene otro controlador
        function usrASesion(usr){
            if(usr.nombre != 'wrong'){
                $scope.usrConectado.nombre = usr.nombre;
                $scope.usrConectado.user = usr.user;
                $scope.usrConectado.estaConectado = true;

                $log.info($scope.usrConectado);

                $cookieStore.put('estaConectado',true);
                $cookieStore.put('user',usr);

                $location.path('/menu');
            }else{
                $scope.errormsj= true;
            }


        };

        $scope.iniciarSesion = function(){
           //Enciptamos el passowrd
            var crypt = md5.createHash($scope.usuario.txtpass);

         var usr =   TareasResourse.iniciar.sesion({username:$scope.usuario.txtuser, password:crypt})
                .$promise.then(function(usr){
                inicioSesion.resolve(usr);
                    });

        };
  });

