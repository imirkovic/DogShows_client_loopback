'use strict';

//BEZ resource  angular.module('confusionApp', ['ui.router'])
angular.module('confusionApp', ['ui.router','ngResource', 'chart.js', 'lbServices'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

        // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })


             // Login
            .state('app.login', {
                url:'login',
                views: {
                    'header@': {
                        templateUrl : 'views/header_login.html',
                    },
                    'content@': {
                        templateUrl : 'views/login.html',
                        controller  : 'LoginController'
                    },
                    'footer@': {
                        templateUrl : 'views/header_login.html'
                    }
                }
            })

            // Competitions
            .state('app.competitions', {
                url:'competitions',
                views: {
                    'content@': {
                        templateUrl : 'views/competition/competitions-view.html',
                        controller  : 'CompetitionsController'
                    }
                }
            })

            // Competitions
            .state('app.competition', {
                url: 'competition/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/competition/competition-view.html',
                        controller  : 'CompetitionDetailController'
                    }
                }
            })

                //ACCOUNTS
            .state('app.accounts', {
                url:'accounts',
                views: {
                    'content@': {
                        templateUrl : 'views/account/accounts-view.html',
                        controller  : 'AccountController'
                    }
                }
            })

            .state('app.accountView', {
                url:'account/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/account/account-view.html',
                        controller  : 'AccountViewController'
                    }
                }
            })


            //LEADERS
            .state('app.leaders', {
                url:'leaders',
                views: {
                    'content@': {
                        templateUrl : 'views/leader/leaders-view.html',
                        controller  : 'LeaderController'
                    }
                }
            })
            // pregeld detalja
            .state('app.leaderView', {
                url:'leader/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/leader/leader-view.html',
                        controller  : 'LeaderViewController'
                    }
                }
            })





            //JUDGES
            .state('app.judges', {
                url:'judges',
                views: {
                    'content@': {
                        templateUrl : 'views/judge/judges-view.html',
                        controller  : 'JudgeController'
                    }
                }
            })




            // route for the menu page
            .state('app.menu', {
                url: 'menu',
                views: {
                    'content@': {
                        templateUrl : 'views/menu.html',
                        controller  : 'MenuController'
                    }
                }
            })

            // route for the dishdetail page
            .state('app.dishdetails', {
                url: 'menu/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/dishdetail.html',
                        controller  : 'DishDetailController'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    })
;
