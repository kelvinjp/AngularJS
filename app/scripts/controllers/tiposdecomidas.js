'use strict';

/**
 * @ngdoc function
 * @name angularv1App.controller:EditablerowCtrl
 * @description
 * # EditablerowCtrl
 * Controller of the angularv1App
 */
angular.module('angularv1App')
    .controller('tiposdecomidas', function ($scope, $filter, $http, TareasResourse ) {
       /*
       Esta clase fue copida de menu para sobre escribir las variables
       ya es casi lo mismo
        */

        $scope.tareas = TareasResourse.obtenerTiposdemedidas.todas();;


//ordenar
        $scope.editar = false;


        $scope.saveUser = function(data, value) {
            //$scope.user not updated yet
            if(value==-1){
                TareasResourse.agregartipodecomida.tdc({
                    text:data.text
                });
            }else{
                TareasResourse.actualizartipodecomida.tdc({
                    value:value,
                    text:data.text
                });

            }

            $scope.tareas = TareasResourse.obtenerTiposdemedidas.todas();
            $scope.tareas = TareasResourse.obtenerTiposdemedidas.todas();
        };
        $scope.removeUser = function(value) {
            TareasResourse.eliminartipodecomida.tdc({
              value:value
            });

            $scope.tareas = TareasResourse.obtenerTiposdemedidas.todas();
        };

        $scope.agregarTarea = function(){
            TareasResourse.agregartipodecomida.tdc({
                text:$scope.txttext
            });
            $scope.tareas = TareasResourse.obtenerTiposdemedidas.todas();
            $scope.tareas = TareasResourse.obtenerTiposdemedidas.todas();
        };

        $scope.actualizarTarea = function(){
            TareasResourse.actualizartipodecomida.tdc({
              value:$scope.tareaActual.value,
              text:$scope.txttext});

            $scope.tareas = TareasResourse.obtenerTiposdemedidas.todas();
        };

        $scope.eliminar = function($value){
            TareasResourse.eliminartipodecomida.tarea({value:$value});

            $scope.tareas = TareasResourse.obtenerTiposdemedidas.todas();
        };

        $scope.editar = function(tarea){
            // $scope.editar = true;
            // $scope.tareaActual=tarea;
            $scope.txtvalue = tarea.value;
            $scope.txttext = tarea.text;
        };
        $scope.ordenarPor = function(orden) {
            $scope.ordenSeleccionado = orden;
        };
//-------------------------------------------------------------------

        $scope.addUser = function() {
            $scope.inserted = {
              value: -1,
              text: ''

            };
            $scope.tareas.push($scope.inserted);
        };


    });
