'use strict';

/**
 * @ngdoc function
 * @name angularv1App.controller:ControllerCtrl
 * @description
 * # ControllerCtrl
 * Controller of the angularv1App
 */
angular.module('angularv1App')
    .controller('EditableFormCtrl', function ($scope, $filter, $http, TareasResourse,$cookieStore, $location,$q ) {
        var inicioSesion = $q.defer();
        $scope.isTime;
        $scope.hserver;
        $scope.mserver;
        $scope.hapertura;
        $scope.mapertura;
        $scope.hcierre;
        $scope.mcierre;
        $scope.ifvar=0;




        inicioSesion.promise.then(usrASesion);
        //le propagamos estos valores al controlador padre para poder ocultar elmentos del menu ya que el menu tiene otro controlador
        function usrASesion(usr){

            $scope.isTime=  usr.disponible;
            $scope.hserver= usr.hora;
            $scope.mserver = usr.min;
            $scope.hapertura = usr.ha;
            $scope.mapertura =  usr.ma;
            $scope.hcierre = usr.hc;
            $scope.mcierre = usr.mc;

        };

        $scope.init = function(){
          $scope.tareas = TareasResourse.obtenerTareas.todas();
          $scope.statuses = TareasResourse.obtenerTiposdemedidas.todas();
            var usr =   TareasResourse.disponible.ahora()
                .$promise.then(function(usr){
                    inicioSesion.resolve(usr);
                });

        };




        $scope.pedidos=[];

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
        // Create our number formatter.


    $scope.showStatus = function(tarea) {
      var selected = [];
      if(tarea.tipo) {
        selected = $filter('filter')($scope.statuses, {value: tarea.tipo});
      }
      return selected.length ? selected[0].text : 'Not set';
    };
    $scope.changeifvar = function(tarea) {
      $scope.ifvar= tarea.tipo;
    };




    $scope.menuOrdenado = function(){
      $scope.categoria = 0;
      $scope.recorrer = [];
      for(var cmd in $scope.tareas){
          $scope.recorrer.push($scope.tareas[cmd]);
      }
    };

        /*
        agregamos una comida
         */
        $scope.addComida =function(tarea){

           var sumado =0;
            for(var x in $scope.pedidos){
                if($scope.pedidos[x].idcomida == tarea.id){
                    $scope.pedidos[x].cantidad = $scope.pedidos[x].cantidad +1;
                    sumado =1;
                }
            } if(sumado == 0) {
               $scope.pedidos.push({idcomida:tarea.id, cantidad:1, nombre:tarea.nombre, precio:tarea.precio});
           }

            $scope.calcular();
       };
        /*
         eliminamos una comida
         */
        $scope.deleteComida =function(orden){


            for(var x in $scope.pedidos){
                if($scope.pedidos[x].idcomida == orden.idcomida){
                    $scope.pedidos[x].cantidad = $scope.pedidos[x].cantidad -1;

                    if(  $scope.pedidos[x].cantidad<1) {
                        var index = $scope.pedidos.indexOf($scope.pedidos[x]);
                        if (index > -1) {
                            $scope.pedidos.splice(index, 1);
                        }
                    }

                }
            }
            $scope.calcular();
        };


        /*
        Calcula el sub total, itbis, y total
         */
        $scope.calcular = function(){

            if( $scope.pedidos.length>0){
                $scope.subTotal=0.00;
                $scope.itbis=0.00;
                $scope.total=0.00;
                var temp;
                for(var x in $scope.pedidos){
                    var temp = $scope.pedidos[x].cantidad * $scope.pedidos[x].precio;
                    $scope.subTotal = $scope.subTotal + temp;
                }
                $scope.itbis = $scope.subTotal * 0.18;
                $scope.total = $scope.subTotal + $scope.itbis;

            }else{
                $scope.subTotal=0.00;
                $scope.itbis=0.00;
                $scope.total=0.00;
            }
            $scope.fsubTotal=formatter.format($scope.subTotal);
            $scope.fitbis=formatter.format($scope.itbis);
            $scope.ftotal=formatter.format($scope.total);

        }

        /*
        -Guarda en session la seleccion del usuario
        -reenvia a una pagina para seguir el proceso
         */
        $scope.ordenar = function(){
            $cookieStore.put('orden',$scope.pedidos);

            $location.path('/cliente');
        }







        $scope.checkName = function(data, id) {
            if (id === 2 && data !== 'awesome') {
                return 'Username 2 should be `awesome`';
            }
        };

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
