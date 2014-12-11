'use strict';

/**
 * @ngdoc service
 * @name angularv1App.crud
 * @description
 * # crud
 * Service in the angularv1App.
 */
angular.module('angularv1App')
  .factory('TareasResourse', function ($resource) {
    var factory = {
      obtenerTareas: $resource('http://104.131.121.228:8080/API4-0.1.0/menu',{},{
        todas: {method: 'GET', isArray: true}
      }),
      obtenerTiposdemedidas: $resource('http://104.131.121.228:8080/API4-0.1.0/tiposdecomida',{},{
        todas: {method: 'GET', isArray: true}
      }),
      agregar: $resource('http://104.131.121.228:8080/API4-0.1.0/agregarItem',{},{
        nuevaTarea: {method: 'GET', params:{
          nombre:'@nombre',
          descripcion:'@descripcion',
          precio:'@precio',
          tipo:'@tipo'}

        }
      }),
      agregartipodecomida: $resource('http://104.131.121.228:8080/API4-0.1.0/agregartiposdecomida',{},{
        tdc: {method: 'GET', params:{
          text:'@text'}
        }
      }),
      actualizar: $resource('http://104.131.121.228:8080/API4-0.1.0/editarItem',{},{
        tarea: {method: 'GET', params:{id:'@id', nombre:'@nombre', descripcion:'@descripcion', precio:'@precio', tipo:'@tipo'}
        }
      }),
      actualizartipodecomida: $resource('http://104.131.121.228:8080/API4-0.1.0/editartiposdecomida',{},{
        tdc: {method: 'GET', params:{
          value:'@value',
          text:'@text'}
        }
      }),
      eliminar: $resource('http://104.131.121.228:8080/API4-0.1.0/eliminarItem',{},{
        tarea: {method: 'GET', params:{
          id:'@id'}}

      }),
      eliminartipodecomida: $resource('http://104.131.121.228:8080/API4-0.1.0/eliminartiposdecomida',{},{
        tdc: {method: 'GET', params:{
          value:'@value'}}

      }),
      iniciar: $resource('http://104.131.121.228:8080/API4-0.1.0/login',{},{
        sesion: {method: 'GET', params:{
          username:'@username',
          password:'@password'}
        }

      }),
      getCliente: $resource('http://104.131.121.228:8080/API4-0.1.0/getCliente',{},{
        bycorreo: {method: 'GET', params:{
          correo:'@correo'
        }, isArray: false
        }
      }),
      addCliente: $resource('http://104.131.121.228:8080/API4-0.1.0/addCliente',{},{
        nuevoCliente: {method: 'GET', params:{
          nombre:'@nombre',
          apellido:'@apellido',
          correo:'@correo',
          direccion:'@direccion',
          telefono:'@telefono'}

        }
      }),

      obtenerPedidos: $resource('http://104.131.121.228:8080/API4-0.1.0/pedidos',{},{
        todos: {method: 'GET', isArray: true}
      }),
      obtenerHorario: $resource('http://104.131.121.228:8080/API4-0.1.0/horario',{},{
        actual: {method: 'GET', isArray: false}
      }),

      disponible: $resource('http://104.131.121.228:8080/API4-0.1.0/horarioDisponible',{},{
        ahora: {method: 'GET', isArray: false}
      }),


      addPedido: $resource('http://104.131.121.228:8080/API4-0.1.0/rest/emp/create',{},{
        nuevoPedido: {method: 'POST', params:{
          orden:'@orden'

        }
        }
      })




    };
    return factory;

  });


