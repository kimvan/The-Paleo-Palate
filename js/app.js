var app = angular.module("Recipes", ['ngRoute']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'views/home.html',
                controller: 'RecipesController'
            }).
            when('/recipes', {
                templateUrl: 'views/recipes.html',
                controller: 'RecipesController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);




var app = angular.module( "Recipes", [] );
     
app.controller(
    "RecipesController",
    function( $scope, recipesService, $location ) {
        //$scope.recipes = [];
        $scope.recipes1 = [];
        $scope.recipes2 = [];
        $scope.recipes3 = [];

        loadRemoteData();
      
        function makeUrl(recipeId){
            console.log(recipeId);
            let baseUrl = window.location.href;
            console.log(baseUrl);
           // let concatUrl=baseUrl;
        }

        function addRecipesById(recipeObject){
            let allRecipesArr = recipeObject.results;
            let recipeIdArr=[616575,618012,574651,597004,618033,703914,809923,625009,519412];
            let newRecipeArr=[];
            for(let i=0; i<allRecipesArr.length; i++){
                if(recipeIdArr.includes(allRecipesArr[i].id)){
                    newRecipeArr.push(allRecipesArr[i]);
                }
            }
            assignRecipes(newRecipeArr);
        }

        function assignRecipes(recipeArr){
            for(let i=0; i<recipeArr.length; i++){
                if(i>=0 && i<3){
                    $scope.recipes1.push(recipeArr[i]);
                }else if(i>=3 && i<6){
                    $scope.recipes2.push(recipeArr[i]); 
                }else{
                    $scope.recipes3.push(recipeArr[i]);
                }
            }
        }

        $scope.getRecipeInfo=function(recipeId){
            console.log(recipeId);
            recipesService.getRecipeById(recipeId)
            .then(
                    function( recipes) {
                        showRecipeById(recipes);
                    }
                )
            ;

        }

        function applyRemoteData( newRecipes ) {
        addRecipesById(newRecipes);
          //  $scope.recipes = newRecipes.results;
        }


     
        function loadRemoteData() {
           
            recipesService.getRecipes()
                .then(
                    function( recipes) {
                        //applyRemoteData( recipes );
                        addRecipesById(recipes);
                    }
                )
            ;
        }
    }
);

app.service(
    "recipesService",
    function( $http, $q ) {
        // Return Spoonacular API
        return({
            getRecipes: getRecipes,
            getRecipeById: getRecipeById
        });
       
        function getRecipes() {
            var request = $http({
                method: "get",
                url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?diet=vegetarian&excludeIngredients=coconut&intolerances=egg%2C+gluten&number=80&offset=0&query=paleo&type=main+course",
                headers: {"X-Mashape-Key": "5VU43jT1zOmshaC9nMC5NBIwcK9mp1HjbvPjsnH7iu0T4RJm4i", "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"},
                params: {
                    action: "get"
                }
            });
            return( request.then( handleSuccess, handleError ) );
        }

        function getRecipeById(id) {
            var deferUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information';
            var request = $http({
                method: "get",
                url: deferUrl,
                headers: {"X-Mashape-Key": "5VU43jT1zOmshaC9nMC5NBIwcK9mp1HjbvPjsnH7iu0T4RJm4i", "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"},
                params: {
                    action: "get"
                }
            });
            return( request.then( handleSuccess, handleError ) );
        }

      
      
        function handleError( response ) {
            if (
                ! angular.isObject( response.data ) ||
                ! response.data.message
                ) {
                return( $q.reject( "An unknown error occurred." ) );
            }
   
            return( $q.reject( response.data.message ) );
        }
  
        function handleSuccess( response ) {
             console.log(response.data);    
            return( response.data );
        }
    }
);

