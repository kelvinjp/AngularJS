'use strict';

/**
 * @ngdoc overview
 * @name angularv1App
 * @description
 * # angularv1App
 *
 * Main module of the application.
 */
angular
  .module('angularv1App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'xeditable',
    'ui.bootstrap',
    'angular-md5',
    'angularUtils.directives.dirPagination',
    'pascalprecht.translate'
  ])

    .run(function(editableOptions, $rootScope, $location, $cookieStore){
        editableOptions.theme = 'bs3';

        $rootScope.$on('$routeChangeStart', function(event, next, current) {
           //Si esta desconectado y intenta entrar a menu lo enviamos a login
            if($cookieStore.get('estaConectado')== false || $cookieStore.get('estaConectado') == null) {
                if(next.templateUrl == 'views/menu.html' || next.templateUrl == 'views/peidodos.html'||next.templateUrl == 'views/horario.html'
                  ||next.templateUrl == 'views/tiposdecomida.html'){
                    $location.path('/login');
                }
            }
            else{
                var usuario = $cookieStore.get('user');
               //SI esta conectado y intenta entrar al login lo enviamos a menu
                if(next.templateUrl == 'views/login.html'){
                    $location.path('/menu')
                    }
            }
        });


  })

  .config(function ($routeProvider, $translateProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      }).when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/menu', {
            templateUrl: 'views/menu.html',
            controller: 'EditablerowCtrl'
        }).when('/cliente', {
            templateUrl: 'views/cliente.html',
            controller: 'clienteCtrl'
        })
        .when('/pedidocompleto', {
            templateUrl: 'views/pedidocompleto.html',
            controller: 'pedidocompletoCtrl'
        })
        .when('/seguirorden', {
            templateUrl: 'views/seguirorden.html',
            controller: 'SeguirordenCtrl'
        })
        .when('/pedidos', {
            templateUrl: 'views/peidodos.html',
            controller: 'PeidodosCtrl'
        })
        .when('/horario', {
            templateUrl: 'views/horario.html',
            controller: 'HorarioCtrl'
        })
        .when('/form', {
            templateUrl: 'views/ordenar.html',
            controller: 'EditableFormCtrl'
        })
      .when('/tiposdecomida', {
        templateUrl: 'views/tiposdecomida.html',
        controller: 'tiposdecomidas'
      })
      .otherwise({
        redirectTo: '/'
      });

    $translateProvider.translations('es', {'TITULO':'Restaurante Tipico',
      'INICIO':'Inicio',
      'MENU':'Menu',
      'TCOMIDA':'Tipos de comida',
      'PEDIDOS':'Pedidos',
      'HORARIO':'Horario',
      'LOGIN':'Entrar',
      'ORDENAR':'Ordenar',
      'SEGUIRORDEN':'Seguir Orden',
      'SALIR':'Salir',
      'EN':'Ingles',
      'ES':'Español'

    });
    $translateProvider.translations('en', {'TITULO':'Restaurante Tipico',
      'INICIO':'Home',
      'MENU':'Menu',
      'TCOMIDA':'Types of food',
      'PEDIDOS':'Orders',
      'HORARIO':'Schedule',
      'LOGIN':'Login',
      'ORDENAR':'Order',
      'SEGUIRORDEN':'Track Order',
      'SALIR':'Log out',
      'EN':'English',
      'ES':'Spanish'
    });
    $translateProvider.preferredLanguage('es');


  })
;

