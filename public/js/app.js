var app = angular.module('beerList', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);
  $stateProvider
    .state('home', {
      url: '/home',
      controller: 'mainController',
      templateUrl: '/templates/home.html'
    })
    .state('beer', {
      url: '/beer/:id',
      controller: 'beerController',
      templateUrl: '/templates/beer.html',
      params: {
        beerParam: null
      }
    })
    .state('authorization', {
      url: '/authorization?token&name',
      controller: function($stateParams,$state,$rootScope){
        $rootScope.currentUser = $stateParams.name;
        $state.go('home');
      }
    })
  $urlRouterProvider.otherwise('/home');
});
