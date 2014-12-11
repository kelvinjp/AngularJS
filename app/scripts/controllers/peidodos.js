'use strict';

/**
 * @ngdoc function
 * @name angularv1App.controller:PeidodosCtrl
 * @description
 * # PeidodosCtrl
 * Controller of the angularv1App
 */
angular.module('angularv1App')
  .controller('PeidodosCtrl', function ($scope, TareasResourse, $filter, $http) {


        $scope.pedidos = TareasResourse.obtenerPedidos.todos();
        $scope.subTotal=0.00;
        $scope.itbis=0.00;
        $scope.total=0.00;



        /*
         Para dar formato de dinero
         */
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
        $scope.fsubTotal=formatter.format($scope.subTotal);
        $scope.fitbis=formatter.format($scope.itbis);
        $scope.ftotal=formatter.format($scope.total);



        $scope.editar = false;

        $scope.estadoOrden = [
            {value: 1, text: 'Orden Recibida'},
            {value: 2, text: 'Procesando Orden'},
            {value: 3, text: 'Orden Enviada'},
            {value: 4, text: 'Orden Entregada'}
        ];


        $scope.showStatus = function(pedido) {
            var selected = [];
            if(pedido.estado) {
                selected = $filter('filter')($scope.estadoOrden, {value: pedido.estado});
            }
            return selected.length ? selected[0].text : 'Not set';
        };



        $scope.saveUser = function(data, pedido) {
            //$scope.user not updated yet

            pedido.estado = data.estado;


            $http.post("http://104.131.121.228:8080/API4-0.1.0/actulizarOrden", pedido).success(function(data){
                //Callback function here.
                //"data" is the response from the server.
                $scope.pedidos = data;
            });

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
        $scope.total = function(pedido){
            return pedido.cantidad * pedido.precio;
        }

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
//-------------------------------------------------------------------------------
    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.meals = [];



    $scope.meals =  $scope.pedidos;

    $scope.pageChangeHandler = function(num) {
      console.log('meals page changed to ' + num);
    };



    }

);
