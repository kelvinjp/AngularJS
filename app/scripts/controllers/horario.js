'use strict';

/**
 * @ngdoc function
 * @name angularv1App.controller:HorarioCtrl
 * @description
 * # HorarioCtrl
 * Controller of the angularv1App
 */
angular.module('angularv1App')
  .controller('HorarioCtrl', function ($scope,TareasResourse ,$q,$filter,$http) {
        var inicioSesion = $q.defer();
        $scope.mytime = new Date();
        $scope.mytime2 = new Date();

        var hora;
        var min;
        var hora2;
        var min2;


        inicioSesion.promise.then(usrASesion);
        //le propagamos estos valores al controlador padre para poder ocultar elmentos del menu ya que el menu tiene otro controlador
        function usrASesion(usr){


             hora = usr.horaApertura;
            min= usr.minutoApertura;
            hora2 = usr.horacierre;
            min2 = usr.minutocierre;

            var d = new Date();
            d.setHours( hora);
            d.setMinutes( min );
            $scope.mytime = d;

            var d2 = new Date();
            d2.setHours( hora2);
            d2.setMinutes( min2 );
            $scope.mytime2 = d2;


        };

        $scope.init  = function(){
            var usr =   TareasResourse.obtenerHorario.actual()
                .$promise.then(function(usr){
                    inicioSesion.resolve(usr);
                });

        };

        $scope.filtrar = function() {


            var h;
            var m;
            var h2;
            var m2;
            //$scope.mytime.

               h= $filter('date')($scope.mytime, 'HH');
            m= $filter('date')($scope.mytime, 'mm');
            h2= $filter('date')($scope.mytime2, 'HH');
            m2= $filter('date')($scope.mytime, 'mm');
        };




        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.hstep2 = 1;
        $scope.mstep2 = 15;

        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };

        $scope.ismeridian = true;

        $scope.toggleMode = function() {
            $scope.ismeridian = ! $scope.ismeridian;
        };

        $scope.update = function() {
            var h;
            var m;
            var h2;
            var m2;
            //$scope.mytime.

            h= $filter('date')($scope.mytime, 'HH');
            m= $filter('date')($scope.mytime, 'mm');
            h2= $filter('date')($scope.mytime2, 'HH');
            m2= $filter('date')($scope.mytime2, 'mm');



            var hr ={
                "horaApertura": h,
                "horacierre": h2,
                "minutoApertura":m,
                "minutocierre": m2
            };

            $http.post("http://104.131.121.228:8080/API4-0.1.0/actulizarHorario", hr).success(function(data){
                //Callback function here.
                //"data" is the response from the server.

            });


        };

        $scope.changed = function () {
            console.log('Time changed to: ' + $scope.mytime);
        };

        $scope.clear = function() {
            $scope.mytime = null;
        };


  });
