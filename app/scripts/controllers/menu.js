'use strict';

/**
 * @ngdoc function
 * @name angularv1App.controller:EditablerowCtrl
 * @description
 * # EditablerowCtrl
 * Controller of the angularv1App
 */
angular.module('angularv1App')
    .controller('EditablerowCtrl', function ($scope, $filter, $http, TareasResourse ) {
        $scope.tareas = TareasResourse.obtenerTareas.todas();


//ordenar
        $scope.editar = false;

        $scope.statuses = TareasResourse.obtenerTiposdemedidas.todas();


        $scope.showStatus = function(tarea) {
            var selected = [];
            if(tarea.tipo) {
                selected = $filter('filter')($scope.statuses, {value: tarea.tipo});
            }
            return selected.length ? selected[0].text : 'Not set';
        };

      $scope.formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
       minimumFractionDigits: 2
      });

        $scope.saveUser = function(data, id) {
            //$scope.user not updated yet
            if(id==-1){
                TareasResourse.agregar.nuevaTarea({
                    nombre:data.nombre,
                    descripcion:data.descripcion,
                    precio:data.precio,
                    tipo:data.tipo
                });
            }else{
                TareasResourse.actualizar.tarea({
                    id:id,
                    nombre:data.nombre,
                    descripcion:data.descripcion,
                    precio:data.precio,
                    tipo:data.tipo});

            }

            $scope.tareas = TareasResourse.obtenerTareas.todas();
            $scope.tareas = TareasResourse.obtenerTareas.todas();
        };
        $scope.removeUser = function(index) {
            TareasResourse.eliminar.tarea({
                id:index
            });

            $scope.tareas = TareasResourse.obtenerTareas.todas();
        };


        $scope.agregarTarea = function(){
            TareasResourse.agregar.nuevaTarea({
                nombre:$scope.txtnombre,
                descripcion:$scope.txtdescripcion,
                precio:$scope.txtprecio,
                tipo:$scope.txttipo
            });
            $scope.tareas = TareasResourse.obtenerTareas.todas();
            $scope.tareas = TareasResourse.obtenerTareas.todas();
        };

        $scope.actualizarTarea = function(){
            TareasResourse.actualizar.tarea({
                id:$scope.tareaActual.id,
                nombre:$scope.txtnombre,
                descripcion:$scope.txtdescripcion,
                precio:$scope.txtprecio,
                tipo:$scope.txttipo});

            $scope.tareas = TareasResourse.obtenerTareas.todas();
        };

        $scope.eliminar = function($id){
            TareasResourse.eliminar.tarea({id:$id});

            $scope.tareas = TareasResourse.obtenerTareas.todas();
        };

        $scope.editar = function(tarea){
            // $scope.editar = true;
            // $scope.tareaActual=tarea;
            $scope.txtnombre = tarea.nombre;
            $scope.txtdescripcion = tarea.descripcion;
            $scope.txtprecio = tarea.precio;
            $scope.txttipo = tarea.tipo;
        };
        $scope.ordenarPor = function(orden) {
            $scope.ordenSeleccionado = orden;
        };
//-------------------------------------------------------------------

        $scope.addUser = function() {
            $scope.inserted = {
                id: -1,
                nombre: '',
                descripcion: '',
                precio: null,
                tipo: null
            };
            $scope.tareas.push($scope.inserted);
        };


    });
