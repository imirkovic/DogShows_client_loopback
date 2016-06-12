'use strict';

angular.module('confusionApp')

    .controller('LoginController', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
    }])
    
   .controller('IndexController', ['$scope', '$state', '$stateParams', 'Competition', 'Judge', 'Leader', function($scope, $state, $stateParams, Competition, Judge, Leader) {
        $scope.message="Competition loading...";
        $scope.error="";

          Competition.findById({id: 1})
                .$promise.then(
                function (response) {
                    $scope.competition = response;
                    $scope.showCompetition = true;

                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });
                
         Judge.findById({id: 0})
                .$promise.then(
                function (response) {
                    $scope.judge = response;
                    $scope.showJudge = true;
                    console.log("Judges colected"+ $scope.judges );

                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });

         Leader.findById({id: 2})
                .$promise.then(
                function (response) {
                    $scope.leader = response;
                    $scope.showLeader = true;
                    console.log("Leader colected"+ $scope.judges );

                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });
  
    }])
    
    
     .controller('AccountController', ['$scope', '$state', '$stateParams','Account', function($scope, $state, $stateParams, Account) {

            $scope.showAccounts = false;
            $scope.message = "Loading ...";

             Account.find()
                .$promise.then(
                function (response) {
                    $scope.accounts = response;
                    $scope.showAccounts = true;

                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });
    }])

     .controller('JudgeController', ['$scope', '$state', '$stateParams','Judge', function($scope, $state, $stateParams, Judge) {

            $scope.showJudges = false;
            $scope.message = "Loading ...";

             Judge.find()
                .$promise.then(
                function (response) {
                    $scope.judges = response;
                    $scope.showJudges = true;

                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });

    }])

    .controller('CompetitionsController', ['$scope',  '$stateParams', 'Competition', function($scope, $stateParams, Competition) {
        $scope.showAccount = false;
        $scope.message="Loading ...";
        console.log("Dohvaćam natjecanja");

        Competition.find()
                .$promise.then(
                function (response) {
                    $scope.competitions = response;
                    $scope.showCompetitions = true;

                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });

//Podaci
          $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
          $scope.series = ['CACIB Karlovac 2015', 'Special show of swiss shepherds 2015', 'Special show of Tornjak 2015' ];
          $scope.data = [
            [5, 59, 180, 281, 356, 455, 1400],
            [28, 48, 640, 719, 886, 1327, 1900],
            [8, 48, 40, 19, 186, 127, 2100]
          ];
          $scope.onClick = function (points, evt) {
            console.log(points, evt);
          };

    }])

    .controller('CompetitionDetailController', ['$scope', '$state', '$stateParams', 'Competition', 'Judge', 'Account', function($scope, $state, $stateParams, Competition, Judge, Account) {

        $scope.message="Loading ...";
        $scope.showCompetition = false;
        $scope.tab = 1;
        $scope.showJudges = false;
        $scope.showStatistic = false;
        $scope.showApplications = false;
        $scope.showForm = true;
        
        Competition.findById({id: $stateParams.id})
                .$promise.then(
                function (response) {
                    $scope.competition = response;
                    $scope.showCompetition = true;

                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });

        console.log("Dohvacam suce");
        Judge.find({"filter":{"where":{
            "competition": $stateParams.id
        }}})
                .$promise.then(
                function (response) {
                    $scope.judges = response;
                    $scope.showJudges = true;
                    console.log("Judges colected"+ $scope.judges );

                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });

        console.log("Dohvacam accounte");
        Account.find({"filter":{"where":{
            "competition": $stateParams.id
        }}})
                .$promise.then(
                function (response) {
                    $scope.accounts = response;
                    $scope.showAccounts = true;
                    console.log("Judges colected"+ $scope.judges );

                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });

        //Grafikon
          $scope.labels = ["Small dogs", "Big dogs", "Toy dogs"];
          $scope.data = [300, 500, 100];

          //Tabovi
        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.select = function(setTab) {
            $scope.tab = setTab;

            if (setTab === 1) {
                $scope.filtText = "Judges";
                $scope.showJudges = true;

                $scope.showStatistic = false;
                $scope.showApplications = false;
                
            }
            else if (setTab === 2) {
                $scope.filtText = "Competition prediction";
                $scope.showStatistic = true;

                $scope.showJudges = false;
                $scope.showApplications = false;
            }
            else if (setTab === 3) {
                $scope.filtText = "Applications";
                $scope.showApplications = true;

                $scope.showJudges = false;
                $scope.showStatistic = false;
            }
            else {
                $scope.filtText = "";
            }
        };
        
        //save a application on competition
           $scope.account = {
                city: "",
                country: "",
                email: "",
                language: "",
                mobilephone: "",
                telephone: "",
                ownerName: "",
                competition: $stateParams.id,
                dogName: ""
            };
        
         $scope.addAccount = function () {
             console.log("Save a account");
             $scope.account.competition = $stateParams.id;
            Account.create($scope.account);
            
            $scope.showForm = false;
            //$('#accountFormModal').modal("hide");
             // $state.go($state.current, {}, {reload: true});
            
            $scope.account = {
                city: "string",
                country: "string",
                email: "string",
                language: "string",
                mobilephone: "string",
                telephone: "string",
                ownerName: "string",
                competition: 0,
                dogName: "string"
        };
    }
        
    }])



.controller('LeaderController', ['$scope','$state',  '$stateParams','Leader', '$window', function($scope, $state, $stateParams, Leader, $window) {
        $scope.message="Leader loading...";
        $scope.error="";
        
            Leader.find()
                .$promise.then(
                function (response) {
                    $scope.leaders = response;
                    $scope.showLeaders = true;

                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });
 }])

    .controller('AccountViewController', ['$scope', '$stateParams', 'accountFactory', function($scope, $stateParams, accountFactory) {
        $scope.showAccount = false;
        $scope.message="Loading ...";
        $scope.account = accountFactory.getAccounts().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                function(response){
                    $scope.account = response;
                    $scope.showAccount = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
    }])


    .controller('AccountController2', ['$scope', '$state', '$stateParams','accountFactory', 'administrationFactory', function($scope, $state, $stateParams, accountFactory, administrationFactory) {

        //DOHVAT SVIH ACCOUNTA
        $scope.loadAccounts=function() {
            $scope.showAccounts = false;
            $scope.message = "Loading ...";

            accountFactory.getAccounts().query(
                function (response) {
                    $scope.accounts = response;
                    $scope.showAccounts = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });
        };
        $scope.loadAccounts();


        $scope.setAccount = function (account_set) {
            $scope.account = account_set;
        }

        $scope.celarAccount = function () {
            $scope.account = {firstName:"", lastName:"", email:"", country:"", city:"" };
        }

        $scope.deleteAccount = function (account) {
            console.log($scope.account);
            accountFactory.getAccounts().delete(account).$promise.then(
                function(response){
                  //  $scope.accounts.remove(account);
                    $scope.accounts.splice(account, 1);
//                    $scope.loadAccounts();
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );

        }

        //AŽURIRANJE POSTOJECEG ACCOUNTA
        $scope.updateAccount = function () {
            console.log($scope.account);
            accountFactory.getAccounts().update({id:$scope.account.id},$scope.account).$promise.then(
                function(response){
                    //sakrij modalni
                    $('#editAccountFormModal').modal("hide");

                    $scope.account = response;
                    $scope.showAccount = true;
                    $state.go('app.accountView', { id:$scope.account.id} );
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
        }

        //KREIRANJE NOVOG ACCOUNTA
        $scope.addAccount = function () {
            console.log($scope.account);

            accountFactory.getAccounts().save($scope.account).$promise.then(
                function(response){
                    //sakrij modalni
                    $('#accountFormModal').modal("hide");

                    $scope.account = response;
                    $scope.showAccount = true;
                    $state.go('app.accountView', { id:$scope.account.id} );
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
        }

        $scope.dog = {name:"Igoror", sex:"MUŽJAK / Male", breed:"", whisker:"", pedigree_number:"2334454", father_name:"Marko", mother_name:"Ivana", color:"Crna", breeder:"Perkovići" };    
//    account_id         breed_id        size_id      sex_id      whisker_id      name       pedigree_number         date_of_birth      father_name    mother_name     color    breeder 
        
        $scope.addDog = function () {
            console.log("Dodajem psaaaa");
            console.log($scope.dog);

            $scope.account.dogs.push($scope.dog);
            accountFactory.getAccounts().update({id:$scope.account.id},$scope.account);
            $('#dogFormModal').modal("hide");
        }

        $scope.updateDog = function () {
            console.log("Ažuriram psa");
            console.log($scope.dog);

            $scope.account.dogs.push($scope.dog);
            accountFactory.getAccounts().save({id:$scope.account.id},$scope.account);
        }

        $scope.showApplicationForm = function () {
            console.log("Otvaram");
            console.log($scope.dog);
            $scope.loadActiveCompetitions();
           $('#applicationFormModal').modal("show");
        }
        
        $scope.loadActiveCompetitions = function () {
            administrationFactory.getCompetitions().query(
                function (response) {
                    $scope.activeCompetitions = response;
                    console.log(response);
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });
        }


        //DOHVAT ADMINISTRACIJE
        $scope.loadAdministration=function() {
            administrationFactory.getSize().query(
                function (response) {
                    $scope.size = response;
                    console.log(response);
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });

            administrationFactory.getBreed().query(
                function (response) {
                    $scope.breed = response;
                    console.log(response);
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });

            administrationFactory.getWhisker().query(
                function (response) {
                    $scope.whisker = response;
                    console.log(response);
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });

            administrationFactory.getSex().query(
                function (response) {
                    $scope.sex = response;
                    console.log(response);
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });

            administrationFactory.getClass().query(
                function (response) {
                    $scope.class = response;
                    console.log(response);
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });


        };

        $scope.loadAdministration();
    }])



    .controller('LeaderController2', ['$scope','$state',  '$stateParams','Leader', '$window', function($scope, $state, $stateParams, Leader, $window) {
        
        $scope.loadLeaders=function() {
            $scope.showLeaders = false;
            $scope.message = "Loading ...";

            leaderFactory.getLeaders().query(
                function (response) {
                    $scope.leaders = response;
                    $scope.showLeaders = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });
        };

        $scope.loadLeaders();

        $scope.setLeader = function (leader_set) {
            $scope.leader = leader_set;
        }

        $scope.celarLeader = function () {
            $scope.leader = {name:"", designation:"", description:""};
        }

        $scope.deleteLeader = function (leader) {
            console.log($scope.leader);
            leaderFactory.getLeaders().delete(leader);
            $scope.leaders.push(leader);
            //$scope.loadLeaders();
        }

        $scope.addLeader = function () {
            console.log($scope.leader);

            leaderFactory.getLeaders().save($scope.leader).$promise.then(
                function(response){
                    //sakrij modalni
                    $('#leaderFormModal').modal("hide");

                    $scope.leader = response;
                    $scope.showLeader = true;
                    $state.go('app.leaders', { id:$scope.leader.id} );
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
        }

        $scope.updateLeader = function () {
            console.log($scope.leader);
            leaderFactory.getLeaders().update({id:$scope.leader.id},$scope.leader).$promise.then(
                function(response){
                    //sakrij modalni
                    $('#editLeaderFormModal').modal("hide");

                    $scope.leader = response;
                    $scope.showLeader= true;
                    $state.go('app.leaders', { id:$scope.leader.id} );
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
        }



    }])



// judgeFactory ================================
    .controller('JudgeController2', ['$scope', '$state', '$stateParams','judgeFactory', 'administrationFactory', 
        function($scope, $state, $stateParams, judgeFactory, administrationFactory) {

        //DOHVAT SVIH ACCOUNTA
        $scope.loadJudges=function() {
            $scope.showJudges = false;
            $scope.message = "Loading ...";

            judgeFactory.getJudges().query(
                function (response) {
                    $scope.judges = response;
                    $scope.showJudges = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });
        };
        $scope.loadJudges();


        $scope.setJudges = function (judge_set) {
            $scope.judge = judge_set;
        }

        $scope.celarJudge = function () {
            $scope.judge = {name:"", image:"", designation:"", country:"", description:"" };

        }

        $scope.deleteJudge = function (account) {
            console.log($scope.account);
            judgeFactory.getAccounts().delete(account).$promise.then(
                function(response){
                  //  $scope.accounts.remove(account);
                    $scope.judges.splice(judge, 1);
//                    $scope.loadAccounts();
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );

        }

        //AŽURIRANJE POSTOJECEG ACCOUNTA
        $scope.updateJudge = function () {
            console.log($scope.account);
            judgeFactory.getAccounts().update({id:$scope.account.id},$scope.account).$promise.then(
                function(response){
                    //sakrij modalni
                    $('#editJudgeFormModal').modal("hide");

                    $scope.judge = response;
                    $scope.showJudge = true;
                    $state.go('app.accountView', { id:$scope.account.id} );
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
        }

        //KREIRANJE NOVOG ACCOUNTA
        $scope.addJudge = function () {
            console.log($scope.account);

            judgeFactory.getJudges().save($scope.judge).$promise.then(
                function(response){
                    //sakrij modalni
                    $('#judgeFormModal').modal("hide");

                    $scope.judge = response;
                    $scope.showJudge = true;
                    $state.go('app.judgeView', { id:$scope.judge.id} );
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
        }

    }])
;
