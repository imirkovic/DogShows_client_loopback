'use strict';

angular.module('confusionApp')
    .constant("baseURL", "http://localhost:3000/")


    .service('loginFactory', ['$resource', 'baseURL', function($resource,baseURL) {
        this.getLogin = function(){
            return $resource(baseURL+"competitions/:id",null,  {'update':{method:'PUT' }});
        };
    }])

    .service('competitionFactory', ['$resource', 'baseURL', function($resource,baseURL) {
        this.getCompetitions = function(){
            return $resource(baseURL+"competitions/:id",null,  {'update':{method:'PUT' }});
        };

        this.getPromotions = function(){
            return $resource(baseURL+"promotions/:id",null,  {'update':{method:'PUT' }});
        };
    }])


    .service('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
        this.getFeedback = function(){
            return $resource(baseURL+"feedback/:id",null,  {'update':{method:'PUT' }});
        };

    }])

    .service('accountFactory', ['$resource', 'baseURL', function($resource,baseURL) {
        this.getAccounts = function(){
            return $resource(baseURL+"accounts/:id",null,  {'update':{method:'PUT' }});
        };

    }])

    .service('leaderFactory', ['$resource', 'baseURL', function($resource,baseURL) {
        this.getLeaders = function(){
            return $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
        };

    }])

    .service('judgeFactory', ['$resource', 'baseURL', function($resource,baseURL) {
        this.getJudges = function(){
            return $resource(baseURL+"judge/:id",null,  {'update':{method:'PUT' }});
        };

    }])


    .service('whiskerFactory', ['$resource', 'baseURL', function($resource,baseURL) {
        this.getwhiskers = function(){
            return $resource(baseURL+"whisker/:id",null,  {'update':{method:'PUT' }});
        };

    }])

    .service('administrationFactory', ['$resource', 'baseURL', function($resource,baseURL) {
        this.getAdministration = function(){
            return $resource(baseURL+"administration/:id",null,  {'update':{method:'PUT' }});
        };
        this.getSize = function(){
            return $resource(baseURL+"size/:id",null,  {'update':{method:'PUT' }});
        };
        this.getBreed = function(){
            return $resource(baseURL+"breed/:id",null,  {'update':{method:'PUT' }});
        };
        this.getWhisker = function(){
            return $resource(baseURL+"whisker/:id",null,  {'update':{method:'PUT' }});
        };
        this.getSex = function(){
            return $resource(baseURL+"sex/:id",null,  {'update':{method:'PUT' }});
        };
        this.getClass = function(){
            return $resource(baseURL+"class/:id",null,  {'update':{method:'PUT' }});
        };
        this.getCompetitions = function(){
            return $resource(baseURL+"competitions/:id",null,  {'update':{method:'PUT' }});
        };
    }])


    .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {

        var corpfac = {};

        corpfac.getLeaders = function(){
            return $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
        };

        return  corpfac; // [x] Remember this is a factory not a service


    }])

;
