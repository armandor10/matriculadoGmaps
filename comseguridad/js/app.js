var uri = 'http://localhost:23299/api';
var app = angular.module("myApp", ['ngRoute','ngResource','uiGmapgoogle-maps']);

app.config(function($routeProvider) {
  $routeProvider
   .when('/', {
    controller: 'MapsController',
    templateUrl: 'views/maps.html'
  })
  .when('/encuesta', {
    controller: 'EncuestaController',
    templateUrl: 'views/encuesta.html'
  })
  .when('/encuestador', {
    controller: 'EncuestadorController',
    templateUrl: 'views/encuestador.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});

app.config(function(uiGmapGoogleMapApiProvider) {
 uiGmapGoogleMapApiProvider.configure({
  key: 'AIzaSyDe9J6-DNDqHvB9zU_icstOH0TtGA4vLcw',
  v: '3.21.10',
  libraries: 'weather,geometry,visualization'
 });
});