'use strict';

/**
 * @ngdoc function
 * @name angularv1App.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the angularv1App
 */
angular.module('angularv1App')
  .controller('NavCtrl', function ($scope, $cookieStore, $location, $translate) {

        var usuario = $cookieStore.get('user');
        $scope.estaConectado=$cookieStore.get('estaConectado');

        if(typeof usuario === 'undefined'){
            $scope.usrConectado = {nombre:"", user:'', estaConectado:false};

        }else{
            $scope.usrConectado = {nombre:usuario.nombre, user:usuario.user, estaConectado:true};
        }


        $scope.salir = function(){
            $scope.usrConectado = {nombre:"", user:'', estaConectado:false};
            $cookieStore.remove('estaConectado');
            $cookieStore.remove('user');

            $location.path('/login');
        };
    $scope.cambiarIdioma = function(idioma){
      $translate.use(idioma);
      
    }

  });
